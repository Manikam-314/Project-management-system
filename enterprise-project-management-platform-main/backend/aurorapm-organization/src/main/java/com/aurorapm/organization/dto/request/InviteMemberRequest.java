package com.aurorapm.organization.dto.request;

import com.aurorapm.organization.entity.OrganizationRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InviteMemberRequest(
    @NotBlank @Email String email, @NotNull OrganizationRole role) {}
