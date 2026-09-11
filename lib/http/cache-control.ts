export const ONE_YEAR_SECONDS = 31_536_000;

export type CachePolicy = {
  sMaxAge: number;
  staleWhileRevalidate?: number;
  staleIfError?: number;
  maxAge?: number;
  immutable?: boolean;
};

export function cacheControl(policy: CachePolicy): string {
  const directives = ["public", `max-age=${policy.maxAge ?? 0}`];

  if (policy.immutable) {
    directives.push("immutable");
  }

  directives.push(`s-maxage=${policy.sMaxAge}`);

  if (policy.staleWhileRevalidate !== undefined) {
    directives.push(`stale-while-revalidate=${policy.staleWhileRevalidate}`);
  }

  if (policy.staleIfError !== undefined) {
    directives.push(`stale-if-error=${policy.staleIfError}`);
  }

  return directives.join(", ");
}

export const CACHE_POLICIES = {
  immutableAsset: {
    maxAge: ONE_YEAR_SECONDS,
    sMaxAge: ONE_YEAR_SECONDS,
    immutable: true,
  },
  publicAsset: {
    maxAge: 300,
    sMaxAge: 86_400,
    staleWhileRevalidate: 86_400,
    staleIfError: 86_400,
  },
  notFound: {
    sMaxAge: 300,
    staleWhileRevalidate: 300,
    staleIfError: 3600,
  },
  redirect: {
    sMaxAge: 300,
    staleWhileRevalidate: 300,
    staleIfError: 3600,
  },
} as const satisfies Record<string, CachePolicy>;

export type CachePolicyName = keyof typeof CACHE_POLICIES;

export function cacheControlFor(name: CachePolicyName): string {
  return cacheControl(CACHE_POLICIES[name]);
}
