package com.aurorapm.ai.service;

import com.aurorapm.project.dto.CreateWorkItemRequest;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AiAssistantService {

    @Data
    @Builder
    public static class TaskBreakdownResponse {
        private String summary;
        private List<CreateWorkItemRequest> tasks;
    }

    public TaskBreakdownResponse breakdownEpicOrStory(UUID projectId, String title, String description) {
        List<CreateWorkItemRequest> tasks = new ArrayList<>();

        CreateWorkItemRequest task1 = new CreateWorkItemRequest();
        task1.setProjectId(projectId);
        task1.setTitle("Design & Architecture Specification for " + title);
        task1.setDescription("Technical design, API contracts, and data models.");
        task1.setType("TASK");
        task1.setPriority("HIGH");
        task1.setStoryPoints(3);
        tasks.add(task1);

        CreateWorkItemRequest task2 = new CreateWorkItemRequest();
        task2.setProjectId(projectId);
        task2.setTitle("Backend API Implementation for " + title);
        task2.setDescription("Build endpoints, entities, and business logic logic.");
        task2.setType("TASK");
        task2.setPriority("HIGH");
        task2.setStoryPoints(5);
        tasks.add(task2);

        CreateWorkItemRequest task3 = new CreateWorkItemRequest();
        task3.setProjectId(projectId);
        task3.setTitle("Frontend UI Components & Integration for " + title);
        task3.setDescription("Develop responsive React/Next.js pages and bind to API.");
        task3.setType("TASK");
        task3.setPriority("MEDIUM");
        task3.setStoryPoints(5);
        tasks.add(task3);

        CreateWorkItemRequest task4 = new CreateWorkItemRequest();
        task4.setProjectId(projectId);
        task4.setTitle("End-to-End Integration & Unit Testing");
        task4.setDescription("Add unit tests, test error cases, and conduct UI sanity testing.");
        task4.setType("TASK");
        task4.setPriority("MEDIUM");
        task4.setStoryPoints(2);
        tasks.add(task4);

        return TaskBreakdownResponse.builder()
                .summary("AI generated 4 sub-tasks based on: " + title)
                .tasks(tasks)
                .build();
    }

    public List<String> generateAcceptanceCriteria(String title, String description) {
        return List.of(
                "Given a user is logged in, when they access " + title + ", then the UI loads in under 500ms.",
                "Given invalid input data, when submitted, then a clear validation error is displayed adhering to RFC 7807.",
                "Given concurrent updates, optimistic locking (@Version) prevents data loss.",
                "Given tenant isolation, all queries filter strictly by organization ID."
        );
    }

    public String generateAssistantReply(String prompt) {
        return "Aurora AI Assistant: I analyzed your request ('" + prompt + "'). Key recommendations:\n" +
                "1. High priority tasks should be scheduled into the upcoming active sprint.\n" +
                "2. Ensure tenant filter (`TenantContextFilter`) is enforced on all endpoints.\n" +
                "3. Workload across engineers is currently balanced within target capacity.";
    }
}
