import { describe, expect, it } from "vitest";

import { cacheControlFor } from "@/lib/http/cache-control";
import { publicAssetPaths } from "@/lib/http/public-assets";
import {
  BASE_STYLESHEET_PATH,
  escapeHtml,
  localeRedirectResponse,
  notFoundResponse,
  redirectResponse,
} from "@/lib/http/responses";
import { DEFAULT_LOCALE, LOCALES, LOCALE_DETAILS } from "@/lib/i18n/config";
import { ALL_DICTIONARIES } from "@/lib/i18n/dictionaries";
import { SITE } from "@/lib/site-config";

describe("escapeHtml", () => {
  it("escapes every character that is significant in HTML", () => {
    expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
      "&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;",
    );
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("Not found")).toBe("Not found");
  });
});

describe("notFoundResponse", () => {
  it("uses the 404 status", () => {
    expect(notFoundResponse(DEFAULT_LOCALE).status).toBe(404);
  });

  it("carries the shared notFound cache policy", () => {
    expect(notFoundResponse(DEFAULT_LOCALE).headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });

  it("is HTML and stays out of search indexes", async () => {
    const response = notFoundResponse(DEFAULT_LOCALE);
    const html = await response.text();

    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(html).toContain('<meta name="robots" content="noindex">');
  });

  it.each(LOCALES)("is written in %s when that is the locale", async (locale) => {
    const { title, message, homeLink } = ALL_DICTIONARIES[locale].notFound;
    const html = await notFoundResponse(locale).text();

    expect(html).toContain(`<html lang="${LOCALE_DETAILS[locale].tag}">`);
    expect(html).toContain(`<title>${escapeHtml(title)} | ${SITE.name}</title>`);
    expect(html).toContain(`<h1>${escapeHtml(title)}</h1>`);
    expect(html).toContain(escapeHtml(message));
    expect(html).toContain(escapeHtml(homeLink));
  });

  it("links the shared accessible base stylesheet", async () => {
    const html = await notFoundResponse(DEFAULT_LOCALE).text();

    expect(html).toContain(`<link rel="stylesheet" href="${BASE_STYLESHEET_PATH}">`);
    expect(publicAssetPaths(process.cwd())).toContain(BASE_STYLESHEET_PATH);
  });

  it("carries no inline styles", async () => {
    const html = await notFoundResponse(DEFAULT_LOCALE).text();

    expect(html).not.toContain("<style");
    expect(html).not.toContain(" style=");
  });

  it.each(LOCALES)("links home within the %s locale", async (locale) => {
    expect(await notFoundResponse(locale).text()).toContain(`<a href="/${locale}">`);
  });
});

describe("redirectResponse", () => {
  it("uses 307 for a temporary redirect", () => {
    expect(redirectResponse({ from: "/a", to: "/b", permanent: false }).status).toBe(307);
  });

  it("uses 308 for a permanent redirect", () => {
    expect(redirectResponse({ from: "/a", to: "/b", permanent: true }).status).toBe(308);
  });

  it("sets the destination", () => {
    const response = redirectResponse({ from: "/a", to: "https://example.com/", permanent: false });

    expect(response.headers.get("Location")).toBe("https://example.com/");
  });

  it.each([true, false])("carries the shared redirect cache policy (permanent: %s)", (permanent) => {
    const response = redirectResponse({ from: "/a", to: "/b", permanent });

    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("redirect"));
  });

  it("has no body", () => {
    expect(redirectResponse({ from: "/a", to: "/b", permanent: true }).body).toBeNull();
  });
});

describe("localeRedirectResponse", () => {
  it("redirects temporarily to the given location", () => {
    const response = localeRedirectResponse("https://iw4x.io/en");

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe("https://iw4x.io/en");
  });

  it("varies by Accept-Language", () => {
    expect(localeRedirectResponse("/en").headers.get("Vary")).toBe("Accept-Language");
  });

  it("carries the short locale redirect cache policy", () => {
    expect(localeRedirectResponse("/en").headers.get("Cache-Control")).toBe(cacheControlFor("localeRedirect"));
  });

  it("has no body", () => {
    expect(localeRedirectResponse("/en").body).toBeNull();
  });
});
