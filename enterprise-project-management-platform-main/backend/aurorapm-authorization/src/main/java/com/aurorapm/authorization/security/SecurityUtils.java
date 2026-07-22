package com.aurorapm.authorization.security;

import com.aurorapm.identity.security.AuroraPmUserDetails;
import java.util.UUID;
import org.springframework.security.core.Authentication;

public final class SecurityUtils {

  private SecurityUtils() {}

  public static UUID getCurrentUserId(Authentication authentication) {
    if (authentication == null || authentication.getPrincipal() == null) {
      return null;
    }

    Object principal = authentication.getPrincipal();
    if (principal instanceof AuroraPmUserDetails userDetails) {
      return userDetails.getUserId();
    }

    return null;
  }
}
