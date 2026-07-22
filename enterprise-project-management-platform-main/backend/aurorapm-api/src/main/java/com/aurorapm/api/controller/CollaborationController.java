package com.aurorapm.api.controller;

import com.aurorapm.collaboration.entity.Comment;
import com.aurorapm.collaboration.entity.Notification;
import com.aurorapm.collaboration.service.CommentService;
import com.aurorapm.collaboration.service.NotificationService;
import com.aurorapm.identity.security.AuroraPmUserDetails;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/collaboration")
@RequiredArgsConstructor
public class CollaborationController {

    private final CommentService commentService;
    private final NotificationService notificationService;

    @Data
    @Getter
    @Setter
    public static class AddCommentRequest {
        private UUID workItemId;
        private String content;
        private UUID parentId;

        public UUID getWorkItemId() { return workItemId; }
        public void setWorkItemId(UUID workItemId) { this.workItemId = workItemId; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public UUID getParentId() { return parentId; }
        public void setParentId(UUID parentId) { this.parentId = parentId; }
    }

    @GetMapping("/comments")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<Comment>> getComments(@RequestParam UUID workItemId) {
        return ResponseEntity.ok(commentService.getCommentsByWorkItem(workItemId));
    }

    @PostMapping("/comments")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<Comment> addComment(
            @RequestBody AddCommentRequest request,
            @AuthenticationPrincipal AuroraPmUserDetails currentUser) {
        return ResponseEntity.ok(commentService.addComment(
                request.getWorkItemId(),
                currentUser.getId(),
                request.getContent(),
                request.getParentId()
        ));
    }

    @GetMapping("/notifications")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<List<Notification>> getNotifications(@AuthenticationPrincipal AuroraPmUserDetails currentUser) {
        return ResponseEntity.ok(notificationService.getUserNotifications(currentUser.getId()));
    }

    @PostMapping("/notifications/{id}/read")
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<Void> markNotificationRead(@PathVariable UUID id) {
        notificationService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }
}
