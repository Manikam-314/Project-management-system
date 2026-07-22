package com.aurorapm.api.controller;

import com.aurorapm.common.tenant.TenantContext;
import com.aurorapm.identity.security.AuroraPmUserDetails;
import com.aurorapm.project.dto.CreateWorkItemRequest;
import com.aurorapm.project.dto.UpdateWorkItemRequest;
import com.aurorapm.project.dto.WorkItemDto;
import com.aurorapm.project.service.WorkItemService;
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
@RequestMapping("/api/v1/work-items")
@RequiredArgsConstructor
public class WorkItemController {

    private final WorkItemService workItemService;

    @GetMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<WorkItemDto>> getWorkItemsByProject(@RequestParam UUID projectId) {
        return ResponseEntity.ok(workItemService.getWorkItemsByProject(projectId));
    }

    @GetMapping("/{key}")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<WorkItemDto> getWorkItemByKey(@PathVariable String key) {
        UUID orgId = TenantContext.requireOrganizationId();
        return ResponseEntity.ok(workItemService.getWorkItemByKey(orgId, key));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<WorkItemDto> createWorkItem(
            @Valid @RequestBody CreateWorkItemRequest request,
            @AuthenticationPrincipal AuroraPmUserDetails currentUser) {
        UUID orgId = TenantContext.requireOrganizationId();
        WorkItemDto created = workItemService.createWorkItem(orgId, request, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<WorkItemDto> updateWorkItem(
            @PathVariable UUID id,
            @RequestBody UpdateWorkItemRequest request) {
        return ResponseEntity.ok(workItemService.updateWorkItem(id, request));
    }
}
