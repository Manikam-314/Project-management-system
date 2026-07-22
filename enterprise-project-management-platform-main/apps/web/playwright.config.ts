import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  use: {
    baseURL: "http://localhost:3300",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- --port 3300",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: "http://localhost:3300"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
