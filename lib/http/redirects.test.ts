import { describe, expect, it } from "vitest";

import { REDIRECTS, findRedirect, normalizePathname } from "./redirects";

describe("normalizePathname", () => {
  it("strips trailing slashes", () => {
    expect(normalizePathname("/docs/")).toBe("/docs");
    expect(normalizePathname("/docs///")).toBe("/docs");
  });

  it("lowercases the path", () => {
    expect(normalizePathname("/DOCS")).toBe("/docs");
  });

  it("preserves the root path", () => {
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("///")).toBe("/");
  });
});

describe("findRedirect", () => {
  it("matches a known source", () => {
    expect(findRedirect("/docs")).toMatchObject({ to: "https://docs.iw4x.io/" });
  });

  it("matches regardless of trailing slash or case", () => {
    expect(findRedirect("/docs/")).toBeDefined();
    expect(findRedirect("/Docs")).toBeDefined();
  });

  it("returns undefined for unknown paths", () => {
    expect(findRedirect("/not-a-redirect")).toBeUndefined();
    expect(findRedirect("/docs/getting-started")).toBeUndefined();
  });
});

describe("redirect table", () => {
  it("has no duplicate sources", () => {
    const sources = REDIRECTS.map((rule) => normalizePathname(rule.from));

    expect(new Set(sources).size).toBe(sources.length);
  });

  it("never redirects a path to itself", () => {
    for (const rule of REDIRECTS) {
      expect(normalizePathname(rule.from)).not.toBe(normalizePathname(rule.to));
    }
  });

  it("only declares absolute source paths", () => {
    for (const rule of REDIRECTS) {
      expect(rule.from.startsWith("/")).toBe(true);
      expect(rule.from.startsWith("//")).toBe(false);
    }
  });
});
