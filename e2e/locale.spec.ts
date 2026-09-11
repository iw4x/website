import { expect, test } from "@playwright/test";

import { DEFAULT_LOCALE, LOCALES, LOCALE_DETAILS } from "../lib/i18n/config";

function sharedLifetime(cacheControl: string | undefined): number {
  return Number(/s-maxage=(\d+)/.exec(cacheControl ?? "")?.[1] ?? 0);
}

test.describe("device preference", () => {
  test.use({ javaScriptEnabled: false });

  for (const [deviceLocale, expected] of [
    ["en-GB", "en"],
    ["en-US", "en"],
    ["de-DE", DEFAULT_LOCALE],
  ]) {
    test(`a ${deviceLocale} device lands on /${expected}`, async ({ browser }) => {
      const context = await browser.newContext({ locale: deviceLocale });
      const page = await context.newPage();

      await page.goto("/");

      expect(new URL(page.url()).pathname).toBe(`/${expected}`);

      await context.close();
    });
  }
});

test.describe("the negotiating redirect", () => {
  test("is a temporary redirect to the negotiated locale", async ({ request }) => {
    const response = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "en-GB" } });

    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe("/en");
  });

  test("declares that it varies by Accept-Language", async ({ request }) => {
    const response = await request.get("/", { maxRedirects: 0 });

    expect(response.headers().vary).toMatch(/accept-language/i);
  });

  test("is cacheable, briefly", async ({ request }) => {
    const response = await request.get("/", { maxRedirects: 0 });
    const cacheControl = response.headers()["cache-control"];

    expect(cacheControl).not.toContain("no-store");
    expect(cacheControl).not.toContain("private");
    expect(sharedLifetime(cacheControl)).toBeGreaterThan(0);
    expect(sharedLifetime(cacheControl)).toBeLessThanOrEqual(300);
  });

  test("preserves the path and query it was asked for", async ({ request }) => {
    const response = await request.get("/some/deep/path?q=iw4x", { maxRedirects: 0 });

    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe(`/${DEFAULT_LOCALE}/some/deep/path?q=iw4x`);
  });

  test("treats an unsupported locale prefix as an ordinary path", async ({ request }) => {
    const response = await request.get("/de/anything", { maxRedirects: 0 });

    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe(`/${DEFAULT_LOCALE}/de/anything`);
  });

  test("leaves public assets unprefixed", async ({ request }) => {
    const response = await request.get("/favicon.ico", { maxRedirects: 0 });

    expect(response.status()).toBe(200);
  });
});

test.describe("localised pages", () => {
  for (const locale of LOCALES) {
    test(`/${locale} declares its language`, async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.locator("html")).toHaveAttribute("lang", LOCALE_DETAILS[locale].tag);
    });

    test(`/${locale} is cacheable for a long time`, async ({ request }) => {
      const response = await request.get(`/${locale}`, { maxRedirects: 0 });

      expect(response.status()).toBe(200);
      expect(response.headers()["cache-control"]).not.toContain("no-store");
      expect(sharedLifetime(response.headers()["cache-control"])).toBeGreaterThan(3600);
    });
  }
});
