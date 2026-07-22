package com.aurorapm.organization.repository;

import com.aurorapm.organization.entity.OrganizationMember;
import com.aurorapm.organization.entity.OrganizationRole;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationMemberRepository extends JpaRepository<OrganizationMember, UUID> {

  Optional<OrganizationMember> findByOrganizationIdAndUserId(UUID organizationId, UUID userId);

  List<OrganizationMember> findByOrganizationId(UUID organizationId);

  boolean existsByOrganizationIdAndUserId(UUID organizationId, UUID userId);

  long countByOrganizationIdAndRole(UUID organizationId, OrganizationRole role);
}
