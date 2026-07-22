package com.aurorapm.authorization.service;

import com.aurorapm.authorization.Permissions;
import com.aurorapm.organization.entity.OrganizationRole;
import com.aurorapm.organization.repository.OrganizationMemberRepository;
import java.time.Duration;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationPermissionService {

  private static final Duration CACHE_TTL = Duration.ofMinutes(5);

  private final OrganizationMemberRepository organizationMemberRepository;
  private final StringRedisTemplate redisTemplate;

  public boolean hasPermission(UUID userId, UUID organizationId, String permission) {
    OrganizationRole role = getRole(userId, organizationId);
    if (role == null) {
      return false;
    }
    return permissionsFor(role).contains(permission);
  }

  public boolean isMember(UUID userId, UUID organizationId) {
    return getRole(userId, organizationId) != null;
  }

  public boolean isOrgAdmin(UUID userId, UUID organizationId) {
    return OrganizationRole.ORG_ADMIN == getRole(userId, organizationId);
  }

  public OrganizationRole getRole(UUID userId, UUID organizationId) {
    String cacheKey = cacheKey(userId, organizationId);
    String cached = redisTemplate.opsForValue().get(cacheKey);
    if (cached != null) {
      return "NONE".equals(cached) ? null : OrganizationRole.valueOf(cached);
    }

    OrganizationRole role =
        organizationMemberRepository
            .findByOrganizationIdAndUserId(organizationId, userId)
            .map(member -> member.getRole())
            .orElse(null);

    redisTemplate
        .opsForValue()
        .set(cacheKey, role == null ? "NONE" : role.name(), CACHE_TTL);

    return role;
  }

  public void evict(UUID userId, UUID organizationId) {
    redisTemplate.delete(cacheKey(userId, organizationId));
  }

  private Set<String> permissionsFor(OrganizationRole role) {
    return switch (role) {
      case ORG_ADMIN ->
          Set.of(
              Permissions.ORG_READ,
              Permissions.ORG_ADMIN,
              Permissions.MEMBER_INVITE,
              Permissions.MEMBER_REMOVE,
              Permissions.TEAM_MANAGE);
      case MEMBER -> Set.of(Permissions.ORG_READ);
    };
  }

  private String cacheKey(UUID userId, UUID organizationId) {
    return "perm:%s:%s".formatted(userId, organizationId);
  }
}
