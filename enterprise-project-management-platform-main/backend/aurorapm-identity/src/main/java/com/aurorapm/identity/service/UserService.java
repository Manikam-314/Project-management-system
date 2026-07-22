package com.aurorapm.identity.service;

import com.aurorapm.common.exception.ResourceNotFoundException;
import com.aurorapm.identity.dto.response.UserResponse;
import com.aurorapm.identity.entity.User;
import com.aurorapm.identity.entity.UserStatus;
import com.aurorapm.identity.mapper.UserMapper;
import com.aurorapm.identity.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  public UserResponse getById(UUID userId) {
    return userMapper.toResponse(getActiveUser(userId));
  }

  public User getActiveUser(UUID userId) {
    return userRepository
        .findByIdAndStatus(userId, UserStatus.ACTIVE)
        .orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
  }
}
