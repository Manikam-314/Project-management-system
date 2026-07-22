package com.aurora.pm.service;

import com.aurora.pm.dto.PlatformDtos.AnalyticsDto;
import com.aurora.pm.dto.PlatformDtos.CommentDto;
import com.aurora.pm.dto.PlatformDtos.DashboardDto;
import com.aurora.pm.dto.PlatformDtos.NotificationDto;
import com.aurora.pm.dto.PlatformDtos.OrganizationDto;
import com.aurora.pm.dto.PlatformDtos.ProjectDto;
import com.aurora.pm.dto.PlatformDtos.SprintDto;
import com.aurora.pm.dto.PlatformDtos.TaskDto;
import com.aurora.pm.dto.PlatformDtos.TeamDto;
import com.aurora.pm.dto.PlatformDtos.UploadResponse;
import com.aurora.pm.dto.PlatformDtos.UserDto;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class PlatformService {
  private final OrganizationDto organization =
      new OrganizationDto("org-1", "Aurora Systems", "Enterprise", 428);
  private final List<UserDto> users = new ArrayList<>(Arrays.asList(
      new UserDto("u1", "Asha Rao", "asha@aurorapm.io", "Owner"),
      new UserDto("u2", "Maya Chen", "maya@aurorapm.io", "Manager"),
      new UserDto("u3", "Noah Patel", "noah@aurorapm.io", "Engineer"),
      new UserDto("u4", "Iris Morgan", "iris@aurorapm.io", "Admin")));
  private final List<TeamDto> teams = new ArrayList<>(Arrays.asList(
      new TeamDto("t1", "Platform Core", "Maya Chen", 84),
      new TeamDto("t2", "Experience", "Asha Rao", 62),
      new TeamDto("t3", "Growth Ops", "Iris Morgan", 46)));
  private final List<ProjectDto> projects = new ArrayList<>(Arrays.asList(
      new ProjectDto("p1", "Workspace Intelligence", "WIN", "t1", "On Track", 74),
      new ProjectDto("p2", "Customer Portal", "CPT", "t2", "At Risk", 48),
      new ProjectDto("p3", "Revenue Automation", "REV", "t3", "On Track", 61)));
  private final List<SprintDto> sprints = new ArrayList<>(Arrays.asList(
      new SprintDto("s1", "Sprint 19", "Ship unified board search and file handoff", "2026-07-01", "2026-07-14", 76),
      new SprintDto("s2", "Sprint 20", "Harden analytics and notification routing", "2026-07-15", "2026-07-28", 68)));
  private final List<TaskDto> tasks = new ArrayList<>(Arrays.asList(
      new TaskDto("task-1", "WIN-122", "Organization-level permission matrix", "p1", "u4", "In Progress", "Critical", "Sprint 19", 8, Arrays.asList("auth", "organizations")),
      new TaskDto("task-2", "WIN-141", "Global search across tasks, files, and comments", "p1", "u3", "Review", "High", "Sprint 19", 5, Arrays.asList("search", "comments")),
      new TaskDto("task-3", "CPT-87", "Kanban board swimlanes by team", "p2", "u2", "Todo", "High", "Sprint 19", 5, Arrays.asList("kanban", "teams")),
      new TaskDto("task-4", "REV-53", "Sprint planning velocity forecast", "p3", "u1", "Backlog", "Medium", "Sprint 20", 3, Arrays.asList("sprints", "analytics")),
      new TaskDto("task-5", "CPT-91", "S3 attachment upload policy", "p2", "u4", "Done", "Medium", "Sprint 19", 2, Arrays.asList("files", "s3")),
      new TaskDto("task-6", "REV-61", "Slack-style project notification rules", "p3", "u2", "In Progress", "High", "Sprint 19", 8, Arrays.asList("notifications", "redis"))));
  private final List<NotificationDto> notifications = new ArrayList<>(Arrays.asList(
      new NotificationDto("n1", "Review needed", "WIN-141 is ready for product review.", "info"),
      new NotificationDto("n2", "Capacity warning", "Experience team is at 92% planned capacity.", "warning"),
      new NotificationDto("n3", "Release checklist", "CPT attachment policy passed validation.", "success")));
  private final List<CommentDto> comments = new ArrayList<>(Arrays.asList(
      new CommentDto("c1", "task-1", "Maya Chen", "Security review is scheduled after the policy export lands.", "09:12"),
      new CommentDto("c2", "task-2", "Asha Rao", "Search should rank comments lower than tasks unless the match is exact.", "10:04")));

  public DashboardDto dashboard() {
    return new DashboardDto(organization, users, teams, projects, sprints, tasks, notifications, analytics());
  }

  public List<TaskDto> tasks() {
    return tasks;
  }

  public List<ProjectDto> projects() {
    return projects;
  }

  public List<CommentDto> comments(String taskId) {
    return comments.stream()
        .filter(comment -> taskId == null || taskId.equals(comment.taskId))
        .collect(Collectors.toList());
  }

  public CommentDto addComment(String taskId, String body) {
    CommentDto comment = new CommentDto(
        "c-" + UUID.randomUUID(),
        taskId,
        "Asha Rao",
        body,
        Instant.now().toString());
    comments.add(0, comment);
    return comment;
  }

  public TaskDto updateStatus(String taskId, String status) {
    for (TaskDto task : tasks) {
      if (task.id.equals(taskId)) {
        task.status = status;
        return task;
      }
    }
    throw new IllegalArgumentException("Task not found: " + taskId);
  }

  public List<TaskDto> search(String query) {
    String term = query == null ? "" : query.toLowerCase(Locale.ROOT).trim();
    if (term.isEmpty()) {
      return tasks;
    }

    return tasks.stream()
        .filter(task -> String.join(" ", task.key, task.title, task.status, task.priority, task.sprint, String.join(" ", task.labels))
            .toLowerCase(Locale.ROOT)
            .contains(term))
        .collect(Collectors.toList());
  }

  public AnalyticsDto analytics() {
    int completed = 0;
    int inFlight = 0;
    int criticalOpen = 0;
    int totalPoints = 0;
    int completedPoints = 0;

    for (TaskDto task : tasks) {
      totalPoints += task.storyPoints;
      if ("Done".equals(task.status)) {
        completed++;
        completedPoints += task.storyPoints;
      }
      if ("In Progress".equals(task.status) || "Review".equals(task.status)) {
        inFlight++;
      }
      if ("Critical".equals(task.priority) && !"Done".equals(task.status)) {
        criticalOpen++;
      }
    }

    return new AnalyticsDto(completed, inFlight, criticalOpen, totalPoints, completedPoints);
  }

  public UploadResponse createUpload(String projectId, String fileName) {
    String storageKey = "s3://aurora-pm/project/" + projectId + "/" + fileName;
    String uploadUrl = "https://s3.amazonaws.com/aurora-pm/" + projectId + "/" + fileName + "?signature=demo";
    return new UploadResponse(uploadUrl, storageKey, "15m");
  }
}
