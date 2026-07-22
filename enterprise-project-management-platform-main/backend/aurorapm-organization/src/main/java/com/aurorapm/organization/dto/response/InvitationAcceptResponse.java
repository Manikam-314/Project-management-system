package com.aurorapm.organization.dto.response;

import java.util.UUID;

public record InvitationAcceptResponse(UUID organizationId, String organizationName, String slug) {}
