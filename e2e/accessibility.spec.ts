import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { LOCALES } from "../lib/i18n/config";

const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
  "best-practice",
  "experimental",
];

const PAGES = LOCALES.flatMap((locale) => [
  { name: `/${locale}`, path: `/${locale}` },
  { name: `/${locale} not found`, path: `/${locale}/this-page-does-not-exist` },
]);

const COLOR_SCHEMES = ["light", "dark"] as const;

async function axeViolations(page: Page): Promise<string[]> {
  const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();

  return results.violations.map(
    (violation) =>
      `${violation.id} (${violation.impact}): ${violation.help}\n    ${violation.nodes.map((node) => node.target.join(" ")).join("\n    ")}`,
  );
}

for (const colorScheme of COLOR_SCHEMES) {
  test.describe(`automated audit in ${colorScheme} mode`, () => {
    test.use({ colorScheme });

    for (const { name, path } of PAGES) {
      test(`${name} has no WCAG AAA violations`, async ({ page }) => {
        await page.goto(path);

        expect(await axeViolations(page)).toEqual([]);
      });
    }
  });
}

const PARAGRAPHS = `
  <p id="first">${"Modern Warfare 2 community client. ".repeat(12)}</p>
  <p id="second">${"Play with friends on dedicated servers. ".repeat(12)}</p>
  <p><a id="inline-link" href="#first">Read more about the client</a></p>
`;

function parseRgb(color: string): [number, number, number] {
  const [r, g, b] = (color.match(/[\d.]+/g) ?? []).map(Number);

  return [r, g, b];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const value = channel / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(parseRgb(a)), relativeLuminance(parseRgb(b))].sort((x, y) => y - x);

  return (lighter + 0.05) / (darker + 0.05);
}

function durationInSeconds(value: string): number {
  return Math.max(
    ...value.split(",").map((part) => {
      const amount = parseFloat(part);

      return part.trim().endsWith("ms") ? amount / 1000 : amount;
    }),
  );
}

async function injectParagraphs(page: Page): Promise<void> {
  await page.locator("main").evaluate((main, html) => {
    main.insertAdjacentHTML("beforeend", html);
  }, PARAGRAPHS);
}

test.describe("visual presentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${LOCALES[0]}`);
    await injectParagraphs(page);
  });

  test("spaces lines at least one and a half times the font size", async ({ page }) => {
    const { lineHeight, fontSize } = await page.locator("#first").evaluate((element) => {
      const style = getComputedStyle(element);

      return { lineHeight: parseFloat(style.lineHeight), fontSize: parseFloat(style.fontSize) };
    });

    expect(lineHeight).toBeGreaterThanOrEqual(fontSize * 1.5);
  });

  test("spaces paragraphs at least one and a half times the line spacing", async ({ page }) => {
    const first = await page.locator("#first").boundingBox();
    const second = await page.locator("#second").boundingBox();
    const lineHeight = await page.locator("#first").evaluate((element) => parseFloat(getComputedStyle(element).lineHeight));

    expect((second?.y ?? 0) - ((first?.y ?? 0) + (first?.height ?? 0))).toBeGreaterThanOrEqual(lineHeight * 1.5 - 0.5);
  });

  test("keeps lines within eighty characters", async ({ page }) => {
    const { width, eightyCharacters } = await page.locator("#first").evaluate((element) => {
      const probe = document.createElement("span");

      probe.textContent = "0".repeat(80);
      probe.style.whiteSpace = "nowrap";
      element.append(probe);

      const measured = probe.getBoundingClientRect().width;

      probe.remove();

      return { width: element.getBoundingClientRect().width, eightyCharacters: measured };
    });

    expect(width).toBeLessThanOrEqual(eightyCharacters + 1);
  });

  test("never justifies text", async ({ page }) => {
    const alignments = await page.locator("main, main *").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).textAlign),
    );

    expect(alignments).not.toContain("justify");
  });
});

test.describe("focus appearance", () => {
  test("draws a solid indicator at least two pixels thick with 3:1 contrast", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "WebKit does not move focus to links with Tab by default");

    await page.goto(`/${LOCALES[0]}`);
    await injectParagraphs(page);

    const link = page.locator("#inline-link");

    for (let press = 0; press < 10; press++) {
      await page.keyboard.press("Tab");

      if (await link.evaluate((element) => element === document.activeElement)) {
        break;
      }
    }

    await expect(link).toBeFocused();

    const { outlineStyle, outlineWidth, outlineColor, background } = await link.evaluate((element) => {
      const style = getComputedStyle(element);

      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
        outlineColor: style.outlineColor,
        background: getComputedStyle(document.body).backgroundColor,
      };
    });

    const backgroundColor = background === "rgba(0, 0, 0, 0)" ? "rgb(255, 255, 255)" : background;

    expect(outlineStyle).toBe("solid");
    expect(outlineWidth).toBeGreaterThanOrEqual(2);
    expect(contrastRatio(outlineColor, backgroundColor)).toBeGreaterThanOrEqual(3);
  });
});

test.describe("motion", () => {
  const ANIMATED = `<div id="animated" style="transition: opacity 2s; animation: spin 2s infinite"></div>`;

  for (const [reducedMotion, expectMotion] of [
    ["reduce", false],
    ["no-preference", true],
  ] as const) {
    test(`${expectMotion ? "keeps" : "removes"} motion when the user prefers ${reducedMotion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion });
      await page.goto(`/${LOCALES[0]}`);
      await page.locator("main").evaluate((main, html) => {
        main.insertAdjacentHTML("beforeend", html);
      }, ANIMATED);

      const { transition, animation } = await page.locator("#animated").evaluate((element) => {
        const style = getComputedStyle(element);

        return { transition: style.transitionDuration, animation: style.animationDuration };
      });

      if (expectMotion) {
        expect(durationInSeconds(transition)).toBe(2);
        expect(durationInSeconds(animation)).toBe(2);
      } else {
        expect(durationInSeconds(transition)).toBeLessThanOrEqual(0.001);
        expect(durationInSeconds(animation)).toBeLessThanOrEqual(0.001);
      }
    });
  }
});
