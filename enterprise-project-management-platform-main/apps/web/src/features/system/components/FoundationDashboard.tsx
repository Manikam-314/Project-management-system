"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, Database, Server } from "lucide-react";
import { fetchSystemHealth } from "@/features/system/api/system.api";
import { useOrganizationStore } from "@/stores/org-store";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

export function FoundationDashboard() {
  const organizationId = useOrganizationStore((state) => state.organizationId);
  const setOrganization = useOrganizationStore((state) => state.setOrganization);

  const healthQuery = useQuery({
    queryKey: ["system-health", organizationId],
    queryFn: () => fetchSystemHealth(organizationId)
  });

  function handleOrganizationSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextOrganizationId = String(formData.get("organizationId") ?? "").trim();
    if (nextOrganizationId) {
      setOrganization(nextOrganizationId, "demo-org");
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AuroraPM Foundation</h1>
        <p className="max-w-2xl text-muted-foreground">
          Phase 0 platform shell — Maven multi-module backend, Next.js frontend, Docker Compose
          infrastructure, and shared cross-cutting concerns. Authentication arrives in Phase 1.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {healthQuery.isLoading ? "..." : (healthQuery.data?.status ?? "DOWN")}
            </div>
            <p className="text-xs text-muted-foreground">
              {healthQuery.data?.application ?? "aurorapm-api"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Version</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthQuery.data?.version ?? "0.1.0"}</div>
            <p className="text-xs text-muted-foreground">Platform release</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenant Context</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="truncate text-sm font-medium">
              {organizationId ?? "Not set"}
            </div>
            <p className="text-xs text-muted-foreground">X-Organization-Id header stub</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Context Stub</CardTitle>
          <CardDescription>
            Set a demo organization UUID to verify the backend TenantContext filter and Zustand
            store wiring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 sm:flex-row" onSubmit={handleOrganizationSubmit}>
            <Input
              name="organizationId"
              placeholder="00000000-0000-0000-0000-000000000001"
              defaultValue={organizationId ?? ""}
            />
            <Button type="submit">Apply Organization</Button>
          </form>
          {healthQuery.isError && (
            <p className="mt-4 text-sm text-destructive">
              API unreachable. Start the backend with Docker Compose or Maven.
            </p>
          )}
          {healthQuery.data?.organizationId && (
            <p className="mt-4 text-sm text-muted-foreground">
              API echoed organization: {healthQuery.data.organizationId}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
