package com.aurora.pm.controller;

import com.aurora.pm.dto.PlatformDtos.CommentDto;
import com.aurora.pm.dto.PlatformDtos.CommentRequest;
import com.aurora.pm.dto.PlatformDtos.TaskDto;
import com.aurora.pm.dto.PlatformDtos.UpdateTaskStatusRequest;
import com.aurora.pm.service.PlatformService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TaskController {
  private final PlatformService platformService;

  public TaskController(PlatformService platformService) {
    this.platformService = platformService;
  }

  @GetMapping("/tasks")
  public List<TaskDto> tasks() {
    return platformService.tasks();
  }

  @PatchMapping("/tasks/{taskId}/status")
  public TaskDto updateStatus(
      @PathVariable String taskId,
      @Valid @RequestBody UpdateTaskStatusRequest request) {
    return platformService.updateStatus(taskId, request.status);
  }

  @GetMapping("/comments")
  public List<CommentDto> comments(@RequestParam(required = false) String taskId) {
    return platformService.comments(taskId);
  }

  @PostMapping("/comments")
  public CommentDto addComment(@Valid @RequestBody CommentRequest request) {
    return platformService.addComment(request.taskId, request.body);
  }
}
