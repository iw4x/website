import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { cacheControlFor } from "@/lib/http/cache-control";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { config, proxy } from "@/proxy";

function requestFor(path: string): NextRequest {
  return new NextRequest(new URL(path, "https://iw4x.io"));
}

describe("proxy", () => {
  it("negotiates a locale for unprefixed paths", () => {
    const response = proxy(requestFor("/"));

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(`https://iw4x.io/${DEFAULT_LOCALE}`);
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("localeRedirect"));
  });

  it("canonicalises trailing slashes", () => {
    expect(proxy(requestFor("/docs/")).status).toBe(308);
  });

  it("passes localised paths through", () => {
    expect(proxy(requestFor(`/${DEFAULT_LOCALE}`)).headers.get("x-middleware-next")).toBe("1");
  });
});

describe("matcher", () => {
  const matches = (pathname: string) => new RegExp(`^${config.matcher[0]}$`).test(pathname);

  it.each(["/_next/static/chunks/app.js", "/_next/image"])("leaves Next.js output alone: %s", (pathname) => {
    expect(matches(pathname)).toBe(false);
  });

  it.each(["/", "/docs", "/en", "/en/", "/favicon.ico", "/missing.png", "/_next", "/some/deep/path/"])(
    "handles %s",
    (pathname) => {
      expect(matches(pathname)).toBe(true);
    },
  );
});
