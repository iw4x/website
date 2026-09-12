const BASE =
  "inline-flex items-center justify-center border text-base font-semibold tracking-body " +
  "transition-[color,background-color,border-color] duration-150 ease-out";

const SIZES = {
  lg: "min-h-12 flex-1 basis-40 px-6",
  sm: "min-h-11 px-4",
} as const;

const VARIANTS = {
  primary: "border-accent-edge bg-accent text-accent-ink hover:bg-accent-hover active:bg-accent-active",
  secondary:
    "border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface " +
    "active:border-foreground active:bg-surface",
} as const;

export type ActionVariant = keyof typeof VARIANTS;
export type ActionSize = keyof typeof SIZES;

export type ActionLinkProps = {
  readonly href: string;
  readonly variant: ActionVariant;
  readonly size?: ActionSize;
  readonly label?: string;
  readonly children: string;
};

export function ActionLink({ href, variant, size = "lg", label, children }: ActionLinkProps) {
  return (
    <a href={href} aria-label={label} className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]}`}>
      {children}
    </a>
  );
}
