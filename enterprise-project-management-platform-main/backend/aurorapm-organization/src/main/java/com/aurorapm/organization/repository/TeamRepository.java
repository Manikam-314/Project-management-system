package com.aurorapm.organization.repository;

import com.aurorapm.organization.entity.Team;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, UUID> {

  List<Team> findByOrganizationIdOrderByName(UUID organizationId);
}
