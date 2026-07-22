package com.aurorapm.project.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class UpdateWorkItemRequest {
    private String title;
    private String description;
    private String type;
    private String status;
    private String priority;
    private Integer storyPoints;
    private UUID assigneeId;
    private UUID parentId;
    private UUID sprintId;
    private UUID boardColumnId;
    private Double position;
    private Instant dueDate;
}
