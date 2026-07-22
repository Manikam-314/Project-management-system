package com.aurorapm.identity.repository;

import com.aurorapm.identity.entity.User;
import com.aurorapm.identity.entity.UserStatus;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmailIgnoreCase(String email);

  boolean existsByEmailIgnoreCase(String email);

  Optional<User> findByIdAndStatus(UUID id, UserStatus status);
}
