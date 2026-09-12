export const METADATA_ROUTES = ["/robots.txt", "/sitemap.xml"] as const;

export type MetadataRoute = (typeof METADATA_ROUTES)[number];

const LOOKUP: ReadonlySet<string> = new Set(METADATA_ROUTES);

export function isMetadataRoute(pathname: string): boolean {
  return LOOKUP.has(pathname);
}
