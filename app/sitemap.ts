import type { MetadataRoute } from "next";

import { LOCALES, localeTag } from "@/lib/i18n/config";
import { RELEASES } from "@/lib/releases";
import { SITE } from "@/lib/site-config";

const LANGUAGES = Object.fromEntries(
  LOCALES.map((locale) => [localeTag(locale), `${SITE.url}/${locale}`]),
);

export function lastModified(): Date {
  return new Date(`${RELEASES[0].publishedOn}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    lastModified: lastModified(),
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages: LANGUAGES },
  }));
}
