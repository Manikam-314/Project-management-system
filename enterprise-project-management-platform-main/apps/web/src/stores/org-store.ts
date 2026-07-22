"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrganizationState = {
  organizationId: string | null;
  organizationSlug: string | null;
  setOrganization: (organizationId: string, organizationSlug: string) => void;
  clearOrganization: () => void;
};

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizationId: null,
      organizationSlug: null,
      setOrganization: (organizationId, organizationSlug) =>
        set({ organizationId, organizationSlug }),
      clearOrganization: () => set({ organizationId: null, organizationSlug: null })
    }),
    {
      name: "aurorapm-org"
    }
  )
);
