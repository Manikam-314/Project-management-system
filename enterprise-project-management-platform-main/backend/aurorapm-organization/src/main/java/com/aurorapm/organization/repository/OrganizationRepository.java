package com.aurorapm.organization.repository;

import com.aurorapm.organization.entity.Organization;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

  Optional<Organization> findBySlug(String slug);

  boolean existsBySlug(String slug);

  @Query(
      """
      SELECT o FROM Organization o
      JOIN OrganizationMember om ON om.organizationId = o.id
      WHERE om.userId = :userId AND o.status = 'ACTIVE'
      ORDER BY o.name
      """)
  List<Organization> findAllByMemberUserId(UUID userId);
}
