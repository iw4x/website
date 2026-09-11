import type { Metadata } from "next";

import { SITE } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  title: SITE.name,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
