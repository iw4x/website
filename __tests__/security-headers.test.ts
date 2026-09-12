import { describe, expect, it } from "vitest";

import { contentSecurityPolicy, permissionsPolicy, securityHeaders } from "@/lib/http/security-headers";

function directives(policy: string): Map<string, string[]> {
  return new Map(
    policy.split(";").map((part) => {
      const [name, ...sources] = part.trim().split(/\s+/);

      return [name, sources];
    }),
  );
}

describe("contentSecurityPolicy", () => {
  const policy = directives(contentSecurityPolicy());

  it.each([
    ["default-src", "'self'"],
    ["base-uri", "'self'"],
    ["form-action", "'self'"],
    ["connect-src", "'self'"],
  ])("locks %s down to the site's own origin", (directive, source) => {
    expect(policy.get(directive)).toEqual([source]);
  });

  it("forbids plugins and framing outright", () => {
    expect(policy.get("object-src")).toEqual(["'none'"]);
    expect(policy.get("frame-ancestors")).toEqual(["'none'"]);
  });

  it("allows no third-party origin anywhere", () => {
    expect(contentSecurityPolicy()).not.toMatch(/https?:\/\//);
  });

  it("upgrades insecure requests", () => {
    expect(policy.has("upgrade-insecure-requests")).toBe(true);
  });

  it("keeps eval out of production, where React refresh does not run", () => {
    expect(contentSecurityPolicy()).not.toContain("'unsafe-eval'");
    expect(directives(contentSecurityPolicy({ development: true })).get("script-src")).toContain("'unsafe-eval'");
  });

  it("widens only script-src for development, and only by unsafe-eval", () => {
    const production = directives(contentSecurityPolicy());
    const development = directives(contentSecurityPolicy({ development: true }));

    for (const [directive, sources] of development) {
      const expected = production.get(directive) ?? [];

      expect(sources, directive).toEqual(directive === "script-src" ? [...expected, "'unsafe-eval'"] : expected);
    }
  });

  it("keeps every production directive in development, upgrade-insecure-requests included", () => {
    const development = directives(contentSecurityPolicy({ development: true }));

    for (const [directive] of directives(contentSecurityPolicy())) {
      expect(development.has(directive), directive).toBe(true);
    }
  });
});

describe("permissionsPolicy", () => {
  it("denies every listed feature to every origin", () => {
    for (const feature of permissionsPolicy().split(", ")) {
      expect(feature).toMatch(/^[a-z-]+=\(\)$/);
    }
  });

  it("covers the features most likely to be abused", () => {
    for (const feature of ["camera", "microphone", "geolocation", "payment", "usb"]) {
      expect(permissionsPolicy()).toContain(`${feature}=()`);
    }
  });
});

describe("securityHeaders", () => {
  const headers = new Map(securityHeaders().map(({ key, value }) => [key, value]));

  it.each([
    ["Content-Security-Policy"],
    ["Strict-Transport-Security"],
    ["X-Content-Type-Options"],
    ["X-Frame-Options"],
    ["Referrer-Policy"],
    ["Cross-Origin-Opener-Policy"],
    ["Cross-Origin-Resource-Policy"],
    ["Permissions-Policy"],
  ])("sends %s", (key) => {
    expect(headers.get(key)?.length ?? 0).toBeGreaterThan(0);
  });

  it("declares no duplicate header", () => {
    const keys = securityHeaders().map(({ key }) => key);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("asks for at least a year of HSTS, so the domain stays preloadable", () => {
    const maxAge = Number(/max-age=(\d+)/.exec(headers.get("Strict-Transport-Security") ?? "")?.[1]);

    expect(maxAge).toBeGreaterThanOrEqual(31_536_000);
    expect(headers.get("Strict-Transport-Security")).toContain("includeSubDomains");
  });

  it("refuses framing through both the modern and the legacy header", () => {
    expect(headers.get("X-Frame-Options")).toBe("DENY");
    expect(headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
  });

  it("leaks no path or query to other origins", () => {
    expect(headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });
});
