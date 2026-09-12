import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AAA_NORMAL_TEXT, NON_TEXT, contrastRatio } from "@/lib/color/contrast";

const BASE_CSS = readFileSync(join(process.cwd(), "public/styles/base.css"), "utf8");

const SCHEMES = ["light", "dark"] as const;

type Scheme = (typeof SCHEMES)[number];
type Palette = Readonly<Record<string, string>>;

function declarations(block: string): Palette {
  return Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{3,8})\s*(?:;|\/\*)/gi)].map(
    ([, token, value]) => [token, value],
  ));
}

function paletteFor(scheme: Scheme): Palette {
  const root = /^:root \{([\s\S]*?)^\}/m.exec(BASE_CSS)?.[1] ?? "";
  const dark = /@media \(prefers-color-scheme: dark\) \{([\s\S]*?)^\}/m.exec(BASE_CSS)?.[1] ?? "";

  return scheme === "light" ? declarations(root) : { ...declarations(root), ...declarations(dark) };
}

const PALETTES = Object.fromEntries(SCHEMES.map((scheme) => [scheme, paletteFor(scheme)])) as Record<Scheme, Palette>;

const TEXT_PAIRS = [
  ["--foreground", "--background"],
  ["--muted-foreground", "--background"],
  ["--foreground", "--surface"],
  ["--accent-text", "--background"],
  ["--wordmark-accent", "--background"],
  ["--accent-ink", "--accent"],
  ["--accent-ink", "--accent-hover"],
  ["--accent-ink", "--accent-active"],
] as const;

const NON_TEXT_PAIRS = [
  ["--border", "--background"],
  ["--accent-edge", "--background"],
  ["--focus-ring", "--background"],
] as const;

describe.each(SCHEMES)("the %s palette", (scheme) => {
  const palette = PALETTES[scheme];

  it("declares every token the page reads", () => {
    const tokens = new Set([...TEXT_PAIRS, ...NON_TEXT_PAIRS].flat());

    for (const token of tokens) {
      expect(palette, `${token} is missing`).toHaveProperty(token);
    }
  });

  it.each(TEXT_PAIRS)("sets %s on %s past the AAA text threshold", (ink, ground) => {
    expect(contrastRatio(palette[ink], palette[ground])).toBeGreaterThanOrEqual(AAA_NORMAL_TEXT);
  });

  it.each(NON_TEXT_PAIRS)("separates %s from %s past the non-text threshold", (mark, ground) => {
    expect(contrastRatio(palette[mark], palette[ground])).toBeGreaterThanOrEqual(NON_TEXT);
  });

  it("keeps the accent readable through its whole interaction range", () => {
    const states = ["--accent", "--accent-hover", "--accent-active"] as const;
    const ratios = states.map((state) => contrastRatio(palette["--accent-ink"], palette[state]));

    expect(Math.min(...ratios)).toBeGreaterThanOrEqual(AAA_NORMAL_TEXT);
    expect(ratios).toEqual([...ratios].sort((a, b) => b - a));
  });
});

describe("the two palettes", () => {
  it("differ, so the dark scheme is really a scheme and not a copy", () => {
    expect(PALETTES.dark["--background"]).not.toBe(PALETTES.light["--background"]);
    expect(PALETTES.dark["--foreground"]).not.toBe(PALETTES.light["--foreground"]);
  });

  it("keeps one accent fill across both, so the brand does not shift", () => {
    for (const token of ["--accent", "--accent-hover", "--accent-active", "--accent-ink"] as const) {
      expect(PALETTES.dark[token]).toBe(PALETTES.light[token]);
    }
  });
});
