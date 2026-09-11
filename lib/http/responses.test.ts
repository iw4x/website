import { describe, expect, it } from "vitest";

import { SITE } from "../site-config";
import { cacheControlFor } from "./cache-control";
import { escapeHtml, notFoundResponse, redirectResponse } from "./responses";

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
    expect(notFoundResponse().status).toBe(404);
  });

  it("carries the shared notFound cache policy", () => {
    expect(notFoundResponse().headers.get("Cache-Control")).toBe(cacheControlFor("notFound"));
  });

  it("is HTML and stays out of search indexes", async () => {
    const response = notFoundResponse();
    const html = await response.text();

    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(html).toContain('<meta name="robots" content="noindex">');
  });

  it("names the site and links home", async () => {
    const html = await notFoundResponse().text();

    expect(html).toContain('<html lang="en">');
    expect(html).toContain(`<title>Not found | ${SITE.name}</title>`);
    expect(html).toContain("<h1>Not found</h1>");
    expect(html).toContain('<a href="/">');
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
