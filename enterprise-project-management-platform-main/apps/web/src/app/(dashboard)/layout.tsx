"use client";

import { JiraShellLayout } from "@/components/layout/jira-shell-layout";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <JiraShellLayout>{children}</JiraShellLayout>;
}

