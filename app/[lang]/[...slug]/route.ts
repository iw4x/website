import type { NextRequest } from "next/server";

import { findRedirect } from "@/lib/http/redirects";
import { notFoundResponse, redirectResponse } from "@/lib/http/responses";
import { splitLocale } from "@/lib/i18n/config";

function handle(request: NextRequest): Response {
  const { rest } = splitLocale(request.nextUrl.pathname);
  const redirect = findRedirect(rest);

  if (redirect) {
    return redirectResponse(redirect);
  }

  return notFoundResponse();
}

export const GET = handle;
export const HEAD = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
