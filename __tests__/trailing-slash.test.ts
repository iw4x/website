import { describe, expect, it } from "vitest";

import { canonicalPathname } from "@/lib/http/trailing-slash";

describe("canonicalPathname", () => {
  it.each(["/", "/docs", "/a/b/c", "/favicon.ico"])("leaves %s alone", (pathname) => {
    expect(canonicalPathname(pathname)).toBeUndefined();
  });

  it.each([
    ["/docs/", "/docs"],
    ["/docs///", "/docs"],
    ["/a/b/c/", "/a/b/c"],
  ])("strips the trailing slash from %s", (pathname, expected) => {
    expect(canonicalPathname(pathname)).toBe(expected);
  });

  it.each([
    ["//evil.example/", "/evil.example"],
    ["///evil.example/path/", "/evil.example/path"],
  ])("never turns %s into a protocol-relative redirect", (pathname, expected) => {
    const canonical = canonicalPathname(pathname);

    expect(canonical).toBe(expected);
    expect(canonical?.startsWith("//")).toBe(false);
  });

  it("collapses a path made only of slashes to the root", () => {
    expect(canonicalPathname("///")).toBe("/");
  });
});
