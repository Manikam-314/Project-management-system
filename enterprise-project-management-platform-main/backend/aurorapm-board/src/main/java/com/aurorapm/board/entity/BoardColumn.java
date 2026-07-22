package com.aurorapm.board.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "board_columns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardColumn {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "board_id", nullable = false)
    private UUID boardId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Builder.Default
    @Column(name = "position", nullable = false)
    private Integer position = 0;

    @Builder.Default
    @Column(name = "wip_limit", nullable = false)
    private Integer wipLimit = 0;

    @Builder.Default
    @Column(name = "category", nullable = false, length = 30)
    private String category = "TODO"; // TODO, IN_PROGRESS, IN_REVIEW, DONE
}
