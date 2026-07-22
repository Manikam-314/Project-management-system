package com.aurorapm.api.controller;

import com.aurorapm.common.tenant.TenantContext;
import com.aurorapm.identity.security.AuroraPmUserDetails;
import com.aurorapm.project.dto.CreateProjectRequest;
import com.aurorapm.project.dto.ProjectDto;
import com.aurorapm.project.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<ProjectDto>> getProjects() {
        UUID orgId = TenantContext.requireOrganizationId();
        return ResponseEntity.ok(projectService.getProjectsByOrganization(orgId));
    }

    @GetMapping("/{key}")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<ProjectDto> getProjectByKey(@PathVariable String key) {
        UUID orgId = TenantContext.requireOrganizationId();
        return ResponseEntity.ok(projectService.getProjectByKey(orgId, key));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('org:admin') or hasAuthority('org:member')")
    public ResponseEntity<ProjectDto> createProject(
            @Valid @RequestBody CreateProjectRequest request,
            @AuthenticationPrincipal AuroraPmUserDetails currentUser) {
        UUID orgId = TenantContext.requireOrganizationId();
        ProjectDto created = projectService.createProject(orgId, request, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
