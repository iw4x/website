export type Release = {
  readonly tag: string;
  readonly publishedOn: string;
};

export const RELEASE_REPOSITORY = "https://github.com/iw4x/iw4x-client";

export const RELEASE_ASSET = "iw4x.dll";

export const RELEASES = [
  { tag: "r5123", publishedOn: "2026-09-10" },
  { tag: "r5121", publishedOn: "2026-09-06" },
  { tag: "r5120", publishedOn: "2026-09-06" },
  { tag: "r5115", publishedOn: "2026-09-05" },
  { tag: "r5112", publishedOn: "2026-09-05" },
] as const satisfies readonly Release[];

export type ReleaseTag = (typeof RELEASES)[number]["tag"];

export function releaseNotesUrl(tag: string): string {
  return `${RELEASE_REPOSITORY}/releases/tag/${tag}`;
}

export function releaseDownloadUrl(tag: string): string {
  return `${RELEASE_REPOSITORY}/releases/download/${tag}/${RELEASE_ASSET}`;
}

export function formatReleaseDate(publishedOn: string, localeTag: string): string {
  return new Intl.DateTimeFormat(localeTag, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${publishedOn}T00:00:00Z`),
  );
}
