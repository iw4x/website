import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReleaseArchive } from "@/components/release-archive";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getDictionaryFor } from "@/lib/i18n/dictionaries";
import { RELEASES, formatReleaseDate, releaseDownloadUrl, releaseNotesUrl } from "@/lib/releases";
import { LINKS } from "@/lib/site-config";

const strings = getDictionaryFor(DEFAULT_LOCALE).releases;

function renderArchive() {
  const { container } = render(<ReleaseArchive strings={strings} localeTag="en" />);

  return container;
}

describe("ReleaseArchive", () => {
  it("stays collapsed until the reader opens it", () => {
    expect(renderArchive().querySelector("details")).not.toHaveAttribute("open");
  });

  it("uses a native disclosure, so it works before any JavaScript runs", () => {
    const container = renderArchive();

    expect(container.querySelector("details > summary")).toHaveTextContent(strings.toggle);
  });

  it("titles the section below the level-one heading of the page", () => {
    renderArchive();

    const heading = screen.getByRole("heading", { level: 2, name: strings.heading });

    expect(screen.getByRole("region", { name: strings.heading })).toContainElement(heading);
  });

  it("links out to the full release history", () => {
    renderArchive();

    expect(screen.getByRole("link", { name: strings.all })).toHaveAttribute("href", LINKS.releases);
  });

  it("renders one row per release, newest first", () => {
    const container = renderArchive();

    const tags = [...container.querySelectorAll("li")].map((row) => row.querySelector("span")?.textContent);

    expect(tags).toEqual(RELEASES.map(({ tag }) => tag));
  });

  it("carries no heading below the section title", () => {
    renderArchive();

    expect(screen.queryAllByRole("heading", { level: 3 })).toEqual([]);
  });

  it.each(RELEASES)("shows the tag and a machine-readable date for $tag", ({ tag, publishedOn }) => {
    const container = renderArchive();
    const row = within(container.querySelectorAll("li")[RELEASES.findIndex((release) => release.tag === tag)]);

    expect(row.getByText(tag)).toBeInTheDocument();

    const date = row.getByText(formatReleaseDate(publishedOn, "en"));

    expect(date.tagName).toBe("TIME");
    expect(date).toHaveAttribute("datetime", publishedOn);
  });

  it.each(RELEASES)("points both actions for $tag at that build", ({ tag }) => {
    renderArchive();

    expect(screen.getByRole("link", { name: `Changelog for ${tag}` })).toHaveAttribute("href", releaseNotesUrl(tag));
    expect(screen.getByRole("link", { name: `Download ${tag}` })).toHaveAttribute("href", releaseDownloadUrl(tag));
  });

  it("keeps the visible label inside each accessible name, as SC 2.5.3 requires", () => {
    renderArchive();

    for (const link of screen.getAllByRole("link")) {
      const name = link.getAttribute("aria-label");

      if (name) {
        expect(name).toContain(link.textContent);
      }
    }
  });

  it("gives every action a distinct accessible name, so identical labels cannot be confused", () => {
    renderArchive();

    const names = screen.getAllByRole("link").map((link) => link.getAttribute("aria-label") ?? link.textContent);

    expect(new Set(names).size).toBe(names.length);
  });
});
