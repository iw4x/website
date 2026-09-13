export type Header = {
  readonly key: string;
  readonly value: string;
};

const CSP_DIRECTIVES: readonly (readonly [string, readonly string[]])[] = [
  ["default-src", ["'self'"]],
  ["base-uri", ["'self'"]],
  ["object-src", ["'none'"]],
  ["frame-ancestors", ["'none'"]],
  ["form-action", ["'self'"]],
  ["img-src", ["'self'", "data:"]],
  ["font-src", ["'self'"]],
  ["connect-src", ["'self'"]],
  ["manifest-src", ["'self'"]],
  ["style-src", ["'self'", "'unsafe-inline'"]],
  ["script-src", ["'self'", "'unsafe-inline'"]],
];

const PERMISSIONS = [
  "accelerometer",
  "autoplay",
  "camera",
  "display-capture",
  "encrypted-media",
  "fullscreen",
  "geolocation",
  "gyroscope",
  "magnetometer",
  "microphone",
  "midi",
  "payment",
  "usb",
  "xr-spatial-tracking",
] as const;

export const ONE_YEAR_SECONDS = 31_536_000;

const DEVELOPMENT_SOURCES: Readonly<Record<string, readonly string[]>> = {
  "script-src": ["'unsafe-eval'"],
};

export function contentSecurityPolicy({ development = false }: { development?: boolean } = {}): string {
  return CSP_DIRECTIVES.map(([directive, sources]) => {
    const extra = development ? (DEVELOPMENT_SOURCES[directive] ?? []) : [];

    return [directive, ...sources, ...extra].join(" ");
  }).join("; ");
}

export function permissionsPolicy(): string {
  return PERMISSIONS.map((feature) => `${feature}=()`).join(", ");
}

export function securityHeaders({ development = false }: { development?: boolean } = {}): readonly Header[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ development }) },
    { key: "Strict-Transport-Security", value: `max-age=${ONE_YEAR_SECONDS * 2}; includeSubDomains; preload` },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    { key: "Permissions-Policy", value: permissionsPolicy() },
  ];
}
