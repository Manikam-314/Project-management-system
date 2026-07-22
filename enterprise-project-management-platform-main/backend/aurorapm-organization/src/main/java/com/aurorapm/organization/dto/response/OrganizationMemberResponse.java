package com.aurorapm.organization.dto.response;

import com.aurorapm.organization.entity.OrganizationRole;
import java.time.Instant;
import java.util.UUID;

public record OrganizationMemberResponse(
    UUID id,
    UUID userId,
    String email,
    String firstName,
    String lastName,
    OrganizationRole role,
    Instant joinedAt) {}
