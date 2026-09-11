import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MAIN_CONTENT_ID, SkipLink } from "@/components/skip-link";
import { LOCALES, LOCALE_DETAILS, isLocale } from "@/lib/i18n/config";
import { getDictionaryFor } from "@/lib/i18n/dictionaries";
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

  const dictionary = getDictionaryFor(lang);

  return (
    <html lang={LOCALE_DETAILS[lang].tag}>
      <body>
        <SkipLink label={dictionary.navigation.skipToContent} />
        <main id={MAIN_CONTENT_ID} tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
