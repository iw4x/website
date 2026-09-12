import { describe, expect, it } from "vitest";

import { METADATA_ROUTES, isMetadataRoute } from "@/lib/http/metadata-routes";
import { splitLocale } from "@/lib/i18n/config";

describe("metadata routes", () => {
  it("covers the files crawlers look for at the origin root", () => {
    expect([...METADATA_ROUTES]).toEqual(["/robots.txt", "/sitemap.xml"]);
  });

  it.each(METADATA_ROUTES)("recognises %s", (route) => {
    expect(isMetadataRoute(route)).toBe(true);
  });

  it.each(["/", "/en", "/robots", "/sitemap", "/en/robots.txt", "/Robots.txt"])("does not claim %s", (pathname) => {
    expect(isMetadataRoute(pathname)).toBe(false);
  });

  it.each(METADATA_ROUTES)("%s carries no locale, so it must never be redirected into one", (route) => {
    expect(splitLocale(route).locale).toBeNull();
  });
});
