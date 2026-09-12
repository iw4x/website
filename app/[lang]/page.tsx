import { notFound } from "next/navigation";

import { Wordmark } from "@/components/brand/wordmark";
import { ReleaseArchive } from "@/components/release-archive";
import { SocialLinks } from "@/components/social-links";
import { ActionLink } from "@/components/ui/action-link";
import { isLocale, localeTag } from "@/lib/i18n/config";
import { getDictionaryFor } from "@/lib/i18n/dictionaries";
import { LINKS } from "@/lib/site-config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { home, social, releases } = getDictionaryFor(lang);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-120 flex-col items-center text-center">
        <Wordmark />

        <div className="mt-10 flex w-full flex-wrap justify-center gap-3">
          <ActionLink href={LINKS.download} variant="primary">
            {home.download}
          </ActionLink>
          <ActionLink href={LINKS.docs} variant="secondary">
            {home.docs}
          </ActionLink>
        </div>

        <SocialLinks labels={social} />
      </div>

      <ReleaseArchive strings={releases} localeTag={localeTag(lang)} />
    </div>
  );
}
