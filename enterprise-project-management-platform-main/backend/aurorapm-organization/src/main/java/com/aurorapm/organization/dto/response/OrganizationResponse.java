package com.aurorapm.organization.dto.response;

import com.aurorapm.organization.entity.OrganizationRole;
import java.util.UUID;

public record OrganizationResponse(
    UUID id,
    String name,
    String slug,
    String logoUrl,
    String timezone,
    String status,
    OrganizationRole currentUserRole) {}
