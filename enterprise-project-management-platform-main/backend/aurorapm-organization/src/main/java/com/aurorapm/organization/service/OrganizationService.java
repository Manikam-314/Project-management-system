package com.aurorapm.organization.service;

import com.aurorapm.common.exception.BadRequestException;
import com.aurorapm.common.exception.ConflictException;
import com.aurorapm.common.exception.ForbiddenException;
import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.identity.entity.User;
import com.aurorapm.identity.repository.UserRepository;
import com.aurorapm.organization.dto.request.CreateOrganizationRequest;
import com.aurorapm.organization.dto.response.OrganizationMemberResponse;
import com.aurorapm.organization.dto.response.OrganizationResponse;
import com.aurorapm.organization.entity.Organization;
import com.aurorapm.organization.entity.OrganizationMember;
import com.aurorapm.organization.entity.OrganizationRole;
import com.aurorapm.organization.mapper.OrganizationMapper;
import com.aurorapm.organization.repository.OrganizationMemberRepository;
import com.aurorapm.organization.repository.OrganizationRepository;
import com.aurorapm.organization.util.SlugGenerator;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrganizationService {

  private final OrganizationRepository organizationRepository;
  private final OrganizationMemberRepository organizationMemberRepository;
  private final UserRepository userRepository;
  private final OrganizationMapper organizationMapper;

  @Transactional
  public OrganizationResponse create(CreateOrganizationRequest request, UUID creatorUserId) {
    String slug = resolveUniqueSlug(request.slug(), request.name());

    Organization organization = new Organization();
    organization.setName(request.name().trim());
    organization.setSlug(slug);
    organization.setTimezone(
        request.timezone() == null || request.timezone().isBlank()
            ? "UTC"
            : request.timezone().trim());
    organization.setStatus("ACTIVE");
    organization.setCreatedBy(creatorUserId);
    organization.setUpdatedBy(creatorUserId);

    Organization saved = organizationRepository.save(organization);

    OrganizationMember member = new OrganizationMember();
    member.setOrganizationId(saved.getId());
    member.setUserId(creatorUserId);
    member.setRole(OrganizationRole.ORG_ADMIN);
    organizationMemberRepository.save(member);

    return organizationMapper.toResponse(saved, OrganizationRole.ORG_ADMIN);
  }

  @Transactional(readOnly = true)
  public List<OrganizationResponse> listForUser(UUID userId) {
    return organizationRepository.findAllByMemberUserId(userId).stream()
        .map(
            org ->
                organizationMapper.toResponse(
                    org,
                    organizationMemberRepository
                        .findByOrganizationIdAndUserId(org.getId(), userId)
                        .map(OrganizationMember::getRole)
                        .orElse(OrganizationRole.MEMBER)))
        .toList();
  }

  @Transactional(readOnly = true)
  public OrganizationResponse getById(UUID organizationId, UUID userId) {
    Organization organization = getActiveOrganization(organizationId);
    OrganizationMember membership = requireMembership(organizationId, userId);
    return organizationMapper.toResponse(organization, membership.getRole());
  }

  @Transactional(readOnly = true)
  public List<OrganizationMemberResponse> listMembers(UUID organizationId, UUID userId) {
    requireMembership(organizationId, userId);
    return organizationMemberRepository.findByOrganizationId(organizationId).stream()
        .map(this::toMemberResponse)
        .toList();
  }

  @Transactional
  public void removeMember(UUID organizationId, UUID memberUserId, UUID actorUserId) {
    OrganizationMember actor = requireMembership(organizationId, actorUserId);
    if (actor.getRole() != OrganizationRole.ORG_ADMIN) {
      throw new ForbiddenException("Only organization admins can remove members");
    }

    OrganizationMember target =
        organizationMemberRepository
            .findByOrganizationIdAndUserId(organizationId, memberUserId)
            .orElseThrow(
                () -> new ResourceNotFoundException("Organization member", memberUserId.toString()));

    if (target.getRole() == OrganizationRole.ORG_ADMIN
        && organizationMemberRepository.countByOrganizationIdAndRole(
                organizationId, OrganizationRole.ORG_ADMIN)
            <= 1) {
      throw new BadRequestException("Cannot remove the last organization admin");
    }

    organizationMemberRepository.delete(target);
  }

  public Organization getActiveOrganization(UUID organizationId) {
    Organization organization =
        organizationRepository
            .findById(organizationId)
            .orElseThrow(
                () -> new ResourceNotFoundException("Organization", organizationId.toString()));

    if (!"ACTIVE".equals(organization.getStatus())) {
      throw new ResourceNotFoundException("Organization", organizationId.toString());
    }

    return organization;
  }

  public OrganizationMember requireMembership(UUID organizationId, UUID userId) {
    return organizationMemberRepository
        .findByOrganizationIdAndUserId(organizationId, userId)
        .orElseThrow(() -> new ForbiddenException("You are not a member of this organization"));
  }

  public OrganizationRole getRole(UUID organizationId, UUID userId) {
    return requireMembership(organizationId, userId).getRole();
  }

  private OrganizationMemberResponse toMemberResponse(OrganizationMember member) {
    User user =
        userRepository
            .findById(member.getUserId())
            .orElseThrow(
                () -> new ResourceNotFoundException("User", member.getUserId().toString()));

    return new OrganizationMemberResponse(
        member.getId(),
        member.getUserId(),
        user.getEmail(),
        user.getFirstName(),
        user.getLastName(),
        member.getRole(),
        member.getJoinedAt());
  }

  private String resolveUniqueSlug(String requestedSlug, String name) {
    String baseSlug =
        requestedSlug == null || requestedSlug.isBlank()
            ? SlugGenerator.toSlug(name)
            : SlugGenerator.toSlug(requestedSlug);

    String candidate = baseSlug;
    int suffix = 1;
    while (organizationRepository.existsBySlug(candidate)) {
      candidate = baseSlug + "-" + suffix++;
    }
    return candidate;
  }
}
