package com.aurorapm.organization.repository;

import com.aurorapm.organization.entity.Invitation;
import com.aurorapm.organization.entity.InvitationStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {

  Optional<Invitation> findByTokenHashAndStatus(String tokenHash, InvitationStatus status);

  List<Invitation> findByOrganizationIdAndStatus(UUID organizationId, InvitationStatus status);

  boolean existsByOrganizationIdAndEmailIgnoreCaseAndStatus(
      UUID organizationId, String email, InvitationStatus status);
}
