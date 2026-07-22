package com.aurorapm.project.entity;

import com.aurorapm.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "work_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkItem extends BaseEntity {

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "key", nullable = false, unique = true, length = 50)
    private String key;

    @Column(name = "title", nullable = false, length = 300)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @Column(name = "type", nullable = false, length = 30)
    private String type = "STORY"; // EPIC, STORY, TASK, SUBTASK

    @Builder.Default
    @Column(name = "status", nullable = false, length = 50)
    private String status = "To Do";

    @Builder.Default
    @Column(name = "priority", nullable = false, length = 30)
    private String priority = "MEDIUM"; // LOW, MEDIUM, HIGH, URGENT

    @Builder.Default
    @Column(name = "story_points", nullable = false)
    private Integer storyPoints = 0;

    @Column(name = "assignee_id")
    private UUID assigneeId;

    @Column(name = "reporter_id")
    private UUID reporterId;

    @Column(name = "parent_id")
    private UUID parentId;

    @Column(name = "sprint_id")
    private UUID sprintId;

    @Column(name = "board_column_id")
    private UUID boardColumnId;

    @Builder.Default
    @Column(name = "position", nullable = false)
    private Double position = 0.0;

    @Column(name = "due_date")
    private Instant dueDate;
}
