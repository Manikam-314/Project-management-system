package com.aurorapm.identity.service;

import com.aurorapm.common.exception.BadRequestException;
import com.aurorapm.common.exception.ConflictException;
import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.common.exception.UnauthorizedException;
import com.aurorapm.identity.dto.request.ForgotPasswordRequest;
import com.aurorapm.identity.dto.request.LoginRequest;
import com.aurorapm.identity.dto.request.RegisterRequest;
import com.aurorapm.identity.dto.request.ResetPasswordRequest;
import com.aurorapm.identity.dto.response.AuthResponse;
import com.aurorapm.identity.dto.response.MessageResponse;
import com.aurorapm.identity.entity.PasswordResetToken;
import com.aurorapm.identity.entity.RefreshToken;
import com.aurorapm.identity.entity.User;
import com.aurorapm.identity.entity.UserStatus;
import com.aurorapm.identity.mapper.UserMapper;
import com.aurorapm.identity.repository.PasswordResetTokenRepository;
import com.aurorapm.identity.repository.RefreshTokenRepository;
import com.aurorapm.identity.repository.UserRepository;
import com.aurorapm.identity.security.JwtTokenProvider;
import com.aurorapm.identity.util.TokenHasher;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final UserMapper userMapper;

  @Value("${aurorapm.security.refresh-token-days:7}")
  private long refreshTokenDays;

  @Value("${aurorapm.security.password-reset-hours:1}")
  private long passwordResetHours;

  @Transactional
  public AuthResult register(RegisterRequest request) {
    if (userRepository.existsByEmailIgnoreCase(request.email())) {
      throw new ConflictException("Email is already registered");
    }

    User user = new User();
    user.setEmail(request.email().trim().toLowerCase());
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setFirstName(request.firstName().trim());
    user.setLastName(request.lastName().trim());
    user.setEmailVerified(false);
    user.setStatus(UserStatus.ACTIVE);
    user.setCreatedBy(null);
    user.setUpdatedBy(null);

    User saved = userRepository.save(user);
    return issueTokens(saved, null);
  }

  @Transactional
  public AuthResult login(LoginRequest request, String deviceInfo) {
    User user =
        userRepository
            .findByEmailIgnoreCase(request.email().trim())
            .filter(u -> u.getStatus() == UserStatus.ACTIVE)
            .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new UnauthorizedException("Invalid email or password");
    }

    user.setLastLoginAt(Instant.now());
    userRepository.save(user);
    return issueTokens(user, deviceInfo);
  }

  @Transactional
  public AuthResult refresh(String rawRefreshToken, String deviceInfo) {
    String tokenHash = TokenHasher.hashToken(rawRefreshToken);
    RefreshToken refreshToken =
        refreshTokenRepository
            .findByTokenHashAndRevokedFalse(tokenHash)
            .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

    if (refreshToken.getExpiresAt().isBefore(Instant.now())) {
      refreshTokenRepository.revokeByTokenHash(tokenHash);
      throw new UnauthorizedException("Refresh token expired");
    }

    User user =
        userRepository
            .findByIdAndStatus(refreshToken.getUserId(), UserStatus.ACTIVE)
            .orElseThrow(() -> new UnauthorizedException("User account is not active"));

    refreshTokenRepository.revokeByTokenHash(tokenHash);
    return issueTokens(user, deviceInfo);
  }

  @Transactional
  public void logout(String rawRefreshToken) {
    if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
      return;
    }
    refreshTokenRepository.revokeByTokenHash(TokenHasher.hashToken(rawRefreshToken));
  }

  @Transactional
  public MessageResponse forgotPassword(ForgotPasswordRequest request) {
    userRepository
        .findByEmailIgnoreCase(request.email().trim())
        .ifPresent(
            user -> {
              passwordResetTokenRepository.invalidateAllByUserId(user.getId());
              String rawToken = TokenHasher.generateRawToken();
              PasswordResetToken resetToken = new PasswordResetToken();
              resetToken.setUserId(user.getId());
              resetToken.setTokenHash(TokenHasher.hashToken(rawToken));
              resetToken.setExpiresAt(Instant.now().plus(passwordResetHours, ChronoUnit.HOURS));
              resetToken.setUsed(false);
              passwordResetTokenRepository.save(resetToken);
              log.info(
                  "Password reset link for {}: /reset-password?token={}",
                  user.getEmail(),
                  rawToken);
            });

    return new MessageResponse(
        "If an account exists for that email, password reset instructions have been sent.");
  }

  @Transactional
  public MessageResponse resetPassword(ResetPasswordRequest request) {
    String tokenHash = TokenHasher.hashToken(request.token());
    PasswordResetToken resetToken =
        passwordResetTokenRepository
            .findByTokenHashAndUsedFalse(tokenHash)
            .orElseThrow(() -> new BadRequestException("Invalid or expired reset token"));

    if (resetToken.getExpiresAt().isBefore(Instant.now())) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    User user =
        userRepository
            .findByIdAndStatus(resetToken.getUserId(), UserStatus.ACTIVE)
            .orElseThrow(() -> new ResourceNotFoundException("User", resetToken.getUserId().toString()));

    user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
    userRepository.save(user);

    resetToken.setUsed(true);
    passwordResetTokenRepository.save(resetToken);
    refreshTokenRepository.revokeAllByUserId(user.getId());

    return new MessageResponse("Password has been reset successfully");
  }

  public AuthResponse toAuthResponse(AuthResult result) {
    return new AuthResponse(result.accessToken(), userMapper.toResponse(result.user()));
  }

  private AuthResult issueTokens(User user, String deviceInfo) {
    String accessToken = jwtTokenProvider.generateAccessToken(user);
    String rawRefreshToken = TokenHasher.generateRawToken();

    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setUserId(user.getId());
    refreshToken.setTokenHash(TokenHasher.hashToken(rawRefreshToken));
    refreshToken.setExpiresAt(Instant.now().plus(refreshTokenDays, ChronoUnit.DAYS));
    refreshToken.setRevoked(false);
    refreshToken.setDeviceInfo(deviceInfo);
    refreshTokenRepository.save(refreshToken);

    return new AuthResult(accessToken, rawRefreshToken, user);
  }

  public record AuthResult(String accessToken, String rawRefreshToken, User user) {}
}
