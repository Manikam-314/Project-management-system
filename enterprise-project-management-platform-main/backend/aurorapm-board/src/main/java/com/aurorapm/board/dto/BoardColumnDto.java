package com.aurorapm.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardColumnDto {
    private UUID id;
    private UUID boardId;
    private String name;
    private Integer position;
    private Integer wipLimit;
    private String category;
}
