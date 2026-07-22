package com.aurorapm.api.dto.response;

import java.time.Instant;
import java.util.UUID;
import lombok.Builder;

@Builder
public record SystemHealthResponse(
    String status,
    String application,
    String version,
    Instant timestamp,
    UUID organizationId) {}
