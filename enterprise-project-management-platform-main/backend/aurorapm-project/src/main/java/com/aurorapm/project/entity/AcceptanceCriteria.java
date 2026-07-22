package com.aurorapm.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "acceptance_criteria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcceptanceCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "work_item_id", nullable = false)
    private UUID workItemId;

    @Column(name = "text", nullable = false, columnDefinition = "TEXT")
    private String text;

    @Builder.Default
    @Column(name = "completed", nullable = false)
    private Boolean completed = false;

    @Builder.Default
    @Column(name = "position", nullable = false)
    private Integer position = 0;
}
