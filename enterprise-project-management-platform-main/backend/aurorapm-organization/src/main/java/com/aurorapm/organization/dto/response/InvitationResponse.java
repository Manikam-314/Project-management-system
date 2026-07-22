package com.aurorapm.organization.dto.response;

import com.aurorapm.organization.entity.OrganizationRole;
import java.time.Instant;
import java.util.UUID;

public record InvitationResponse(
    UUID id,
    String email,
    OrganizationRole role,
    String status,
    Instant expiresAt,
    Instant createdAt) {}
