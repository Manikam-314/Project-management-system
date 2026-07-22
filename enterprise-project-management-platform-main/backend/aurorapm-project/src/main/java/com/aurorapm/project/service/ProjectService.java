package com.aurorapm.project.service;

import com.aurorapm.common.exception.ConflictException;
import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.project.dto.CreateProjectRequest;
import com.aurorapm.project.dto.ProjectDto;
import com.aurorapm.project.entity.Project;
import com.aurorapm.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<ProjectDto> getProjectsByOrganization(UUID organizationId) {
        return projectRepository.findByOrganizationId(organizationId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectByKey(UUID organizationId, String key) {
        Project project = projectRepository.findByOrganizationIdAndKey(organizationId, key)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with key: " + key));
        return toDto(project);
    }

    @Transactional
    public ProjectDto createProject(UUID organizationId, CreateProjectRequest request, UUID currentUserId) {
        String key = request.getKey().toUpperCase().trim();
        if (projectRepository.existsByOrganizationIdAndKey(organizationId, key)) {
            throw new ConflictException("Project key already exists in this organization: " + key);
        }

        Project project = Project.builder()
                .organizationId(organizationId)
                .key(key)
                .name(request.getName())
                .description(request.getDescription())
                .leadId(request.getLeadId() != null ? request.getLeadId() : currentUserId)
                .status("ACTIVE")
                .build();

        Project saved = projectRepository.save(project);
        return toDto(saved);
    }

    public ProjectDto toDto(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .organizationId(project.getOrganizationId())
                .key(project.getKey())
                .name(project.getName())
                .description(project.getDescription())
                .leadId(project.getLeadId())
                .status(project.getStatus())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
