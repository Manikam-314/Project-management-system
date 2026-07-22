package com.aurorapm.project.service;

import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.project.dto.CreateWorkItemRequest;
import com.aurorapm.project.dto.UpdateWorkItemRequest;
import com.aurorapm.project.dto.WorkItemDto;
import com.aurorapm.project.entity.Project;
import com.aurorapm.project.entity.WorkItem;
import com.aurorapm.project.repository.ProjectRepository;
import com.aurorapm.project.repository.WorkItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkItemService {

    private final WorkItemRepository workItemRepository;
    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<WorkItemDto> getWorkItemsByProject(UUID projectId) {
        return workItemRepository.findByProjectId(projectId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public WorkItemDto getWorkItemByKey(UUID organizationId, String key) {
        WorkItem workItem = workItemRepository.findByOrganizationIdAndKey(organizationId, key)
                .orElseThrow(() -> new ResourceNotFoundException("Work item not found with key: " + key));
        return toDto(workItem);
    }

    @Transactional
    public WorkItemDto createWorkItem(UUID organizationId, CreateWorkItemRequest request, UUID reporterId) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + request.getProjectId()));

        long nextNum = workItemRepository.countByProjectId(project.getId()) + 1;
        String key = project.getKey() + "-" + nextNum;

        WorkItem workItem = WorkItem.builder()
                .organizationId(organizationId)
                .projectId(project.getId())
                .key(key)
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType() != null ? request.getType() : "STORY")
                .status(request.getStatus() != null ? request.getStatus() : "To Do")
                .priority(request.getPriority() != null ? request.getPriority() : "MEDIUM")
                .storyPoints(request.getStoryPoints() != null ? request.getStoryPoints() : 0)
                .assigneeId(request.getAssigneeId())
                .reporterId(reporterId)
                .parentId(request.getParentId())
                .sprintId(request.getSprintId())
                .boardColumnId(request.getBoardColumnId())
                .dueDate(request.getDueDate())
                .build();

        WorkItem saved = workItemRepository.save(workItem);
        return toDto(saved);
    }

    @Transactional
    public WorkItemDto updateWorkItem(UUID id, UpdateWorkItemRequest request) {
        WorkItem workItem = workItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Work item not found: " + id));

        if (request.getTitle() != null) workItem.setTitle(request.getTitle());
        if (request.getDescription() != null) workItem.setDescription(request.getDescription());
        if (request.getType() != null) workItem.setType(request.getType());
        if (request.getStatus() != null) workItem.setStatus(request.getStatus());
        if (request.getPriority() != null) workItem.setPriority(request.getPriority());
        if (request.getStoryPoints() != null) workItem.setStoryPoints(request.getStoryPoints());
        if (request.getAssigneeId() != null) workItem.setAssigneeId(request.getAssigneeId());
        if (request.getParentId() != null) workItem.setParentId(request.getParentId());
        if (request.getSprintId() != null) workItem.setSprintId(request.getSprintId());
        if (request.getBoardColumnId() != null) workItem.setBoardColumnId(request.getBoardColumnId());
        if (request.getPosition() != null) workItem.setPosition(request.getPosition());
        if (request.getDueDate() != null) workItem.setDueDate(request.getDueDate());

        WorkItem updated = workItemRepository.save(workItem);
        return toDto(updated);
    }

    public WorkItemDto toDto(WorkItem item) {
        return WorkItemDto.builder()
                .id(item.getId())
                .organizationId(item.getOrganizationId())
                .projectId(item.getProjectId())
                .key(item.getKey())
                .title(item.getTitle())
                .description(item.getDescription())
                .type(item.getType())
                .status(item.getStatus())
                .priority(item.getPriority())
                .storyPoints(item.getStoryPoints())
                .assigneeId(item.getAssigneeId())
                .reporterId(item.getReporterId())
                .parentId(item.getParentId())
                .sprintId(item.getSprintId())
                .boardColumnId(item.getBoardColumnId())
                .position(item.getPosition())
                .dueDate(item.getDueDate())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}
