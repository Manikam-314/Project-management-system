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
public class ProjectDto {
    private UUID id;
    private UUID organizationId;
    private String key;
    private String name;
    private String description;
    private UUID leadId;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;
}
