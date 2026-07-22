package com.aurorapm.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class CreateSprintRequest {
    @NotNull
    private UUID projectId;

    @NotBlank
    private String name;

    private String goal;
    private Instant startDate;
    private Instant endDate;
}
