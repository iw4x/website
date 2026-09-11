import { SITE } from "../site-config";
import { cacheControlFor } from "./cache-control";

const NOT_FOUND = {
  title: "Not found",
  message: "That page does not exist.",
  homeLink: "Go to the homepage",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function notFoundHtml(): string {
  const { title, message, homeLink } = NOT_FOUND;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} | ${escapeHtml(SITE.name)}</title>
</head>
<body>
<main>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(message)} <a href="/">${escapeHtml(homeLink)}</a>.</p>
</main>
</body>
</html>
`;
}

export function notFoundResponse(): Response {
  return new Response(notFoundHtml(), {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": cacheControlFor("notFound"),
      "X-Robots-Tag": "noindex",
    },
  });
}
