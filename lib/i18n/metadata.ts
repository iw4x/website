import type { Metadata } from "next";

import { SITE } from "../site-config";
import { DEFAULT_LOCALE, LOCALES, LOCALE_DETAILS, type Locale } from "./config";
import { getDictionaryFor } from "./dictionaries";

export function localeMetadata(locale: Locale): Metadata {
  const languages = Object.fromEntries(LOCALES.map((supported) => [LOCALE_DETAILS[supported].tag, `/${supported}`]));

  return {
    metadataBase: new URL(SITE.url),
    title: SITE.name,
    description: getDictionaryFor(locale).metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `/${DEFAULT_LOCALE}`,
      },
    },
  };
}
