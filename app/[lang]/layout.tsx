import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LOCALES, LOCALE_DETAILS, isLocale } from "@/lib/i18n/config";
import { localeMetadata } from "@/lib/i18n/metadata";

import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return localeMetadata(lang);
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
