import { NextResponse, type NextRequest } from "next/server";

import { splitLocale } from "../i18n/config";
import { negotiateLocale } from "../i18n/negotiate";
import { isMetadataRoute } from "./metadata-routes";
import { localeRedirectResponse, redirectResponse } from "./responses";
import { canonicalPathname } from "./trailing-slash";

export function routeRequest(request: NextRequest, publicAssets: ReadonlySet<string>): Response {
  const { origin, pathname, search } = request.nextUrl;
  const canonical = canonicalPathname(pathname);

  if (canonical !== undefined) {
    const target = new URL(`${canonical}${search}`, origin);

    return redirectResponse({ from: pathname, to: target.href, permanent: true });
  }

  if (publicAssets.has(pathname) || isMetadataRoute(pathname) || splitLocale(pathname).locale !== null) {
    return NextResponse.next();
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const suffix = pathname === "/" ? "" : pathname;
  const target = new URL(`/${locale}${suffix}${search}`, origin);

  return localeRedirectResponse(target.href);
}
