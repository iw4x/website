import { expect, test, type Locator, type Page } from "@playwright/test";

import { AAA_LARGE_TEXT, AAA_NORMAL_TEXT, NON_TEXT, contrastRatio } from "../lib/color/contrast";
import { LOCALES } from "../lib/i18n/config";
import { ALL_DICTIONARIES } from "../lib/i18n/dictionaries";
import { RELEASES, releaseDownloadUrl, releaseNotesUrl } from "../lib/releases";
import { LINKS } from "../lib/site-config";

const HOME = `/${LOCALES[0]}`;
const { home, social, releases } = ALL_DICTIONARIES[LOCALES[0]];

const COLOR_SCHEMES = ["light", "dark"] as const;

async function effectiveBackground(target: Locator): Promise<string> {
  return target.evaluate((element) => {
    for (let node: Element | null = element; node; node = node.parentElement) {
      const color = getComputedStyle(node).backgroundColor;

      if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
        return color;
      }
    }

    return getComputedStyle(document.documentElement).backgroundColor;
  });
}

test.describe("the home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME);
  });

  test("offers exactly two calls to action, pointing at the launcher and the docs", async ({ page }) => {
    await expect(page.getByRole("link", { name: home.download })).toHaveAttribute("href", LINKS.download);
    await expect(page.getByRole("link", { name: home.docs })).toHaveAttribute("href", LINKS.docs);
  });

  test("names every icon-only community link", async ({ page }) => {
    const community = page.getByRole("navigation", { name: social.label });

    await expect(community.getByRole("link", { name: social.discord })).toHaveAttribute("href", LINKS.discord);
    await expect(community.getByRole("link", { name: social.github })).toHaveAttribute("href", LINKS.github);
    await expect(community.getByRole("link")).toHaveCount(2);
  });

  test("keeps every reader in the same tab", async ({ page }) => {
    const targets = await page.locator("main a[href]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("target")).filter((target) => target !== null),
    );

    expect(targets).toEqual([]);
  });

  test("never shouts its labels in capitals", async ({ page }) => {
    const shouted = await page.locator("main a[href], main h1").evaluateAll((elements) =>
      elements
        .filter((element) => getComputedStyle(element).textTransform === "uppercase")
        .map((element) => element.textContent ?? ""),
    );

    expect(shouted).toEqual([]);
  });
});

test.describe("the primary action's states", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME);
  });

  const download = (page: Page) => page.getByRole("link", { name: home.download, exact: true });

  const hoverable = (page: Page) => page.evaluate(() => matchMedia("(hover: hover)").matches);

  const paint = (page: Page) =>
    download(page).evaluate((element) => {
      const style = getComputedStyle(element);

      return {
        fill: style.backgroundColor,
        underline: style.textDecorationLine,
        shadow: style.boxShadow,
        transform: style.transform,
      };
    });

  async function hoverSettled(page: Page) {
    const resting = await paint(page);

    await download(page).hover();
    await expect.poll(async () => (await paint(page)).fill).not.toBe(resting.fill);

    return { resting, hovered: await paint(page) };
  }

  test("darkens its fill on hover, changing nothing else", async ({ page }) => {
    test.skip(!(await hoverable(page)), "A touch-only pointer never enters a hover state");

    const { resting, hovered } = await hoverSettled(page);

    expect(hovered.underline).toBe(resting.underline);
    expect(hovered.shadow).toBe(resting.shadow);
    expect(hovered.transform).toBe(resting.transform);
  });

  test("carries no decorative ring, underline or transform in any state", async ({ page }) => {
    const resting = await paint(page);

    expect(resting.shadow).toBe("none");
    expect(resting.underline).toBe("none");
    expect(resting.transform).toBe("none");

    if (await hoverable(page)) {
      const { hovered } = await hoverSettled(page);

      expect(hovered.shadow).toBe("none");
      expect(hovered.underline).toBe("none");
      expect(hovered.transform).toBe("none");
    }
  });

  test("keeps its label past AAA once hovered", async ({ page }) => {
    test.skip(!(await hoverable(page)), "A touch-only pointer never enters a hover state");

    const { hovered } = await hoverSettled(page);
    const color = await download(page).evaluate((element) => getComputedStyle(element).color);

    expect(contrastRatio(color, hovered.fill)).toBeGreaterThanOrEqual(AAA_NORMAL_TEXT);
  });

  test("shows a focus ring outside the button, where no hover state draws", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "WebKit does not move focus to links with Tab by default");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const { outlineWidth, outlineStyle } = await download(page).evaluate((element) => {
      const style = getComputedStyle(element);

      return { outlineWidth: parseFloat(style.outlineWidth), outlineStyle: style.outlineStyle };
    });

    expect(outlineWidth).toBeGreaterThanOrEqual(2);
    expect(outlineStyle).toBe("solid");
  });
});

test.describe("home page typography", () => {
  test("tracks the wordmark tighter than body text, as Inter's metrics ask", async ({ page }) => {
    await page.goto(HOME);

    const tracking = (target: Locator) =>
      target.evaluate((element) => {
        const style = getComputedStyle(element);

        return parseFloat(style.letterSpacing) / parseFloat(style.fontSize);
      });

    const [display, body] = await Promise.all([
      tracking(page.locator("main h1")),
      tracking(page.getByRole("link", { name: home.download, exact: true })),
    ]);

    expect(display).toBeLessThan(body);
    expect(display).toBeCloseTo(-0.0223, 3);
    expect(body).toBeCloseTo(-0.011, 3);
  });

  test("still enlarges the fluid wordmark when the reader enlarges text", async ({ page }) => {
    await page.goto(HOME);

    const fontSize = () => page.locator("main h1").evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    const before = await fontSize();

    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });

    expect(await fontSize()).toBeGreaterThan(before);
  });
});

for (const colorScheme of COLOR_SCHEMES) {
  test.describe(`home page colour in ${colorScheme} mode`, () => {
    test.use({ colorScheme });

    test.beforeEach(async ({ page }) => {
      await page.goto(HOME);
    });

    test("sets the accent letter of the wordmark against its ground at AAA", async ({ page }) => {
      const accent = page.locator("main h1 span");
      const color = await accent.evaluate((element) => getComputedStyle(element).color);

      expect(contrastRatio(color, await effectiveBackground(accent))).toBeGreaterThanOrEqual(AAA_LARGE_TEXT);
    });

    for (const label of [home.download, home.docs]) {
      test(`labels the ${label} action against its own fill at AAA`, async ({ page }) => {
        const action = page.getByRole("link", { name: label, exact: true });
        const color = await action.evaluate((element) => getComputedStyle(element).color);

        expect(contrastRatio(color, await effectiveBackground(action))).toBeGreaterThanOrEqual(AAA_NORMAL_TEXT);
      });

      test(`draws a visible boundary around the ${label} action`, async ({ page }) => {
        const action = page.getByRole("link", { name: label, exact: true });
        const { borderColor, borderWidth } = await action.evaluate((element) => {
          const style = getComputedStyle(element);

          return { borderColor: style.borderTopColor, borderWidth: parseFloat(style.borderTopWidth) };
        });

        expect(borderWidth).toBeGreaterThan(0);
        expect(contrastRatio(borderColor, await effectiveBackground(page.locator("body")))).toBeGreaterThanOrEqual(
          NON_TEXT,
        );
      });
    }

    test("contrasts the focus indicator of every action with the page", async ({ page, browserName }) => {
      test.skip(browserName === "webkit", "WebKit does not move focus to links with Tab by default");

      const background = await effectiveBackground(page.locator("body"));

      for (let stop = 0; stop < 5; stop++) {
        await page.keyboard.press("Tab");

        const outline = await page.locator(":focus").evaluate((element) => {
          const style = getComputedStyle(element);

          return { color: style.outlineColor, width: parseFloat(style.outlineWidth), style: style.outlineStyle };
        });

        expect(outline.style).toBe("solid");
        expect(outline.width).toBeGreaterThanOrEqual(2);
        expect(contrastRatio(outline.color, background)).toBeGreaterThanOrEqual(NON_TEXT);
      }
    });
  });
}

test.describe("the release archive", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME);
  });

  const archive = (page: Page) => page.locator("details");

  async function openArchive(page: Page): Promise<void> {
    await page.locator("details > summary").click();
    await expect(archive(page)).toHaveAttribute("open", "");
  }

  test("starts collapsed, keeping the page a single screen", async ({ page }) => {
    await expect(archive(page)).not.toHaveAttribute("open", "");
    await expect(page.getByRole("heading", { level: 2, name: releases.heading })).toBeHidden();
  });

  test("opens from the keyboard alone", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "WebKit does not move focus to links with Tab by default");

    const summary = page.locator("details > summary");

    for (let stop = 0; stop < 8 && !(await summary.evaluate((element) => element === document.activeElement)); stop++) {
      await page.keyboard.press("Tab");
    }

    await expect(summary).toBeFocused();

    await page.keyboard.press("Enter");

    await expect(archive(page)).toHaveAttribute("open", "");
    await expect(page.getByRole("heading", { level: 2, name: releases.heading })).toBeVisible();
  });

  test("lists every build with a notes link and a download", async ({ page }) => {
    await openArchive(page);

    for (const { tag } of RELEASES) {
      const notes = page.getByRole("link", { name: `${releases.changelog} for ${tag}` });
      const download = page.getByRole("link", { name: `${releases.download} ${tag}` });

      await expect(notes).toHaveAttribute("href", releaseNotesUrl(tag));
      await expect(download).toHaveAttribute("href", releaseDownloadUrl(tag));
    }

    await expect(page.getByRole("link", { name: releases.all })).toHaveAttribute("href", LINKS.releases);
  });

  test("gives every link on the open page a distinct accessible name", async ({ page }) => {
    await openArchive(page);

    const names = await page.locator("main a[href]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("aria-label") ?? (link.textContent ?? "").trim()),
    );

    expect(new Set(names).size).toBe(names.length);
  });

});

test.describe("the release archive without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("still opens, because the disclosure is a native one", async ({ page }) => {
    await page.goto(HOME);

    const heading = page.getByRole("heading", { level: 2, name: releases.heading });

    await expect(heading).toBeHidden();

    await page.locator("details > summary").click();

    await expect(page.locator("details")).toHaveAttribute("open", "");
    await expect(heading).toBeVisible();
  });

  test("lists every build once opened", async ({ page }) => {
    await page.goto(HOME);
    await page.locator("details > summary").click();

    await expect(page.locator("details li")).toHaveCount(RELEASES.length);
  });
});

test.describe("the release archive chevron", () => {
  const angle = (page: Page) =>
    page.locator("details > summary svg").evaluate((element) => {
      const rotate = getComputedStyle(element).rotate;

      return rotate === "none" ? 0 : parseFloat(rotate);
    });

  test("turns to point at the panel it controls", async ({ page }) => {
    await page.goto(HOME);

    expect(await angle(page)).toBe(0);

    await page.locator("details > summary").click();
    await expect(page.locator("details")).toHaveAttribute("open", "");
    await expect.poll(() => angle(page)).toBe(180);
  });

  test("turns back the moment the reader collapses the panel", async ({ page }) => {
    await page.goto(HOME);
    await page.locator("details > summary").click();
    await expect.poll(() => angle(page)).toBe(180);

    await page.locator("details > summary").click();
    await expect(page.locator("details")).not.toHaveAttribute("open", "");
    await expect.poll(() => angle(page)).toBe(0);
  });
});

test.describe("the release archive close", () => {
  test("collapses again on a second click", async ({ page }) => {
    await page.goto(HOME);

    const details = page.locator("details");
    const heading = page.getByRole("heading", { level: 2, name: releases.heading });

    await page.locator("details > summary").click();
    await expect(details).toHaveAttribute("open", "");
    await expect(heading).toBeVisible();

    await page.locator("details > summary").click();
    await expect(details).not.toHaveAttribute("open", "");
    await expect(heading).toBeHidden();
  });

  test("leaves no inline styles on the panel, open or closed", async ({ page }) => {
    await page.goto(HOME);
    await page.locator("details > summary").click();
    await expect(page.locator("details")).toHaveAttribute("open", "");

    const inline = await page.locator("details section, details li").evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("style")).filter((style) => style !== null && style !== ""),
    );

    expect(inline).toEqual([]);
  });
});

test.describe("the release archive layout", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  async function openRows(page: Page) {
    await page.goto(HOME);
    await page.locator("details > summary").click();
    await expect(page.locator("details")).toHaveAttribute("open", "");

    return page.locator("details li");
  }

  test("gives every release the same row height", async ({ page }) => {
    const rows = await openRows(page);

    const heights = await rows.evaluateAll((elements) =>
      elements.map((element) => Math.round(element.getBoundingClientRect().height)),
    );

    expect(heights).toHaveLength(RELEASES.length);
    expect(new Set(heights).size).toBe(1);
  });

  test("keeps both actions on one line, clear of the version", async ({ page }) => {
    const rows = await openRows(page);

    const measurements = await rows.evaluateAll((elements) =>
      elements.map((element) => {
        const version = element.children[0].getBoundingClientRect();
        const actions = [...element.children[1].children].map((action) => action.getBoundingClientRect());

        return {
          onOneLine: Math.abs(actions[0].top - actions[1].top) < 2,
          gap: Math.round(Math.min(...actions.map((action) => action.left)) - version.right),
        };
      }),
    );

    for (const { onOneLine, gap } of measurements) {
      expect(onOneLine).toBe(true);
      expect(gap).toBeGreaterThanOrEqual(24);
    }
  });

  test("ends every row with the actions, flush to the right edge", async ({ page }) => {
    const rows = await openRows(page);

    const offsets = await rows.evaluateAll((elements) =>
      elements.map((element) => {
        const actions = [...element.children[1].children].map((action) => action.getBoundingClientRect());

        return Math.round(element.getBoundingClientRect().right - Math.max(...actions.map((a) => a.right)));
      }),
    );

    for (const offset of offsets) {
      expect(offset).toBeLessThanOrEqual(1);
    }
  });
});
