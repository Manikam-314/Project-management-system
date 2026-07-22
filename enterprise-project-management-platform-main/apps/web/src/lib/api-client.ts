const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type ApiError = {
  status: number;
  title: string;
  detail: string;
  errorCode?: string;
  path?: string;
};

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  organizationId?: string | null;
};

export class ApiClientError extends Error {
  constructor(public readonly problem: ApiError) {
    super(problem.detail);
    this.name = "ApiClientError";
  }
}

async function parseError(response: Response): Promise<ApiError> {
  try {
    const problem = (await response.json()) as ApiError;
    return {
      status: problem.status ?? response.status,
      title: problem.title ?? response.statusText,
      detail: problem.detail ?? "Request failed",
      errorCode: problem.errorCode,
      path: problem.path
    };
  } catch {
    return {
      status: response.status,
      title: response.statusText,
      detail: "Request failed"
    };
  }
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.organizationId) {
    headers["X-Organization-Id"] = options.organizationId;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new ApiClientError(await parseError(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export { API_BASE_URL };
