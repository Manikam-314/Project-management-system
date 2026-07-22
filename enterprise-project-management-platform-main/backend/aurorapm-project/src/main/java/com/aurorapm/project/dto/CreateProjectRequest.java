package com.aurorapm.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateProjectRequest {
    @NotBlank
    @Size(min = 2, max = 10)
    private String key;

    @NotBlank
    @Size(max = 200)
    private String name;

    private String description;
    private UUID leadId;
}
