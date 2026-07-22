package com.aurorapm.organization.mapper;

import com.aurorapm.organization.dto.response.InvitationResponse;
import com.aurorapm.organization.dto.response.OrganizationResponse;
import com.aurorapm.organization.dto.response.TeamResponse;
import com.aurorapm.organization.entity.Invitation;
import com.aurorapm.organization.entity.Organization;
import com.aurorapm.organization.entity.OrganizationRole;
import com.aurorapm.organization.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrganizationMapper {

  @Mapping(target = "currentUserRole", source = "currentUserRole")
  OrganizationResponse toResponse(Organization organization, OrganizationRole currentUserRole);

  TeamResponse toResponse(Team team);

  @Mapping(target = "status", expression = "java(invitation.getStatus().name())")
  InvitationResponse toResponse(Invitation invitation);
}
