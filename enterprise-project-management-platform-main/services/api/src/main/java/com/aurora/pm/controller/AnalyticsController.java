package com.aurora.pm.controller;

import com.aurora.pm.dto.PlatformDtos.AnalyticsDto;
import com.aurora.pm.service.PlatformService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
  private final PlatformService platformService;

  public AnalyticsController(PlatformService platformService) {
    this.platformService = platformService;
  }

  @GetMapping
  public AnalyticsDto analytics() {
    return platformService.analytics();
  }
}
