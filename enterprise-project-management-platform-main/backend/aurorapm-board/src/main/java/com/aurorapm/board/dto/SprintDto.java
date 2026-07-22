package com.aurorapm.board.dto;

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
public class SprintDto {
    private UUID id;
    private UUID projectId;
    private String name;
    private String goal;
    private String status;
    private Instant startDate;
    private Instant endDate;
    private Instant completedAt;
    private Instant createdAt;
    private Instant updatedAt;
}
