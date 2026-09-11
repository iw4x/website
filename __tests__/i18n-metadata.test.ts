import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, LOCALES, LOCALE_DETAILS } from "@/lib/i18n/config";
import { ALL_DICTIONARIES } from "@/lib/i18n/dictionaries";
import { localeMetadata } from "@/lib/i18n/metadata";
import { SITE } from "@/lib/site-config";

describe("localeMetadata", () => {
  it.each(LOCALES)("resolves relative URLs against the production origin for %s", (locale) => {
    expect(String(localeMetadata(locale).metadataBase)).toBe(`${SITE.url}/`);
  });

  it.each(LOCALES)("titles %s pages with the site name", (locale) => {
    expect(localeMetadata(locale).title).toBe(SITE.name);
  });

  it.each(LOCALES)("describes %s pages in that language", (locale) => {
    expect(localeMetadata(locale).description).toBe(ALL_DICTIONARIES[locale].metadata.description);
  });

  it.each(LOCALES)("declares /%s as its own canonical URL", (locale) => {
    expect(localeMetadata(locale).alternates?.canonical).toBe(`/${locale}`);
  });

  it.each(LOCALES)("lists every translation as an alternate of %s", (locale) => {
    const languages = localeMetadata(locale).alternates?.languages ?? {};

    for (const supported of LOCALES) {
      expect(languages).toHaveProperty([LOCALE_DETAILS[supported].tag], `/${supported}`);
    }
  });

  it.each(LOCALES)("points x-default at the default locale from %s", (locale) => {
    expect(localeMetadata(locale).alternates?.languages).toHaveProperty(["x-default"], `/${DEFAULT_LOCALE}`);
  });
});
