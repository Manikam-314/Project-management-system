package com.aurorapm.project.repository;

import com.aurorapm.project.entity.WorkItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkItemRepository extends JpaRepository<WorkItem, UUID> {
    List<WorkItem> findByProjectId(UUID projectId);
    List<WorkItem> findByProjectIdAndSprintId(UUID projectId, UUID sprintId);
    List<WorkItem> findByProjectIdAndSprintIdIsNull(UUID projectId);
    Optional<WorkItem> findByOrganizationIdAndKey(UUID organizationId, String key);
    long countByProjectId(UUID projectId);

    @Query("SELECT w FROM WorkItem w WHERE w.organizationId = :orgId AND (LOWER(w.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(w.key) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<WorkItem> searchWorkItems(UUID orgId, String query);
}
