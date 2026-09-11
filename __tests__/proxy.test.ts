import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { cacheControlFor } from "@/lib/http/cache-control";
import { config, proxy } from "@/proxy";

function requestFor(path: string, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest(new URL(path, "https://iw4x.io"), { headers });
}

describe("proxy", () => {
  it("passes canonical paths through", () => {
    const response = proxy(requestFor("/docs"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("passes the root through", () => {
    const response = proxy(requestFor("/"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("redirects a trailing slash permanently with the shared redirect cache policy", () => {
    const response = proxy(requestFor("/docs/"));

    expect(response.status).toBe(308);
    expect(response.headers.get("Location")).toBe("https://iw4x.io/docs");
    expect(response.headers.get("Cache-Control")).toBe(cacheControlFor("redirect"));
  });

  it("keeps the query string", () => {
    const response = proxy(requestFor("/docs/?ref=home"));

    expect(response.headers.get("Location")).toBe("https://iw4x.io/docs?ref=home");
  });

  it("stays on the requested origin", () => {
    const response = proxy(requestFor("/docs/", { "x-forwarded-host": "evil.example" }));

    expect(new URL(response.headers.get("Location") ?? "").origin).toBe("https://iw4x.io");
  });

  it("never builds a protocol-relative location from repeated slashes", () => {
    const response = proxy(requestFor("/%2F%2Fevil.example/"));

    expect(new URL(response.headers.get("Location") ?? "").origin).toBe("https://iw4x.io");
  });

  it("only runs outside Next.js build output", () => {
    expect(config.matcher).toEqual(["/((?!_next/).*/)"]);
  });
});
