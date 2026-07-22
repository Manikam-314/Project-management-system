package com.aurora.pm.controller;

import com.aurora.pm.dto.PlatformDtos.TaskDto;
import com.aurora.pm.service.PlatformService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {
  private final PlatformService platformService;

  public SearchController(PlatformService platformService) {
    this.platformService = platformService;
  }

  @GetMapping
  public List<TaskDto> search(@RequestParam String q) {
    return platformService.search(q);
  }
}
