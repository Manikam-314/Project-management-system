package com.aurorapm.api.service;

import com.aurorapm.api.dto.response.SystemHealthResponse;
import com.aurorapm.common.tenant.TenantContext;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SystemService {

  @Value("${spring.application.name}")
  private String applicationName;

  public SystemHealthResponse getHealth() {
    return SystemHealthResponse.builder()
        .status("UP")
        .application(applicationName)
        .version("0.1.0")
        .timestamp(Instant.now())
        .organizationId(TenantContext.getOrganizationId().orElse(null))
        .build();
  }
}
