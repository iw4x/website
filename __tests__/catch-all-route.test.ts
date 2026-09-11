import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT } from "@/app/[lang]/[...slug]/route";
import { cacheControlFor } from "@/lib/http/cache-control";

function requestFor(pathname: string): NextRequest {
  return new NextRequest(new URL(pathname, "https://iw4x.io"));
}

describe("catch-all route", () => {
  it("returns 404 for an unknown path", () => {
    expect(GET(requestFor("/en/nope")).status).toBe(404);
  });

  it("serves 404s with the shared notFound cache policy", () => {
    expect(GET(requestFor("/en/nope")).headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });

  it("serves 404s as HTML so browsers render them", async () => {
    const response = GET(requestFor("/en/nope"));

    expect(response.headers.get("Content-Type")).toContain("text/html");
    expect(await response.text()).toContain("Not found");
  });

  it("keeps 404s out of search indexes", () => {
    expect(GET(requestFor("/en/nope")).headers.get("X-Robots-Tag")).toBe("noindex");
  });

  it("redirects a known source with the shared redirect cache policy", () => {
    const response = GET(requestFor("/en/docs"));

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe("https://docs.iw4x.io/");
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("redirect"));
  });

  it("matches redirects regardless of trailing slash or case", () => {
    expect(GET(requestFor("/en/docs/")).status).toBe(307);
    expect(GET(requestFor("/en/DOCS")).status).toBe(307);
  });

  it("looks redirects up without the locale prefix", () => {
    expect(GET(requestFor("/en/en/docs")).status).toBe(404);
  });

  it("serves cacheable 404s for paths outside any locale", () => {
    const response = GET(requestFor("/_next/static/chunks/missing.js"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });

  it.each([
    ["HEAD", HEAD],
    ["POST", POST],
    ["PUT", PUT],
    ["PATCH", PATCH],
    ["DELETE", DELETE],
    ["OPTIONS", OPTIONS],
  ])("answers %s with a cacheable 404 rather than a 405", (_method, handler) => {
    const response = handler(requestFor("/en/nope"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });
});
