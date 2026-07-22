package com.aurora.pm.controller;

import com.aurora.pm.dto.PlatformDtos.DashboardDto;
import com.aurora.pm.dto.PlatformDtos.ProjectDto;
import com.aurora.pm.service.PlatformService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WorkspaceController {
  private final PlatformService platformService;

  public WorkspaceController(PlatformService platformService) {
    this.platformService = platformService;
  }

  @GetMapping("/dashboard")
  public DashboardDto dashboard() {
    return platformService.dashboard();
  }

  @GetMapping("/projects")
  public List<ProjectDto> projects() {
    return platformService.projects();
  }
}
