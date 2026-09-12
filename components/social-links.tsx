import { DiscordIcon, GitHubIcon } from "@/components/brand/icons";
import { LINKS } from "@/lib/site-config";

const CHANNELS = [
  { name: "discord", href: LINKS.discord, Icon: DiscordIcon },
  { name: "github", href: LINKS.github, Icon: GitHubIcon },
] as const;

export type SocialLabels = {
  readonly label: string;
  readonly discord: string;
  readonly github: string;
};

export function SocialLinks({ labels }: { readonly labels: SocialLabels }) {
  return (
    <nav aria-label={labels.label} className="mt-10 w-full border-t border-rule pt-8">
      <ul className="flex flex-wrap items-center justify-center gap-6">
        {CHANNELS.map(({ name, href, Icon }) => (
          <li key={name}>
            <a
              href={href}
              aria-label={labels[name]}
              className="inline-flex size-11 items-center justify-center text-muted transition-[color] duration-150 ease-out hover:text-foreground"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
