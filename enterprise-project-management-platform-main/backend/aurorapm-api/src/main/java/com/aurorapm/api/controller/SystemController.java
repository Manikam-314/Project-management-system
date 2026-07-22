package com.aurorapm.api.controller;

import com.aurorapm.api.dto.response.SystemHealthResponse;
import com.aurorapm.api.service.SystemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/system")
@RequiredArgsConstructor
@Tag(name = "System", description = "Platform health and metadata")
public class SystemController {

  private final SystemService systemService;

  @GetMapping("/health")
  @Operation(summary = "Application health", description = "Returns AuroraPM API health status")
  public ResponseEntity<SystemHealthResponse> health() {
    return ResponseEntity.ok(systemService.getHealth());
  }
}
