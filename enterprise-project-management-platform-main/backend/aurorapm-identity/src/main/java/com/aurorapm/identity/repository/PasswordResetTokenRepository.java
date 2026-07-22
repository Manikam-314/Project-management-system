package com.aurorapm.identity.repository;

import com.aurorapm.identity.entity.PasswordResetToken;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

  Optional<PasswordResetToken> findByTokenHashAndUsedFalse(String tokenHash);

  @Modifying
  @Query("UPDATE PasswordResetToken prt SET prt.used = true WHERE prt.userId = :userId AND prt.used = false")
  void invalidateAllByUserId(UUID userId);
}
