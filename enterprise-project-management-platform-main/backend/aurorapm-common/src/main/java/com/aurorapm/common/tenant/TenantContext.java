package com.aurorapm.common.tenant;

import java.util.Optional;
import java.util.UUID;

/**
 * Thread-local tenant context populated by {@code TenantContextFilter}.
 * Phase 0 stub — authentication will set {@code userId} in Phase 1.
 */
public final class TenantContext {

  private static final ThreadLocal<UUID> USER_ID = new ThreadLocal<>();
  private static final ThreadLocal<UUID> ORGANIZATION_ID = new ThreadLocal<>();

  private TenantContext() {}

  public static void setUserId(UUID userId) {
    USER_ID.set(userId);
  }

  public static Optional<UUID> getUserId() {
    return Optional.ofNullable(USER_ID.get());
  }

  public static void setOrganizationId(UUID organizationId) {
    ORGANIZATION_ID.set(organizationId);
  }

  public static Optional<UUID> getOrganizationId() {
    return Optional.ofNullable(ORGANIZATION_ID.get());
  }

  public static UUID requireOrganizationId() {
    return getOrganizationId()
        .orElseThrow(() -> new IllegalStateException("Organization context is not set"));
  }

  public static void clear() {
    USER_ID.remove();
    ORGANIZATION_ID.remove();
  }
}
