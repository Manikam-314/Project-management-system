package com.aurora.pm.controller;

import com.aurora.pm.dto.PlatformDtos.AuthResponse;
import com.aurora.pm.dto.PlatformDtos.LoginRequest;
import com.aurora.pm.dto.PlatformDtos.UserDto;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest request) {
    if ("admin@aurorapm.io".equalsIgnoreCase(request.email)
        && "Admin@123".equals(request.password)) {
      return new AuthResponse(
          "demo-token-admin",
          new UserDto("u4", "Iris Morgan", "admin@aurorapm.io", "Admin"));
    }

    if ("member@aurorapm.io".equalsIgnoreCase(request.email)
        && "Member@123".equals(request.password)) {
      return new AuthResponse(
          "demo-token-engineer",
          new UserDto("u3", "Noah Patel", "member@aurorapm.io", "Engineer"));
    }

    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid demo credentials");
  }
}
