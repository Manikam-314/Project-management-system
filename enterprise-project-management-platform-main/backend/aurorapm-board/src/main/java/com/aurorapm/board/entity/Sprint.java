package com.aurorapm.board.entity;

import com.aurorapm.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "sprints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sprint extends BaseEntity {

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "goal", columnDefinition = "TEXT")
    private String goal;

    @Builder.Default
    @Column(name = "status", nullable = false, length = 20)
    private String status = "PLANNED"; // PLANNED, ACTIVE, COMPLETED

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "completed_at")
    private Instant completedAt;
}
