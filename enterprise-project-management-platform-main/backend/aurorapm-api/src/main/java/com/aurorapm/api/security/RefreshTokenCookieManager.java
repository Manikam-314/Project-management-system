package com.aurorapm.api.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenCookieManager {

  public static final String COOKIE_NAME = "refresh_token";

  @Value("${aurorapm.security.refresh-token-days:7}")
  private long refreshTokenDays;

  @Value("${aurorapm.security.cookie.secure:false}")
  private boolean secureCookie;

  public ResponseCookie create(String rawRefreshToken) {
    return ResponseCookie.from(COOKIE_NAME, rawRefreshToken)
        .httpOnly(true)
        .secure(secureCookie)
        .sameSite("Strict")
        .path("/api/v1/auth")
        .maxAge(refreshTokenDays * 24 * 60 * 60)
        .build();
  }

  public ResponseCookie clear() {
    return ResponseCookie.from(COOKIE_NAME, "")
        .httpOnly(true)
        .secure(secureCookie)
        .sameSite("Strict")
        .path("/api/v1/auth")
        .maxAge(0)
        .build();
  }
}
