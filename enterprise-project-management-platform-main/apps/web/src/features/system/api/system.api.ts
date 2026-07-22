import { apiClient } from "@/lib/api-client";

export type SystemHealthResponse = {
  status: string;
  application: string;
  version: string;
  timestamp: string;
  organizationId?: string;
};

export function fetchSystemHealth(organizationId?: string | null) {
  return apiClient<SystemHealthResponse>("/api/v1/system/health", {
    organizationId
  });
}
