import { expect, test } from "@playwright/test";

test("enterprise project dashboard supports core workflows", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await page.getByLabel("Email").fill("admin@aurorapm.io");
  await page.getByLabel("Password").fill("Admin@123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByLabel("Signed in user")).toContainText("Iris Morgan");
  await expect(page.getByRole("heading", { name: "Plan, ship, and discuss work across every team." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sprint 19" })).toBeVisible();

  await page
    .getByLabel("Search tasks, projects, comments, and files")
    .fill("redis");
  await expect(page.getByText("Slack-style project notification rules")).toBeVisible();
  await expect(page.getByText("Organization-level permission matrix")).toHaveCount(0);

  await page.getByLabel("Search tasks, projects, comments, and files").fill("");
  await page.getByLabel("Move CPT-87").selectOption("In Progress");
  await expect(page.getByText("Kanban board swimlanes by team")).toBeVisible();

  await page.getByLabel("Add comment").fill("E2E comment from project flow.");
  await page.getByLabel("Send comment").click();
  await expect(page.getByText("E2E comment from project flow.")).toBeVisible();

  await page.getByRole("button", { name: "Add sample file" }).click();
  await expect(page.getByText("sprint-plan-notes.md", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
