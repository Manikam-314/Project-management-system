package com.aurorapm.board.entity;

import com.aurorapm.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "boards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board extends BaseEntity {

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Builder.Default
    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = true;
}
