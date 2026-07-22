package com.aurorapm.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkItemDto {
    private UUID id;
    private UUID organizationId;
    private UUID projectId;
    private String key;
    private String title;
    private String description;
    private String type;
    private String status;
    private String priority;
    private Integer storyPoints;
    private UUID assigneeId;
    private UUID reporterId;
    private UUID parentId;
    private UUID sprintId;
    private UUID boardColumnId;
    private Double position;
    private Instant dueDate;
    private Instant createdAt;
    private Instant updatedAt;
}
