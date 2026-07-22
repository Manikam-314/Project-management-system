package com.aurorapm.identity.security;

import java.util.UUID;

public record AuthenticatedUser(UUID userId, String email) {}
