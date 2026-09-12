import { expect, test } from "@playwright/test";

import { METADATA_ROUTES } from "../lib/http/metadata-routes";
import { securityHeaders } from "../lib/http/security-headers";
import { LOCALES } from "../lib/i18n/config";
import { SITE } from "../lib/site-config";

const PATHS = [`/${LOCALES[0]}`, `/${LOCALES[0]}/this-page-does-not-exist`, ...METADATA_ROUTES];

test.describe("security headers", () => {
  for (const path of PATHS) {
    test(`${path} carries every security header`, async ({ request }) => {
      const response = await request.get(path, { maxRedirects: 0 });
      const headers = response.headers();

      for (const { key, value } of securityHeaders()) {
        expect(headers[key.toLowerCase()], `${path} is missing ${key}`).toBe(value);
      }
    });
  }

  test("never advertises the framework", async ({ request }) => {
    expect((await request.get(`/${LOCALES[0]}`)).headers()).not.toHaveProperty("x-powered-by");
  });

  test("the policy admits no third-party origin", async ({ request }) => {
    const policy = (await request.get(`/${LOCALES[0]}`)).headers()["content-security-policy"];

    expect(policy).not.toMatch(/https?:\/\//);
    expect(policy).not.toContain("'unsafe-eval'");
  });
});

test.describe("crawler files", () => {
  test("robots.txt is served at the origin root, not redirected into a locale", async ({ request }) => {
    const response = await request.get("/robots.txt", { maxRedirects: 0 });

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/plain");

    const body = await response.text();

    expect(body).toContain("User-Agent: *");
    expect(body).toContain(`Sitemap: ${SITE.url}/sitemap.xml`);
  });

  test("sitemap.xml is served at the origin root and lists every locale", async ({ request }) => {
    const response = await request.get("/sitemap.xml", { maxRedirects: 0 });

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");

    const body = await response.text();

    for (const locale of LOCALES) {
      expect(body).toContain(`<loc>${SITE.url}/${locale}</loc>`);
      expect(body).toContain(`hreflang="${locale}"`);
    }
  });

  test("the sitemap the robots file advertises is the one that exists", async ({ request }) => {
    const advertised = /Sitemap:\s*(\S+)/.exec(await (await request.get("/robots.txt")).text())?.[1] ?? "";

    expect(new URL(advertised).pathname).toBe("/sitemap.xml");
    expect((await request.get(new URL(advertised).pathname)).status()).toBe(200);
  });
});

test.describe("social metadata", () => {
  test("describes the page for link previews", async ({ page }) => {
    await page.goto(`/${LOCALES[0]}`);

    const content = (property: string, attribute = "property") =>
      page.locator(`meta[${attribute}="${property}"]`).getAttribute("content");

    expect(await content("og:type")).toBe("website");
    expect(await content("og:site_name")).toBe(SITE.name);
    expect(await content("og:url")).toBe(`${SITE.url}/${LOCALES[0]}`);
    expect(await content("og:title")).toBe(SITE.name);
    expect((await content("og:description"))?.length ?? 0).toBeGreaterThan(0);
    expect(await content("twitter:card", "name")).toBe("summary");
    expect(await content("robots", "name")).toContain("index");
  });

  test("declares one canonical URL and an x-default alternate", async ({ page }) => {
    await page.goto(`/${LOCALES[0]}`);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE.url}/${LOCALES[0]}`);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  });
});
