package com.aurora.pm.controller;

import com.aurora.pm.dto.PlatformDtos.UploadRequest;
import com.aurora.pm.dto.PlatformDtos.UploadResponse;
import com.aurora.pm.service.PlatformService;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {
  private final PlatformService platformService;

  public UploadController(PlatformService platformService) {
    this.platformService = platformService;
  }

  @PostMapping("/presign")
  public UploadResponse presign(@Valid @RequestBody UploadRequest request) {
    return platformService.createUpload(request.projectId, request.fileName);
  }
}
