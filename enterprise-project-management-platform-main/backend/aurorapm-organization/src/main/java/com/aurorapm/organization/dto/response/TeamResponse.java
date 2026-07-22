package com.aurorapm.organization.dto.response;

import java.util.UUID;

public record TeamResponse(UUID id, UUID organizationId, String name, String description) {}
