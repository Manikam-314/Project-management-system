package com.aurorapm.identity.dto.response;

public record AuthResponse(String accessToken, UserResponse user) {}
