import { expect, test } from "@playwright/test";

type Directives = Map<string, string | true>;

function parseCacheControl(value: string | undefined): Directives {
  expect(value, "response is missing a Cache-Control header").toBeDefined();

  const directives: Directives = new Map();

  for (const part of (value ?? "").split(",")) {
    const [key, directiveValue] = part.trim().split("=");

    directives.set(key.toLowerCase(), directiveValue ?? true);
  }

  return directives;
}

function sharedLifetime(directives: Directives): number {
  const value = directives.get("s-maxage") ?? directives.get("max-age");

  if (value === undefined || value === true) {
    return 0;
  }

  return Number(value);
}

function expectSharedCacheable(value: string | undefined): Directives {
  const directives = parseCacheControl(value);

  expect(directives.has("no-store"), "no-store makes this an origin hit").toBe(false);
  expect(directives.has("no-cache"), "no-cache makes this an origin hit").toBe(false);
  expect(directives.has("private"), "private excludes shared caches").toBe(false);
  expect(sharedLifetime(directives), "a zero shared lifetime puts this path back on the origin").toBeGreaterThan(0);

  return directives;
}

test.describe("cache policy", () => {
  test("the homepage is held by shared caches", async ({ request }) => {
    const response = await request.get("/");

    expect(response.status()).toBe(200);
    expectSharedCacheable(response.headers()["cache-control"]);
  });

  test("404s are cacheable", async ({ request }) => {
    const response = await request.get("/this-path-does-not-exist", { maxRedirects: 0 });

    expect(response.status()).toBe(404);

    const directives = expectSharedCacheable(response.headers()["cache-control"]);

    expect(sharedLifetime(directives)).toBeLessThanOrEqual(600);
  });

  test("deeply nested 404s are cacheable", async ({ request }) => {
    const response = await request.get("/a/b/c/d/e", { maxRedirects: 0 });

    expect(response.status()).toBe(404);
    expectSharedCacheable(response.headers()["cache-control"]);
  });

  test("missing build assets are cacheable 404s", async ({ request }) => {
    const response = await request.get("/_next/static/chunks/missing.js", { maxRedirects: 0 });

    expect(response.status()).toBe(404);
    expectSharedCacheable(response.headers()["cache-control"]);
  });

  test("404s for other methods are cacheable", async ({ request }) => {
    const response = await request.post("/this-path-does-not-exist", { maxRedirects: 0 });

    expect(response.status()).toBe(404);
    expectSharedCacheable(response.headers()["cache-control"]);
  });

  test("404s are not indexable", async ({ request }) => {
    const response = await request.get("/this-path-does-not-exist");

    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  });

  test("redirects are cacheable", async ({ request }) => {
    const response = await request.get("/docs", { maxRedirects: 0 });

    expect([307, 308]).toContain(response.status());
    expect(response.headers().location).toBe("https://docs.iw4x.io/");
    expectSharedCacheable(response.headers()["cache-control"]);
  });

  test("content-hashed build output is immutable", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const assetPath = html.match(/\/_next\/static\/[^"']+\.js/)?.[0];

    expect(assetPath, "no hashed asset found on the homepage").toBeTruthy();

    const response = await request.get(assetPath ?? "");
    const directives = expectSharedCacheable(response.headers()["cache-control"]);

    expect(directives.has("immutable")).toBe(true);
    expect(sharedLifetime(directives)).toBeGreaterThan(31_000_000);
  });
});
