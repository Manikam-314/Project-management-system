package com.aurora.pm.dto;

import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public final class PlatformDtos {
  private PlatformDtos() {}

  public static class LoginRequest {
    @Email public String email;
    @NotBlank public String password;
  }

  public static class AuthResponse {
    public String token;
    public UserDto user;

    public AuthResponse(String token, UserDto user) {
      this.token = token;
      this.user = user;
    }
  }

  public static class UserDto {
    public String id;
    public String name;
    public String email;
    public String role;

    public UserDto(String id, String name, String email, String role) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
    }
  }

  public static class OrganizationDto {
    public String id;
    public String name;
    public String plan;
    public int members;

    public OrganizationDto(String id, String name, String plan, int members) {
      this.id = id;
      this.name = name;
      this.plan = plan;
      this.members = members;
    }
  }

  public static class TeamDto {
    public String id;
    public String name;
    public String lead;
    public int capacity;

    public TeamDto(String id, String name, String lead, int capacity) {
      this.id = id;
      this.name = name;
      this.lead = lead;
      this.capacity = capacity;
    }
  }

  public static class ProjectDto {
    public String id;
    public String name;
    public String key;
    public String teamId;
    public String health;
    public int progress;

    public ProjectDto(String id, String name, String key, String teamId, String health, int progress) {
      this.id = id;
      this.name = name;
      this.key = key;
      this.teamId = teamId;
      this.health = health;
      this.progress = progress;
    }
  }

  public static class SprintDto {
    public String id;
    public String name;
    public String goal;
    public String startsAt;
    public String endsAt;
    public int committedPoints;

    public SprintDto(String id, String name, String goal, String startsAt, String endsAt, int committedPoints) {
      this.id = id;
      this.name = name;
      this.goal = goal;
      this.startsAt = startsAt;
      this.endsAt = endsAt;
      this.committedPoints = committedPoints;
    }
  }

  public static class TaskDto {
    public String id;
    public String key;
    public String title;
    public String projectId;
    public String assigneeId;
    public String status;
    public String priority;
    public String sprint;
    public int storyPoints;
    public List<String> labels;

    public TaskDto(String id, String key, String title, String projectId, String assigneeId, String status, String priority, String sprint, int storyPoints, List<String> labels) {
      this.id = id;
      this.key = key;
      this.title = title;
      this.projectId = projectId;
      this.assigneeId = assigneeId;
      this.status = status;
      this.priority = priority;
      this.sprint = sprint;
      this.storyPoints = storyPoints;
      this.labels = labels;
    }
  }

  public static class UpdateTaskStatusRequest {
    @NotBlank public String status;
  }

  public static class CommentRequest {
    @NotBlank public String taskId;
    @NotBlank public String body;
  }

  public static class CommentDto {
    public String id;
    public String taskId;
    public String author;
    public String body;
    public String createdAt;

    public CommentDto(String id, String taskId, String author, String body, String createdAt) {
      this.id = id;
      this.taskId = taskId;
      this.author = author;
      this.body = body;
      this.createdAt = createdAt;
    }
  }

  public static class NotificationDto {
    public String id;
    public String title;
    public String body;
    public String severity;

    public NotificationDto(String id, String title, String body, String severity) {
      this.id = id;
      this.title = title;
      this.body = body;
      this.severity = severity;
    }
  }

  public static class AnalyticsDto {
    public int completed;
    public int inFlight;
    public int criticalOpen;
    public int totalPoints;
    public int completedPoints;

    public AnalyticsDto(int completed, int inFlight, int criticalOpen, int totalPoints, int completedPoints) {
      this.completed = completed;
      this.inFlight = inFlight;
      this.criticalOpen = criticalOpen;
      this.totalPoints = totalPoints;
      this.completedPoints = completedPoints;
    }
  }

  public static class DashboardDto {
    public OrganizationDto organization;
    public List<UserDto> users;
    public List<TeamDto> teams;
    public List<ProjectDto> projects;
    public List<SprintDto> sprints;
    public List<TaskDto> tasks;
    public List<NotificationDto> notifications;
    public AnalyticsDto analytics;

    public DashboardDto(OrganizationDto organization, List<UserDto> users, List<TeamDto> teams, List<ProjectDto> projects, List<SprintDto> sprints, List<TaskDto> tasks, List<NotificationDto> notifications, AnalyticsDto analytics) {
      this.organization = organization;
      this.users = users;
      this.teams = teams;
      this.projects = projects;
      this.sprints = sprints;
      this.tasks = tasks;
      this.notifications = notifications;
      this.analytics = analytics;
    }
  }

  public static class UploadRequest {
    @NotBlank public String fileName;
    @NotBlank public String contentType;
    @NotNull public Long sizeBytes;
    @NotBlank public String projectId;
  }

  public static class UploadResponse {
    public String uploadUrl;
    public String storageKey;
    public String expiresIn;

    public UploadResponse(String uploadUrl, String storageKey, String expiresIn) {
      this.uploadUrl = uploadUrl;
      this.storageKey = storageKey;
      this.expiresIn = expiresIn;
    }
  }
}
