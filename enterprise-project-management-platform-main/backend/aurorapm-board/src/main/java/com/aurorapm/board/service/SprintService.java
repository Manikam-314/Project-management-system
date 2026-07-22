package com.aurorapm.board.service;

import com.aurorapm.board.dto.CreateSprintRequest;
import com.aurorapm.board.dto.SprintDto;
import com.aurorapm.board.entity.Sprint;
import com.aurorapm.board.repository.SprintRepository;
import com.aurorapm.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SprintService {

    private final SprintRepository sprintRepository;

    @Transactional(readOnly = true)
    public List<SprintDto> getSprintsByProject(UUID projectId) {
        return sprintRepository.findByProjectId(projectId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public SprintDto createSprint(CreateSprintRequest request) {
        Sprint sprint = Sprint.builder()
                .projectId(request.getProjectId())
                .name(request.getName())
                .goal(request.getGoal())
                .status("PLANNED")
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();
        return toDto(sprintRepository.save(sprint));
    }

    @Transactional
    public SprintDto startSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not found: " + sprintId));
        sprint.setStatus("ACTIVE");
        if (sprint.getStartDate() == null) {
            sprint.setStartDate(Instant.now());
        }
        return toDto(sprintRepository.save(sprint));
    }

    @Transactional
    public SprintDto completeSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not found: " + sprintId));
        sprint.setStatus("COMPLETED");
        sprint.setCompletedAt(Instant.now());
        return toDto(sprintRepository.save(sprint));
    }

    public SprintDto toDto(Sprint sprint) {
        return SprintDto.builder()
                .id(sprint.getId())
                .projectId(sprint.getProjectId())
                .name(sprint.getName())
                .goal(sprint.getGoal())
                .status(sprint.getStatus())
                .startDate(sprint.getStartDate())
                .endDate(sprint.getEndDate())
                .completedAt(sprint.getCompletedAt())
                .createdAt(sprint.getCreatedAt())
                .updatedAt(sprint.getUpdatedAt())
                .build();
    }
}
