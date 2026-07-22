package com.aurorapm.identity.security;

import com.aurorapm.common.exception.UnauthorizedException;
import com.aurorapm.identity.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

  private final SecretKey secretKey;
  private final String issuer;
  private final long accessTokenMinutes;

  public JwtTokenProvider(
      @Value("${aurorapm.security.jwt.secret}") String secret,
      @Value("${aurorapm.security.jwt.issuer:aurorapm}") String issuer,
      @Value("${aurorapm.security.jwt.access-token-minutes:15}") long accessTokenMinutes) {
    this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.issuer = issuer;
    this.accessTokenMinutes = accessTokenMinutes;
  }

  public String generateAccessToken(User user) {
    Instant now = Instant.now();
    Instant expiry = now.plusSeconds(accessTokenMinutes * 60);

    return Jwts.builder()
        .issuer(issuer)
        .subject(user.getId().toString())
        .claim("email", user.getEmail())
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiry))
        .signWith(secretKey)
        .compact();
  }

  public AuthenticatedUser parseToken(String token) {
    try {
      Claims claims =
          Jwts.parser()
              .verifyWith(secretKey)
              .requireIssuer(issuer)
              .build()
              .parseSignedClaims(token)
              .getPayload();

      return new AuthenticatedUser(
          UUID.fromString(claims.getSubject()), claims.get("email", String.class));
    } catch (Exception ex) {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }
}
