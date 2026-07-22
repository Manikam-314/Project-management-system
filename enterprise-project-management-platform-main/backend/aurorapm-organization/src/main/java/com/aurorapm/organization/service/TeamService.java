package com.aurorapm.organization.service;

import com.aurorapm.common.exception.ConflictException;
import com.aurorapm.common.exception.ForbiddenException;
import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.organization.dto.request.AddTeamMemberRequest;
import com.aurorapm.organization.dto.request.CreateTeamRequest;
import com.aurorapm.organization.dto.response.TeamResponse;
import com.aurorapm.organization.entity.OrganizationMember;
import com.aurorapm.organization.entity.OrganizationRole;
import com.aurorapm.organization.entity.Team;
import com.aurorapm.organization.entity.TeamMember;
import com.aurorapm.organization.mapper.OrganizationMapper;
import com.aurorapm.organization.repository.TeamMemberRepository;
import com.aurorapm.organization.repository.TeamRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TeamService {

  private final TeamRepository teamRepository;
  private final TeamMemberRepository teamMemberRepository;
  private final OrganizationService organizationService;
  private final OrganizationMapper organizationMapper;

  @Transactional
  public TeamResponse createTeam(UUID organizationId, CreateTeamRequest request, UUID userId) {
    requireTeamManager(organizationId, userId);

    Team team = new Team();
    team.setOrganizationId(organizationId);
    team.setName(request.name().trim());
    team.setDescription(request.description());
    team.setCreatedBy(userId);
    team.setUpdatedBy(userId);

    return organizationMapper.toResponse(teamRepository.save(team));
  }

  @Transactional(readOnly = true)
  public List<TeamResponse> listTeams(UUID organizationId, UUID userId) {
    organizationService.requireMembership(organizationId, userId);
    return teamRepository.findByOrganizationIdOrderByName(organizationId).stream()
        .map(organizationMapper::toResponse)
        .toList();
  }

  @Transactional
  public void addMember(UUID organizationId, UUID teamId, AddTeamMemberRequest request, UUID actorId) {
    requireTeamManager(organizationId, actorId);
    Team team = getTeamForOrganization(organizationId, teamId);
    organizationService.requireMembership(organizationId, request.userId());

    if (teamMemberRepository.existsByTeamIdAndUserId(team.getId(), request.userId())) {
      throw new ConflictException("User is already a member of this team");
    }

    TeamMember member = new TeamMember();
    member.setTeamId(team.getId());
    member.setUserId(request.userId());
    teamMemberRepository.save(member);
  }

  private Team getTeamForOrganization(UUID organizationId, UUID teamId) {
    Team team =
        teamRepository
            .findById(teamId)
            .orElseThrow(() -> new ResourceNotFoundException("Team", teamId.toString()));

    if (!team.getOrganizationId().equals(organizationId)) {
      throw new ResourceNotFoundException("Team", teamId.toString());
    }

    return team;
  }

  private void requireTeamManager(UUID organizationId, UUID userId) {
    OrganizationMember member = organizationService.requireMembership(organizationId, userId);
    if (member.getRole() != OrganizationRole.ORG_ADMIN) {
      throw new ForbiddenException("Only organization admins can manage teams");
    }
  }
}
