import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/[lang]/page";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n/config";
import { ALL_DICTIONARIES } from "@/lib/i18n/dictionaries";
import { LINKS, SITE } from "@/lib/site-config";

async function renderHome(lang: Locale = DEFAULT_LOCALE) {
  render(await Home({ params: Promise.resolve({ lang }), searchParams: Promise.resolve({}) }));
}

describe("Home page", () => {
  it("renders the site name as the only top-level heading", async () => {
    await renderHome();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: SITE.name })).toBeInTheDocument();
  });

  it("leaves the main landmark to the layout", async () => {
    await renderHome();

    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });

  it.each(LOCALES)("labels both calls to action in %s", async (locale) => {
    const { home } = ALL_DICTIONARIES[locale];

    await renderHome(locale);

    expect(screen.getByRole("link", { name: home.download })).toHaveAttribute("href", LINKS.download);
    expect(screen.getByRole("link", { name: home.docs })).toHaveAttribute("href", LINKS.docs);
  });

  it.each(LOCALES)("names every social destination in %s", async (locale) => {
    const { social } = ALL_DICTIONARIES[locale];

    await renderHome(locale);

    const community = within(screen.getByRole("navigation", { name: social.label }));

    expect(community.getByRole("link", { name: social.discord })).toHaveAttribute("href", LINKS.discord);
    expect(community.getByRole("link", { name: social.github })).toHaveAttribute("href", LINKS.github);
  });

  it("uses sentence case rather than shouted capitals", async () => {
    await renderHome();

    const shouted = screen
      .getAllByRole("link")
      .map((link) => link.textContent ?? "")
      .filter((text) => text.length > 1 && text === text.toUpperCase() && text !== text.toLowerCase());

    expect(shouted).toEqual([]);
  });

  it("opens every link in the same tab", async () => {
    await renderHome();

    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("target");
    }
  });

  it("refuses to render an unsupported locale", async () => {
    await expect(
      Home({ params: Promise.resolve({ lang: "xx" }), searchParams: Promise.resolve({}) }),
    ).rejects.toThrow();
  });
});
