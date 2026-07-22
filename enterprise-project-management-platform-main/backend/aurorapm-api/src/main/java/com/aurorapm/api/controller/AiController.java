package com.aurorapm.api.controller;

import com.aurorapm.ai.service.AiAssistantService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiAssistantService aiAssistantService;

    @Data
    public static class TaskBreakdownRequest {
        private UUID projectId;
        private String title;
        private String description;
    }

    @Data
    public static class PromptRequest {
        private String prompt;
    }

    @PostMapping("/breakdown")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<AiAssistantService.TaskBreakdownResponse> breakdownTask(
            @RequestBody TaskBreakdownRequest request) {
        return ResponseEntity.ok(aiAssistantService.breakdownEpicOrStory(
                request.getProjectId(),
                request.getTitle(),
                request.getDescription()
        ));
    }

    @PostMapping("/acceptance-criteria")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<String>> generateAcceptanceCriteria(@RequestBody TaskBreakdownRequest request) {
        return ResponseEntity.ok(aiAssistantService.generateAcceptanceCriteria(request.getTitle(), request.getDescription()));
    }

    @PostMapping("/chat")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<Map<String, String>> chat(@RequestBody PromptRequest request) {
        String reply = aiAssistantService.generateAssistantReply(request.getPrompt());
        return ResponseEntity.ok(Map.of("reply", reply));
    }
}
