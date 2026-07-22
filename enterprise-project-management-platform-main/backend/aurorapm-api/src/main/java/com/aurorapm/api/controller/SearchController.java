package com.aurorapm.api.controller;

import com.aurorapm.common.tenant.TenantContext;
import com.aurorapm.project.dto.WorkItemDto;
import com.aurorapm.project.repository.WorkItemRepository;
import com.aurorapm.project.service.WorkItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final WorkItemRepository workItemRepository;
    private final WorkItemService workItemService;

    @GetMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<WorkItemDto>> search(@RequestParam String q) {
        UUID orgId = TenantContext.requireOrganizationId();
        List<WorkItemDto> results = workItemRepository.searchWorkItems(orgId, q).stream()
                .map(workItemService::toDto)
                .toList();
        return ResponseEntity.ok(results);
    }
}
