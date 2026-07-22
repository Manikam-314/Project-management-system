package com.aurorapm.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class CreateWorkItemRequest {
    @NotNull
    private UUID projectId;

    @NotBlank
    private String title;

    private String description;
    private String type = "STORY";
    private String status = "To Do";
    private String priority = "MEDIUM";
    private Integer storyPoints = 0;
    private UUID assigneeId;
    private UUID parentId;
    private UUID sprintId;
    private UUID boardColumnId;
    private Instant dueDate;
}
