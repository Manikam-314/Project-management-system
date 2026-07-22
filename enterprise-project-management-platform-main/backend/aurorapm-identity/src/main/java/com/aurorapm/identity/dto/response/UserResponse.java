package com.aurorapm.identity.dto.response;

import java.util.UUID;

public record UserResponse(
    UUID id,
    String email,
    String firstName,
    String lastName,
    String avatarUrl,
    boolean emailVerified) {}
