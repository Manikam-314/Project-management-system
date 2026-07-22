package com.aurorapm.organization.service;

import com.aurorapm.common.exception.BadRequestException;
import com.aurorapm.common.exception.ConflictException;
import com.aurorapm.common.exception.ForbiddenException;
import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.identity.entity.User;
import com.aurorapm.identity.repository.UserRepository;
import com.aurorapm.identity.util.TokenHasher;
import com.aurorapm.organization.dto.request.AcceptInvitationRequest;
import com.aurorapm.organization.dto.request.InviteMemberRequest;
import com.aurorapm.organization.dto.response.InvitationAcceptResponse;
import com.aurorapm.organization.dto.response.InvitationResponse;
import com.aurorapm.organization.entity.Invitation;
import com.aurorapm.organization.entity.InvitationStatus;
import com.aurorapm.organization.entity.Organization;
import com.aurorapm.organization.entity.OrganizationMember;
import com.aurorapm.organization.entity.OrganizationRole;
import com.aurorapm.organization.mapper.OrganizationMapper;
import com.aurorapm.organization.repository.InvitationRepository;
import com.aurorapm.organization.repository.OrganizationMemberRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class InvitationService {

  private final InvitationRepository invitationRepository;
  private final OrganizationMemberRepository organizationMemberRepository;
  private final OrganizationService organizationService;
  private final UserRepository userRepository;
  private final OrganizationMapper organizationMapper;

  @Value("${aurorapm.invitation.expiry-days:7}")
  private long invitationExpiryDays;

  @Transactional
  public InvitationResponse invite(
      java.util.UUID organizationId, InviteMemberRequest request, java.util.UUID inviterUserId) {
    OrganizationMember inviter = organizationService.requireMembership(organizationId, inviterUserId);
    if (inviter.getRole() != OrganizationRole.ORG_ADMIN) {
      throw new ForbiddenException("Only organization admins can invite members");
    }

    String email = request.email().trim().toLowerCase();
    organizationService.getActiveOrganization(organizationId);

    userRepository
        .findByEmailIgnoreCase(email)
        .ifPresent(
            user -> {
              if (organizationMemberRepository.existsByOrganizationIdAndUserId(
                  organizationId, user.getId())) {
                throw new ConflictException("User is already a member of this organization");
              }
            });

    if (invitationRepository.existsByOrganizationIdAndEmailIgnoreCaseAndStatus(
        organizationId, email, InvitationStatus.PENDING)) {
      throw new ConflictException("A pending invitation already exists for this email");
    }

    String rawToken = TokenHasher.generateRawToken();
    Invitation invitation = new Invitation();
    invitation.setOrganizationId(organizationId);
    invitation.setEmail(email);
    invitation.setRole(request.role());
    invitation.setTokenHash(TokenHasher.hashToken(rawToken));
    invitation.setInvitedBy(inviterUserId);
    invitation.setExpiresAt(Instant.now().plus(invitationExpiryDays, ChronoUnit.DAYS));
    invitation.setStatus(InvitationStatus.PENDING);

    Invitation saved = invitationRepository.save(invitation);
    log.info(
        "Invitation for {} to organization {}: token={}",
        email,
        organizationId,
        rawToken);

    return organizationMapper.toResponse(saved);
  }

  @Transactional(readOnly = true)
  public java.util.List<InvitationResponse> listPending(
      java.util.UUID organizationId, java.util.UUID userId) {
    organizationService.requireMembership(organizationId, userId);
    return invitationRepository
        .findByOrganizationIdAndStatus(organizationId, InvitationStatus.PENDING)
        .stream()
        .map(organizationMapper::toResponse)
        .toList();
  }

  @Transactional
  public InvitationAcceptResponse accept(AcceptInvitationRequest request, java.util.UUID userId) {
    String tokenHash = TokenHasher.hashToken(request.token());
    Invitation invitation =
        invitationRepository
            .findByTokenHashAndStatus(tokenHash, InvitationStatus.PENDING)
            .orElseThrow(() -> new BadRequestException("Invalid or expired invitation"));

    if (invitation.getExpiresAt().isBefore(Instant.now())) {
      invitation.setStatus(InvitationStatus.EXPIRED);
      invitationRepository.save(invitation);
      throw new BadRequestException("Invalid or expired invitation");
    }

    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));

    if (!user.getEmail().equalsIgnoreCase(invitation.getEmail())) {
      throw new ForbiddenException("Invitation email does not match your account");
    }

    if (organizationMemberRepository.existsByOrganizationIdAndUserId(
        invitation.getOrganizationId(), userId)) {
      throw new ConflictException("You are already a member of this organization");
    }

    OrganizationMember member = new OrganizationMember();
    member.setOrganizationId(invitation.getOrganizationId());
    member.setUserId(userId);
    member.setRole(invitation.getRole());
    organizationMemberRepository.save(member);

    invitation.setStatus(InvitationStatus.ACCEPTED);
    invitation.setAcceptedAt(Instant.now());
    invitationRepository.save(invitation);

    Organization organization = organizationService.getActiveOrganization(invitation.getOrganizationId());
    return new InvitationAcceptResponse(
        organization.getId(), organization.getName(), organization.getSlug());
  }
}
