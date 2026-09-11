import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LOCALES, LOCALE_DETAILS, isLocale } from "@/lib/i18n/config";
import { SITE } from "@/lib/site-config";

import "../globals.css";

export const metadata: Metadata = {
  title: SITE.name,
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html lang={LOCALE_DETAILS[lang].tag}>
      <body>{children}</body>
    </html>
  );
}
