package com.aurorapm.authorization.security;

import com.aurorapm.authorization.service.OrganizationPermissionService;
import java.io.Serializable;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("auroraPmPermissionEvaluator")
@RequiredArgsConstructor
public class AuroraPmPermissionEvaluator implements PermissionEvaluator {

  private final OrganizationPermissionService organizationPermissionService;

  @Override
  public boolean hasPermission(
      Authentication authentication, Object targetDomainObject, Object permission) {
    if (authentication == null || !authentication.isAuthenticated() || permission == null) {
      return false;
    }

    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    if (userId == null) {
      return false;
    }

    if (targetDomainObject instanceof UUID organizationId) {
      return organizationPermissionService.hasPermission(
          userId, organizationId, permission.toString());
    }

    return false;
  }

  @Override
  public boolean hasPermission(
      Authentication authentication, Serializable targetId, String targetType, Object permission) {
    if (!(targetId instanceof UUID organizationId)) {
      return false;
    }
    return hasPermission(authentication, organizationId, permission);
  }
}
