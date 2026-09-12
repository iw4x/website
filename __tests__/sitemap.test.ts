import { describe, expect, it } from "vitest";

import sitemap, { lastModified } from "@/app/sitemap";
import robots from "@/app/robots";
import { LOCALES, LOCALE_DETAILS } from "@/lib/i18n/config";
import { RELEASES } from "@/lib/releases";
import { SITE } from "@/lib/site-config";

describe("sitemap", () => {
  const entries = sitemap();

  it("lists every locale exactly once", () => {
    expect(entries.map(({ url }) => url)).toEqual(LOCALES.map((locale) => `${SITE.url}/${locale}`));
  });

  it("uses absolute URLs on the production origin", () => {
    for (const { url } of entries) {
      expect(new URL(url).origin).toBe(SITE.url);
    }
  });

  it("cross-links every translation for hreflang", () => {
    for (const entry of entries) {
      for (const locale of LOCALES) {
        expect(entry.alternates?.languages).toHaveProperty([LOCALE_DETAILS[locale].tag], `${SITE.url}/${locale}`);
      }
    }
  });

  it("dates the page from the newest release, so rebuilds do not churn the sitemap", () => {
    expect(lastModified().toISOString()).toBe(new Date(`${RELEASES[0].publishedOn}T00:00:00Z`).toISOString());

    for (const { lastModified: modified } of entries) {
      expect(modified).toEqual(lastModified());
    }
  });

  it("is stable across calls", () => {
    expect(JSON.stringify(sitemap())).toBe(JSON.stringify(entries));
  });
});

describe("robots", () => {
  const rules = robots();

  it("lets every crawler read the whole site", () => {
    expect(rules.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("points crawlers at the sitemap and the canonical host", () => {
    expect(rules.sitemap).toBe(`${SITE.url}/sitemap.xml`);
    expect(rules.host).toBe(SITE.url);
  });
});
