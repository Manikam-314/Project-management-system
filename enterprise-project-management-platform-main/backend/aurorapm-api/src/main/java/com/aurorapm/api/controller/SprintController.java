package com.aurorapm.api.controller;

import com.aurorapm.board.dto.CreateSprintRequest;
import com.aurorapm.board.dto.SprintDto;
import com.aurorapm.board.service.SprintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sprints")
@RequiredArgsConstructor
public class SprintController {

    private final SprintService sprintService;

    @GetMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<SprintDto>> getSprints(@RequestParam UUID projectId) {
        return ResponseEntity.ok(sprintService.getSprintsByProject(projectId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<SprintDto> createSprint(@Valid @RequestBody CreateSprintRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sprintService.createSprint(request));
    }

    @PostMapping("/{id}/start")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<SprintDto> startSprint(@PathVariable UUID id) {
        return ResponseEntity.ok(sprintService.startSprint(id));
    }

    @PostMapping("/{id}/complete")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<SprintDto> completeSprint(@PathVariable UUID id) {
        return ResponseEntity.ok(sprintService.completeSprint(id));
    }
}
