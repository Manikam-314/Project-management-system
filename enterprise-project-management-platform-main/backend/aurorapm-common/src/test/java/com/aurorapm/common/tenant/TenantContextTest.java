package com.aurorapm.common.tenant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

class TenantContextTest {

  @AfterEach
  void tearDown() {
    TenantContext.clear();
  }

  @Test
  void storesAndRetrievesOrganizationId() {
    UUID organizationId = UUID.randomUUID();
    TenantContext.setOrganizationId(organizationId);

    assertThat(TenantContext.getOrganizationId()).contains(organizationId);
    assertThat(TenantContext.requireOrganizationId()).isEqualTo(organizationId);
  }

  @Test
  void requireOrganizationIdThrowsWhenMissing() {
    assertThatThrownBy(TenantContext::requireOrganizationId)
        .isInstanceOf(IllegalStateException.class)
        .hasMessageContaining("Organization context is not set");
  }

  @Test
  void clearRemovesThreadLocalValues() {
    TenantContext.setOrganizationId(UUID.randomUUID());
    TenantContext.setUserId(UUID.randomUUID());

    TenantContext.clear();

    assertThat(TenantContext.getOrganizationId()).isEmpty();
    assertThat(TenantContext.getUserId()).isEmpty();
  }
}
