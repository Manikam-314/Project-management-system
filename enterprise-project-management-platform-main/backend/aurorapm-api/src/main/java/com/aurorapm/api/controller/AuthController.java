package com.aurorapm.api.controller;

import com.aurorapm.api.security.AuthRateLimiter;
import com.aurorapm.api.security.RefreshTokenCookieManager;
import com.aurorapm.authorization.security.SecurityUtils;
import com.aurorapm.identity.dto.request.ForgotPasswordRequest;
import com.aurorapm.identity.dto.request.LoginRequest;
import com.aurorapm.identity.dto.request.RegisterRequest;
import com.aurorapm.identity.dto.request.ResetPasswordRequest;
import com.aurorapm.identity.dto.response.AuthResponse;
import com.aurorapm.identity.dto.response.MessageResponse;
import com.aurorapm.identity.dto.response.UserResponse;
import com.aurorapm.identity.service.AuthService;
import com.aurorapm.identity.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Arrays;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Registration, login, and password management")
public class AuthController {

  private final AuthService authService;
  private final UserService userService;
  private final RefreshTokenCookieManager refreshTokenCookieManager;
  private final AuthRateLimiter authRateLimiter;

  @PostMapping("/register")
  @Operation(summary = "Register a new user")
  public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
    authRateLimiter.check("register:" + request.email().toLowerCase());
    AuthService.AuthResult result = authService.register(request);
    return authResponse(result);
  }

  @PostMapping("/login")
  @Operation(summary = "Login with email and password")
  public ResponseEntity<AuthResponse> login(
      @Valid @RequestBody LoginRequest request, HttpServletRequest servletRequest) {
    authRateLimiter.check("login:" + request.email().toLowerCase());
    AuthService.AuthResult result =
        authService.login(request, servletRequest.getHeader("User-Agent"));
    return authResponse(result);
  }

  @PostMapping("/refresh")
  @Operation(summary = "Refresh access token")
  public ResponseEntity<AuthResponse> refresh(HttpServletRequest servletRequest) {
    String refreshToken = extractRefreshToken(servletRequest);
    AuthService.AuthResult result =
        authService.refresh(refreshToken, servletRequest.getHeader("User-Agent"));
    return authResponse(result);
  }

  @PostMapping("/logout")
  @Operation(summary = "Logout current session")
  public ResponseEntity<MessageResponse> logout(HttpServletRequest servletRequest) {
    authService.logout(extractRefreshToken(servletRequest));
    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, refreshTokenCookieManager.clear().toString())
        .body(new MessageResponse("Logged out successfully"));
  }

  @PostMapping("/forgot-password")
  @Operation(summary = "Request password reset email")
  public ResponseEntity<MessageResponse> forgotPassword(
      @Valid @RequestBody ForgotPasswordRequest request) {
    authRateLimiter.check("forgot:" + request.email().toLowerCase());
    return ResponseEntity.ok(authService.forgotPassword(request));
  }

  @PostMapping("/reset-password")
  @Operation(summary = "Reset password using token")
  public ResponseEntity<MessageResponse> resetPassword(
      @Valid @RequestBody ResetPasswordRequest request) {
    return ResponseEntity.ok(authService.resetPassword(request));
  }

  @GetMapping("/me")
  @Operation(summary = "Get current authenticated user")
  public ResponseEntity<UserResponse> me(Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(userService.getById(userId));
  }

  private ResponseEntity<AuthResponse> authResponse(AuthService.AuthResult result) {
    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, refreshTokenCookieManager.create(result.rawRefreshToken()).toString())
        .body(authService.toAuthResponse(result));
  }

  private String extractRefreshToken(HttpServletRequest request) {
    if (request.getCookies() == null) {
      throw new com.aurorapm.common.exception.UnauthorizedException("Refresh token missing");
    }

    return Arrays.stream(request.getCookies())
        .filter(cookie -> RefreshTokenCookieManager.COOKIE_NAME.equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElseThrow(
            () -> new com.aurorapm.common.exception.UnauthorizedException("Refresh token missing"));
  }
}
