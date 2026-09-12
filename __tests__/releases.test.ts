import { describe, expect, it } from "vitest";

import { LOCALES, LOCALE_DETAILS } from "@/lib/i18n/config";
import {
  RELEASES,
  RELEASE_ASSET,
  RELEASE_REPOSITORY,
  formatReleaseDate,
  releaseDownloadUrl,
  releaseNotesUrl,
} from "@/lib/releases";

describe("the release table", () => {
  it("lists at least one build", () => {
    expect(RELEASES.length).toBeGreaterThan(0);
  });

  it("has no duplicate tags", () => {
    expect(new Set(RELEASES.map(({ tag }) => tag)).size).toBe(RELEASES.length);
  });

  it("dates every build as a calendar day, so formatting cannot drift by timezone", () => {
    for (const { publishedOn } of RELEASES) {
      expect(publishedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(`${publishedOn}T00:00:00Z`))).toBe(false);
    }
  });

  it("runs newest first", () => {
    const dates = RELEASES.map(({ publishedOn }) => publishedOn);

    expect(dates).toEqual([...dates].sort().reverse());
  });

});

describe("release URLs", () => {
  it("points notes at the tag page", () => {
    expect(releaseNotesUrl("r5123")).toBe(`${RELEASE_REPOSITORY}/releases/tag/r5123`);
  });

  it("points downloads at that build's asset", () => {
    expect(releaseDownloadUrl("r5123")).toBe(`${RELEASE_REPOSITORY}/releases/download/r5123/${RELEASE_ASSET}`);
  });

  it("builds a distinct pair of URLs for every release", () => {
    const urls = RELEASES.flatMap(({ tag }) => [releaseNotesUrl(tag), releaseDownloadUrl(tag)]);

    expect(new Set(urls).size).toBe(urls.length);
  });

  it.each(RELEASES)("keeps $tag on the project's own repository", ({ tag }) => {
    for (const url of [releaseNotesUrl(tag), releaseDownloadUrl(tag)]) {
      expect(new URL(url).origin).toBe("https://github.com");
      expect(url.startsWith(`${RELEASE_REPOSITORY}/`)).toBe(true);
    }
  });
});

describe("formatReleaseDate", () => {
  it("writes the date out in full for English readers", () => {
    expect(formatReleaseDate("2026-09-10", "en")).toBe("September 10, 2026");
  });

  it("reads the date in UTC, so the day never shifts with the server's timezone", () => {
    expect(formatReleaseDate("2026-09-06", "en")).toBe("September 6, 2026");
    expect(formatReleaseDate("2026-01-01", "en")).toBe("January 1, 2026");
  });

  it("follows the reader's locale", () => {
    expect(formatReleaseDate("2026-09-10", "de")).toBe("10. September 2026");
  });

  it.each(LOCALES)("produces a non-empty date in %s", (locale) => {
    expect(formatReleaseDate(RELEASES[0].publishedOn, LOCALE_DETAILS[locale].tag)).not.toBe("");
  });
});
