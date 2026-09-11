import { NextResponse, type NextRequest } from "next/server";

import { redirectResponse } from "@/lib/http/responses";
import { canonicalPathname } from "@/lib/http/trailing-slash";

export function proxy(request: NextRequest): Response {
  const { origin, pathname, search } = request.nextUrl;
  const canonical = canonicalPathname(pathname);

  if (canonical === undefined) {
    return NextResponse.next();
  }

  const target = new URL(`${canonical}${search}`, origin);

  return redirectResponse({ from: pathname, to: target.href, permanent: true });
}

export const config = {
  matcher: ["/((?!_next/).*/)"],
};
