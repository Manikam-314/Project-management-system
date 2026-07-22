import { describe, expect, it } from "vitest";
import { API_BASE_URL } from "@/lib/api-client";

describe("api-client", () => {
  it("uses configured API base URL", () => {
    expect(API_BASE_URL).toBeTruthy();
  });
});
