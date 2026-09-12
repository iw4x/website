import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  TRACKING_COEFFICIENTS,
  TRACKING_TOKENS,
  interTracking,
  interTrackingEm,
} from "@/lib/typography/inter-metrics";

const BASE_CSS = readFileSync(join(process.cwd(), "public/styles/base.css"), "utf8");

function declaredValue(token: string): string | undefined {
  return new RegExp(`${token}:\\s*([^;]+);`).exec(BASE_CSS)?.[1].trim();
}

describe("interTracking", () => {
  it("reproduces Inter's published curve", () => {
    const { a, b, c } = TRACKING_COEFFICIENTS;

    for (const size of [14, 16, 24, 48, 96]) {
      expect(interTracking(size)).toBeCloseTo(a + b * Math.exp(c * size), 12);
    }
  });

  it("tightens as the optical size grows", () => {
    const sizes = [12, 16, 24, 32, 48, 64, 96];
    const tracking = sizes.map(interTracking);

    expect(tracking).toEqual([...tracking].sort((x, y) => y - x));
  });

  it("settles onto its asymptote by display sizes", () => {
    expect(interTracking(1000)).toBeCloseTo(TRACKING_COEFFICIENTS.a, 12);
    expect(Math.abs(interTracking(40) - interTracking(104))).toBeLessThan(0.0002);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])("rejects %s as a font size", (size) => {
    expect(() => interTracking(size)).toThrow(RangeError);
  });
});

describe("interTrackingEm", () => {
  it("formats a rounded em length", () => {
    expect(interTrackingEm(16)).toBe("-0.011em");
    expect(interTrackingEm(64)).toBe("-0.0223em");
  });
});

describe("the tracking tokens in base.css", () => {
  it.each(Object.entries(TRACKING_TOKENS))("declares %s at the value the curve gives", (token, size) => {
    expect(declaredValue(token)).toBe(interTrackingEm(size));
  });
});
