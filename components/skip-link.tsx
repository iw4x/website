export const MAIN_CONTENT_ID = "main-content";

export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:min-w-11 focus:items-center focus:border focus:border-border focus:bg-background focus:px-4 focus:font-semibold focus:text-foreground"
    >
      {label}
    </a>
  );
}
