import { describe, expect, it } from "vitest";

import { cacheControlFor } from "@/lib/http/cache-control";

import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT } from "./route";

describe("catch-all route", () => {
  it("returns 404 for an unknown path", () => {
    expect(GET().status).toBe(404);
  });

  it("serves 404s with the shared notFound cache policy", () => {
    expect(GET().headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });

  it("serves 404s as HTML so browsers render them", async () => {
    const response = GET();

    expect(response.headers.get("Content-Type")).toContain("text/html");
    expect(await response.text()).toContain("Not found");
  });

  it("keeps 404s out of search indexes", () => {
    expect(GET().headers.get("X-Robots-Tag")).toBe("noindex");
  });

  it.each([
    ["HEAD", HEAD],
    ["POST", POST],
    ["PUT", PUT],
    ["PATCH", PATCH],
    ["DELETE", DELETE],
    ["OPTIONS", OPTIONS],
  ])("answers %s with a cacheable 404 rather than a 405", (_method, handler) => {
    const response = handler();

    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });
});
