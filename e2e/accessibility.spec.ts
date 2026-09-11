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
