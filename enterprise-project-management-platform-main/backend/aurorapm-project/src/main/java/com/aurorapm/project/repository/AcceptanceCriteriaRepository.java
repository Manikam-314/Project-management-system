package com.aurorapm.project.repository;

import com.aurorapm.project.entity.AcceptanceCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AcceptanceCriteriaRepository extends JpaRepository<AcceptanceCriteria, UUID> {
    List<AcceptanceCriteria> findByWorkItemIdOrderByPositionAsc(UUID workItemId);
}
