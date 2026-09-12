import { describe, expect, it } from "vitest";

import { contrastRatio, parseColor, relativeLuminance } from "@/lib/color/contrast";

describe("parseColor", () => {
  it.each([
    ["#fff", [255, 255, 255]],
    ["#000000", [0, 0, 0]],
    ["#a3e635", [163, 230, 53]],
    ["#A3E635", [163, 230, 53]],
    ["rgb(18, 18, 18)", [18, 18, 18]],
    ["rgba(18, 18, 18, 0.5)", [18, 18, 18]],
    ["  rgb(1 2 3)  ", [1, 2, 3]],
  ])("reads %s", (input, expected) => {
    expect([...parseColor(input)]).toEqual(expected);
  });

  it.each(["", "red", "#12", "hsl(0 0% 0%)", "rgb(a, b, c)"])("rejects %s", (input) => {
    expect(() => parseColor(input)).toThrow(TypeError);
  });
});

describe("relativeLuminance", () => {
  it("anchors black at 0 and white at 1", () => {
    expect(relativeLuminance("#000")).toBeCloseTo(0, 12);
    expect(relativeLuminance("#fff")).toBeCloseTo(1, 12);
  });

  it("uses the linear segment below the 0.04045 threshold", () => {
    expect(relativeLuminance([10, 10, 10])).toBeCloseTo(10 / 255 / 12.92, 12);
  });

  it("accepts an already-parsed triple", () => {
    expect(relativeLuminance([163, 230, 53])).toBeCloseTo(relativeLuminance("#a3e635"), 12);
  });
});

describe("contrastRatio", () => {
  it("reaches the 21:1 maximum for black on white", () => {
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 10);
  });

  it("bottoms out at 1:1 for a colour against itself", () => {
    expect(contrastRatio("#a3e635", "#a3e635")).toBeCloseTo(1, 12);
  });

  it("does not depend on the order of its arguments", () => {
    expect(contrastRatio("#121212", "#a3e635")).toBeCloseTo(contrastRatio("#a3e635", "#121212"), 12);
  });
});
