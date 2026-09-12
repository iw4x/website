import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { contrastRatio } from "../lib/color/contrast";
import { LOCALES } from "../lib/i18n/config";
import { ALL_DICTIONARIES } from "../lib/i18n/dictionaries";

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

type Target = {
  readonly name: string;
  readonly path: string;
  readonly open?: boolean;
};

const PAGES: readonly Target[] = LOCALES.flatMap((locale) => [
  { name: `/${locale}`, path: `/${locale}` },
  { name: `/${locale} with the release archive open`, path: `/${locale}`, open: true },
  { name: `/${locale} not found`, path: `/${locale}/this-page-does-not-exist` },
]);

async function visit(page: Page, { path, open }: Target): Promise<void> {
  await page.goto(path);

  if (open) {
    await page.locator("details > summary").click();
    await expect(page.locator("details")).toHaveAttribute("open", "");
  }
}

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

    for (const target of PAGES) {
      test(`${target.name} has no WCAG AAA violations`, async ({ page }) => {
        await visit(page, target);

        expect(await axeViolations(page)).toEqual([]);
      });
    }
  });
}

const PARAGRAPHS = `
  <p id="first">${"Modern Warfare 2 community client. ".repeat(12)}</p>
  <p id="second">${"Play with friends on dedicated servers. ".repeat(12)}</p>
`;

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

  test("spaces lines on the not-found page too", async ({ page }) => {
    await page.goto(`/${LOCALES[0]}/this-page-does-not-exist`);

    const { lineHeight, fontSize } = await page.locator("main p").evaluate((element) => {
      const style = getComputedStyle(element);

      return { lineHeight: parseFloat(style.lineHeight), fontSize: parseFloat(style.fontSize) };
    });

    expect(lineHeight).toBeGreaterThanOrEqual(fontSize * 1.5);
  });

  test("never justifies text", async ({ page }) => {
    const alignments = await page.locator("main, main *").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).textAlign),
    );

    expect(alignments).not.toContain("justify");
  });
});

test.describe("focus appearance", () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName === "webkit", "WebKit does not move focus to links with Tab by default");
  });

  for (const target of PAGES) {
    test(`${target.name} draws a solid indicator at least two pixels thick with 3:1 contrast`, async ({ page }) => {
      await visit(page, target);
      await page.keyboard.press("Tab");

      const focused = page.locator(":focus");

      await expect(focused).toHaveCount(1);

      const { outlineStyle, outlineWidth, outlineColor, background } = await focused.evaluate((element) => {
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
  }
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

const MINIMUM_TARGET = 44;

test.describe("keyboard navigation", () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName === "webkit", "WebKit does not move focus to links with Tab by default");
  });

  for (const locale of LOCALES) {
    test(`/${locale} offers a skip link as the first stop`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.keyboard.press("Tab");

      const skipLink = page.getByRole("link", { name: ALL_DICTIONARIES[locale].navigation.skipToContent });

      await expect(skipLink).toBeFocused();
      await expect(skipLink).toBeInViewport();

      const box = await skipLink.boundingBox();

      expect(box?.width ?? 0).toBeGreaterThanOrEqual(MINIMUM_TARGET);
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(MINIMUM_TARGET);

      const unobscured = await skipLink.evaluate((element) => {
        const rect = element.getBoundingClientRect();

        return element.contains(document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2));
      });

      expect(unobscured).toBe(true);
    });

    test(`/${locale} skip link moves focus to the main content`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");

      await expect(page.getByRole("main")).toBeFocused();
    });
  }
});

test.describe("target size", () => {
  for (const target of PAGES) {
    test(`${target.name} gives every standalone target at least 44 by 44 pixels`, async ({ page }) => {
      await visit(page, target);

      const undersized = await page
        .locator("a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex='-1'])")
        .evaluateAll((elements, minimum) =>
          elements
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              const visuallyHidden = rect.width <= 1 && rect.height <= 1;
              const inline =
                getComputedStyle(element).display === "inline" &&
                (element.parentElement?.textContent?.trim() ?? "") !== (element.textContent?.trim() ?? "");

              return !visuallyHidden && !inline && (rect.width < minimum || rect.height < minimum);
            })
            .map((element) => element.outerHTML.slice(0, 120)),
        MINIMUM_TARGET);

      expect(undersized).toEqual([]);
    });
  }
});

const TEXT_SPACING = `
  * {
    line-height: 1.5 !important;
    letter-spacing: 0.12em !important;
    word-spacing: 0.16em !important;
  }

  p {
    margin-block-end: 2em !important;
  }
`;

async function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

async function clippedElements(page: Page): Promise<string[]> {
  return page.locator("body *").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const style = getComputedStyle(element);
        const clips = ["hidden", "clip"].includes(style.overflowX) || ["hidden", "clip"].includes(style.overflowY);
        const rect = element.getBoundingClientRect();
        const visuallyHidden = rect.width <= 1 && rect.height <= 1;

        return (
          clips &&
          !visuallyHidden &&
          (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight)
        );
      })
      .map((element) => element.outerHTML.slice(0, 120)),
  );
}

test.describe("reflow", () => {
  test.use({ viewport: { width: 320, height: 256 } });

  for (const target of PAGES) {
    test(`${target.name} needs no horizontal scrolling at 320 CSS pixels`, async ({ page }) => {
      await visit(page, target);

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("text spacing", () => {
  for (const target of PAGES) {
    test(`${target.name} keeps all content when users increase text spacing`, async ({ page }) => {
      await visit(page, target);
      await page.addStyleTag({ content: TEXT_SPACING });

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      expect(await clippedElements(page)).toEqual([]);
    });
  }
});

test.describe("resize text", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const target of PAGES) {
    test(`${target.name} reads without horizontal scrolling at 200% text size`, async ({ page }) => {
      await visit(page, target);
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      expect(await clippedElements(page)).toEqual([]);
    });
  }
});
