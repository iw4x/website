import { SITE } from "@/lib/site-config";

const [LEAD, TAIL] = [SITE.name.slice(0, -1), SITE.name.slice(-1)];

export function Wordmark() {
  return (
    <h1 className="text-display font-bold tracking-display text-foreground">
      {LEAD}
      <span className="text-accent-text">{TAIL}</span>
    </h1>
  );
}
