package com.aurorapm.organization.repository;

import com.aurorapm.organization.entity.TeamMember;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember, UUID> {

  List<TeamMember> findByTeamId(UUID teamId);

  boolean existsByTeamIdAndUserId(UUID teamId, UUID userId);
}
