import { describe, expect, it } from "vitest";

import {
  CACHE_POLICIES,
  ONE_YEAR_SECONDS,
  type CachePolicyName,
  cacheControl,
  cacheControlFor,
} from "./cache-control";

const POLICY_NAMES = Object.keys(CACHE_POLICIES) as CachePolicyName[];

describe("cacheControl", () => {
  it("always marks responses as publicly cacheable", () => {
    expect(cacheControl({ sMaxAge: 60 })).toContain("public");
  });

  it("defaults the browser lifetime to zero so the CDN stays purgeable", () => {
    expect(cacheControl({ sMaxAge: 60 })).toContain("max-age=0");
  });

  it("emits the browser lifetime when set", () => {
    expect(cacheControl({ sMaxAge: 60, maxAge: 30 })).toContain("max-age=30");
  });

  it("emits the shared-cache lifetime", () => {
    expect(cacheControl({ sMaxAge: 60 })).toContain("s-maxage=60");
  });

  it("omits stale directives that were not requested", () => {
    const value = cacheControl({ sMaxAge: 60 });

    expect(value).not.toContain("stale-while-revalidate");
    expect(value).not.toContain("stale-if-error");
  });

  it("emits stale directives when requested", () => {
    const value = cacheControl({
      sMaxAge: 60,
      staleWhileRevalidate: 120,
      staleIfError: 240,
    });

    expect(value).toContain("stale-while-revalidate=120");
    expect(value).toContain("stale-if-error=240");
  });

  it("emits immutable only for content-hashed responses", () => {
    expect(cacheControl({ sMaxAge: 60, immutable: true })).toContain("immutable");
    expect(cacheControl({ sMaxAge: 60 })).not.toContain("immutable");
  });

  it("renders directives in a stable order", () => {
    const value = cacheControl({
      maxAge: 1,
      sMaxAge: 2,
      staleWhileRevalidate: 3,
      staleIfError: 4,
      immutable: true,
    });

    expect(value).toBe("public, max-age=1, immutable, s-maxage=2, stale-while-revalidate=3, stale-if-error=4");
  });
});

describe("cache policies", () => {
  it.each(POLICY_NAMES)("%s is cacheable by a shared cache", (name) => {
    const value = cacheControlFor(name);

    expect(value).toMatch(/(^|, )public(,|$)/);
    expect(value).not.toContain("no-store");
    expect(value).not.toContain("no-cache");
    expect(value).not.toContain("private");
    expect(value).not.toContain("must-revalidate");
  });

  it.each(POLICY_NAMES)("%s has a non-zero shared-cache lifetime", (name) => {
    expect(CACHE_POLICIES[name].sMaxAge).toBeGreaterThan(0);
  });

  it("pins immutable assets for a year", () => {
    expect(CACHE_POLICIES.immutableAsset.sMaxAge).toBe(ONE_YEAR_SECONDS);
    expect(CACHE_POLICIES.immutableAsset.immutable).toBe(true);
  });

  it("keeps 404s and redirects short enough to correct quickly", () => {
    expect(CACHE_POLICIES.notFound.sMaxAge).toBeLessThanOrEqual(600);
    expect(CACHE_POLICIES.redirect.sMaxAge).toBeLessThanOrEqual(600);
  });
});
