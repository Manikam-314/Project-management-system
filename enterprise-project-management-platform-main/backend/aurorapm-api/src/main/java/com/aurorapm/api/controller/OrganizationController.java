package com.aurorapm.api.controller;

import com.aurorapm.authorization.Permissions;
import com.aurorapm.authorization.security.SecurityUtils;
import com.aurorapm.organization.dto.request.AcceptInvitationRequest;
import com.aurorapm.organization.dto.request.CreateOrganizationRequest;
import com.aurorapm.organization.dto.request.CreateTeamRequest;
import com.aurorapm.organization.dto.request.AddTeamMemberRequest;
import com.aurorapm.organization.dto.request.InviteMemberRequest;
import com.aurorapm.organization.dto.response.InvitationAcceptResponse;
import com.aurorapm.organization.dto.response.InvitationResponse;
import com.aurorapm.organization.dto.response.OrganizationMemberResponse;
import com.aurorapm.organization.dto.response.OrganizationResponse;
import com.aurorapm.organization.dto.response.TeamResponse;
import com.aurorapm.organization.service.InvitationService;
import com.aurorapm.organization.service.OrganizationService;
import com.aurorapm.organization.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Organizations", description = "Organizations, members, teams, and invitations")
public class OrganizationController {

  private final OrganizationService organizationService;
  private final InvitationService invitationService;
  private final TeamService teamService;

  @GetMapping("/organizations")
  @Operation(summary = "List organizations for current user")
  public ResponseEntity<List<OrganizationResponse>> listOrganizations(Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(organizationService.listForUser(userId));
  }

  @PostMapping("/organizations")
  @Operation(summary = "Create a new organization")
  public ResponseEntity<OrganizationResponse> createOrganization(
      @Valid @RequestBody CreateOrganizationRequest request, Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(organizationService.create(request, userId));
  }

  @GetMapping("/organizations/{organizationId}")
  @PreAuthorize("hasPermission(#organizationId, 'org:read')")
  @Operation(summary = "Get organization by ID")
  public ResponseEntity<OrganizationResponse> getOrganization(
      @PathVariable UUID organizationId, Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(organizationService.getById(organizationId, userId));
  }

  @GetMapping("/organizations/{organizationId}/members")
  @PreAuthorize("hasPermission(#organizationId, 'org:read')")
  @Operation(summary = "List organization members")
  public ResponseEntity<List<OrganizationMemberResponse>> listMembers(
      @PathVariable UUID organizationId, Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(organizationService.listMembers(organizationId, userId));
  }

  @DeleteMapping("/organizations/{organizationId}/members/{memberUserId}")
  @PreAuthorize("hasPermission(#organizationId, 'member:remove')")
  @Operation(summary = "Remove organization member")
  public ResponseEntity<Void> removeMember(
      @PathVariable UUID organizationId,
      @PathVariable UUID memberUserId,
      Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    organizationService.removeMember(organizationId, memberUserId, userId);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/organizations/{organizationId}/invitations")
  @PreAuthorize("hasPermission(#organizationId, 'member:invite')")
  @Operation(summary = "Invite a member to the organization")
  public ResponseEntity<InvitationResponse> inviteMember(
      @PathVariable UUID organizationId,
      @Valid @RequestBody InviteMemberRequest request,
      Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(invitationService.invite(organizationId, request, userId));
  }

  @GetMapping("/organizations/{organizationId}/invitations")
  @PreAuthorize("hasPermission(#organizationId, 'org:read')")
  @Operation(summary = "List pending invitations")
  public ResponseEntity<List<InvitationResponse>> listInvitations(
      @PathVariable UUID organizationId, Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(invitationService.listPending(organizationId, userId));
  }

  @PostMapping("/invitations/accept")
  @Operation(summary = "Accept an organization invitation")
  public ResponseEntity<InvitationAcceptResponse> acceptInvitation(
      @Valid @RequestBody AcceptInvitationRequest request, Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(invitationService.accept(request, userId));
  }

  @GetMapping("/organizations/{organizationId}/teams")
  @PreAuthorize("hasPermission(#organizationId, 'org:read')")
  @Operation(summary = "List teams in organization")
  public ResponseEntity<List<TeamResponse>> listTeams(
      @PathVariable UUID organizationId, Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.ok(teamService.listTeams(organizationId, userId));
  }

  @PostMapping("/organizations/{organizationId}/teams")
  @PreAuthorize("hasPermission(#organizationId, 'team:manage')")
  @Operation(summary = "Create a team")
  public ResponseEntity<TeamResponse> createTeam(
      @PathVariable UUID organizationId,
      @Valid @RequestBody CreateTeamRequest request,
      Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(teamService.createTeam(organizationId, request, userId));
  }

  @PostMapping("/organizations/{organizationId}/teams/{teamId}/members")
  @PreAuthorize("hasPermission(#organizationId, 'team:manage')")
  @Operation(summary = "Add member to team")
  public ResponseEntity<Void> addTeamMember(
      @PathVariable UUID organizationId,
      @PathVariable UUID teamId,
      @Valid @RequestBody AddTeamMemberRequest request,
      Authentication authentication) {
    UUID userId = SecurityUtils.getCurrentUserId(authentication);
    teamService.addMember(organizationId, teamId, request, userId);
    return ResponseEntity.noContent().build();
  }
}
