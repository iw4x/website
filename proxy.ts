import type { NextRequest } from "next/server";

import { routeRequest } from "@/lib/http/route-request";

const PUBLIC_ASSETS: ReadonlySet<string> = new Set(JSON.parse(process.env.PUBLIC_ASSET_PATHS ?? "[]") as string[]);

export function proxy(request: NextRequest): Response {
  return routeRequest(request, PUBLIC_ASSETS);
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
