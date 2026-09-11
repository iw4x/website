export function canonicalPathname(pathname: string): string | undefined {
  if (pathname === "/" || !pathname.endsWith("/")) {
    return undefined;
  }

  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}
