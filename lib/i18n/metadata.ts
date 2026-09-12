import type { Metadata } from "next";

import { SITE } from "../site-config";
import { DEFAULT_LOCALE, LOCALES, type Locale, localeTag } from "./config";
import { getDictionaryFor } from "./dictionaries";

export function localeMetadata(locale: Locale): Metadata {
  const languages = Object.fromEntries(LOCALES.map((supported) => [localeTag(supported), `/${supported}`]));
  const description = getDictionaryFor(locale).metadata.description;
  const others: readonly Locale[] = LOCALES.filter((supported) => supported !== locale);

  return {
    metadataBase: new URL(SITE.url),
    title: SITE.name,
    description,
    applicationName: SITE.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `/${DEFAULT_LOCALE}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: SITE.name,
      description,
      url: `/${locale}`,
      locale: localeTag(locale),
      alternateLocale: others.map(localeTag),
    },
    twitter: {
      card: "summary",
      title: SITE.name,
      description,
    },
  };
}
