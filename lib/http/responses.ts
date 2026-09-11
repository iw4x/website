import { LOCALE_DETAILS, type Locale } from "../i18n/config";
import { getDictionaryFor } from "../i18n/dictionaries";
import { SITE } from "../site-config";
import { cacheControlFor } from "./cache-control";
import type { RedirectRule } from "./redirects";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function notFoundHtml(locale: Locale): string {
  const { title, message, homeLink } = getDictionaryFor(locale).notFound;

  return `<!doctype html>
<html lang="${LOCALE_DETAILS[locale].tag}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} | ${escapeHtml(SITE.name)}</title>
</head>
<body>
<main>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(message)} <a href="/${locale}">${escapeHtml(homeLink)}</a>.</p>
</main>
</body>
</html>
`;
}

export function notFoundResponse(locale: Locale): Response {
  return new Response(notFoundHtml(locale), {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": cacheControlFor("notFound"),
      "X-Robots-Tag": "noindex",
    },
  });
}

export function redirectResponse(rule: RedirectRule): Response {
  return new Response(null, {
    status: rule.permanent ? 308 : 307,
    headers: {
      Location: rule.to,
      "Cache-Control": cacheControlFor("redirect"),
    },
  });
}

export function localeRedirectResponse(location: string): Response {
  return new Response(null, {
    status: 307,
    headers: {
      Location: location,
      "Cache-Control": cacheControlFor("localeRedirect"),
      Vary: "Accept-Language",
    },
  });
}
