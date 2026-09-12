import { LINKS } from "../site-config";

export type RedirectRule = {
  readonly from: string;
  readonly to: string;
  readonly permanent: boolean;
};

export const REDIRECTS: readonly RedirectRule[] = [
  { from: "/docs", to: LINKS.docs, permanent: false },
];

export function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");

  if (trimmed === "") {
    return "/";
  }

  return trimmed.toLowerCase();
}

export function findRedirect(pathname: string): RedirectRule | undefined {
  const normalized = normalizePathname(pathname);

  return REDIRECTS.find((rule) => normalizePathname(rule.from) === normalized);
}
