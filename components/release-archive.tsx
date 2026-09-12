import { ChevronDownIcon } from "@/components/brand/icons";
import { ActionLink } from "@/components/ui/action-link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/format";
import { RELEASES, formatReleaseDate, releaseDownloadUrl, releaseNotesUrl } from "@/lib/releases";
import { LINKS } from "@/lib/site-config";

const HEADING_ID = "release-archive-heading";

export type ReleaseArchiveProps = {
  readonly strings: Dictionary["releases"];
  readonly localeTag: string;
};

export function ReleaseArchive({ strings, localeTag }: ReleaseArchiveProps) {
  return (
    <details className="group mt-16 w-full max-w-5xl text-center">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-base tracking-body text-muted transition-[color] duration-150 ease-out hover:text-foreground [&::-webkit-details-marker]:hidden">
        {strings.toggle}
        <ChevronDownIcon className="transition-transform duration-150 ease-out group-open:rotate-180" />
      </summary>

      <section aria-labelledby={HEADING_ID} className="pt-12 text-start">
        <h2 id={HEADING_ID} className="text-heading font-bold tracking-heading text-foreground">
          {strings.heading}
        </h2>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="text-base tracking-body text-muted">{strings.subtitle}</p>
          <a
            href={LINKS.releases}
            className="inline-flex min-h-11 items-center text-base font-semibold tracking-body text-foreground underline underline-offset-4 transition-[color] duration-150 ease-out hover:text-accent-text"
          >
            {strings.all}
          </a>
        </div>

        <ul className="mt-6 border-t border-rule sm:grid sm:auto-rows-fr">
          {RELEASES.map(({ tag, publishedOn }) => (
            <li
              key={tag}
              className="grid gap-x-8 gap-y-4 border-b border-rule py-6 sm:grid-cols-[10rem_1fr] sm:items-center"
            >
              <p className="min-w-0">
                <span className="block text-base font-semibold tracking-body text-foreground">{tag}</span>
                <time dateTime={publishedOn} className="block text-base tracking-body text-muted">
                  {formatReleaseDate(publishedOn, localeTag)}
                </time>
              </p>

              <div className="flex flex-wrap gap-3 sm:justify-end">
                <ActionLink
                  href={releaseNotesUrl(tag)}
                  variant="secondary"
                  size="sm"
                  label={fill(strings.changelogLabel, { version: tag })}
                >
                  {strings.changelog}
                </ActionLink>
                <ActionLink
                  href={releaseDownloadUrl(tag)}
                  variant="primary"
                  size="sm"
                  label={fill(strings.downloadLabel, { version: tag })}
                >
                  {strings.download}
                </ActionLink>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </details>
  );
}
