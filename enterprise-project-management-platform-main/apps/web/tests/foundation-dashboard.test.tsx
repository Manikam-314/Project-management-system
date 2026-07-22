import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { FoundationDashboard } from "@/features/system/components/FoundationDashboard";

vi.mock("@/features/system/api/system.api", () => ({
  fetchSystemHealth: vi.fn().mockResolvedValue({
    status: "UP",
    application: "aurorapm-api",
    version: "0.1.0",
    timestamp: new Date().toISOString()
  })
}));

describe("FoundationDashboard", () => {
  it("renders foundation status cards", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FoundationDashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText("AuroraPM Foundation")).toBeInTheDocument();
    expect(await screen.findByText("UP")).toBeInTheDocument();
    expect(screen.getByText("0.1.0")).toBeInTheDocument();
  });
});
