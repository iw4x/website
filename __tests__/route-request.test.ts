import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { cacheControlFor } from "@/lib/http/cache-control";
import { routeRequest } from "@/lib/http/route-request";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";

const ORIGIN = "https://iw4x.io";
const PUBLIC_ASSETS: ReadonlySet<string> = new Set(["/favicon.ico", "/images/logo.png"]);

function route(path: string, headers: Record<string, string> = {}): Response {
  return routeRequest(new NextRequest(new URL(path, ORIGIN), { headers }), PUBLIC_ASSETS);
}

function isPassThrough(response: Response): boolean {
  return response.headers.get("x-middleware-next") === "1";
}

describe("trailing slashes", () => {
  it("redirects permanently with the shared redirect cache policy", () => {
    const response = route("/docs/");

    expect(response.status).toBe(308);
    expect(response.headers.get("Location")).toBe(`${ORIGIN}/docs`);
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("redirect"));
  });

  it("keeps the query string", () => {
    expect(route("/docs/?ref=home").headers.get("Location")).toBe(`${ORIGIN}/docs?ref=home`);
  });

  it("canonicalises before anything else, locale prefixes included", () => {
    expect(route(`/${DEFAULT_LOCALE}/`).headers.get("Location")).toBe(`${ORIGIN}/${DEFAULT_LOCALE}`);
  });

  it("stays on the requested origin", () => {
    const response = route("/docs/", { "x-forwarded-host": "evil.example" });

    expect(new URL(response.headers.get("Location") ?? "").origin).toBe(ORIGIN);
  });

  it("never builds a protocol-relative location from encoded slashes", () => {
    const response = route("/%2F%2Fevil.example/");

    expect(new URL(response.headers.get("Location") ?? "").origin).toBe(ORIGIN);
  });
});

describe("public assets", () => {
  it.each([...PUBLIC_ASSETS])("passes %s through without a locale", (path) => {
    expect(isPassThrough(route(path))).toBe(true);
  });

  it("passes assets through whatever the query string", () => {
    expect(isPassThrough(route("/favicon.ico?favicon.abc123.ico"))).toBe(true);
  });

  it("does not treat a missing file as an asset", () => {
    expect(route("/missing.png").status).toBe(307);
  });
});

describe("localised paths", () => {
  it.each(LOCALES)("passes /%s through", (locale) => {
    expect(isPassThrough(route(`/${locale}`, { "accept-language": "de" }))).toBe(true);
  });

  it.each(LOCALES)("passes nested /%s paths through", (locale) => {
    expect(isPassThrough(route(`/${locale}/docs/install`))).toBe(true);
  });
});

describe("locale redirect", () => {
  it("sends the root to the negotiated locale without a trailing slash", () => {
    expect(route("/", { "accept-language": "en-GB" }).headers.get("Location")).toBe(`${ORIGIN}/en`);
  });

  it("preserves the requested path and query string", () => {
    const response = route("/some/deep/path?q=iw4x");

    expect(response.headers.get("Location")).toBe(`${ORIGIN}/${DEFAULT_LOCALE}/some/deep/path?q=iw4x`);
  });

  it("falls back to the default locale for an unsupported language", () => {
    expect(route("/", { "accept-language": "de-DE" }).headers.get("Location")).toBe(`${ORIGIN}/${DEFAULT_LOCALE}`);
  });

  it("treats an unsupported prefix as an ordinary path", () => {
    expect(route("/de/docs").headers.get("Location")).toBe(`${ORIGIN}/${DEFAULT_LOCALE}/de/docs`);
  });

  it("does not mistake a segment that merely starts with a locale", () => {
    expect(route("/english").headers.get("Location")).toBe(`${ORIGIN}/${DEFAULT_LOCALE}/english`);
  });

  it("redirects temporarily because the destination depends on the visitor", () => {
    expect(route("/").status).toBe(307);
  });

  it("declares that it varies by Accept-Language", () => {
    expect(route("/").headers.get("Vary")).toBe("Accept-Language");
  });

  it("stays cacheable under the short locale redirect policy", () => {
    expect(route("/").headers.get("Cache-Control")).toBe(cacheControlFor("localeRedirect"));
  });

  it("survives a hostile Accept-Language header", () => {
    const response = route("/", { "accept-language": "en_US;q=nonsense,;;;" });

    expect(response.headers.get("Location")).toBe(`${ORIGIN}/${DEFAULT_LOCALE}`);
  });
});
