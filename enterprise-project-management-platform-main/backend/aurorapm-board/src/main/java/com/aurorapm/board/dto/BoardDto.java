package com.aurorapm.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private UUID id;
    private UUID projectId;
    private String name;
    private Boolean isDefault;
    private List<BoardColumnDto> columns;
    private Instant createdAt;
    private Instant updatedAt;
}
