import type { Metadata } from "next";
import { AppProviders } from "@/shared/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuroraPM",
  description: "Enterprise AI-powered project management platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
