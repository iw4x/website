import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import type { NextConfig } from "next";

import { cacheControlFor } from "./lib/http/cache-control";
import { METADATA_ROUTES } from "./lib/http/metadata-routes";
import { publicAssetPaths } from "./lib/http/public-assets";
import { securityHeaders } from "./lib/http/security-headers";

const PUBLIC_ASSET_PATHS = publicAssetPaths(process.cwd());

export default function config(phase: string): NextConfig {
  const development = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    poweredByHeader: false,
    allowedDevOrigins: ["127.0.0.1"],
    skipTrailingSlashRedirect: true,
    env: {
      PUBLIC_ASSET_PATHS: JSON.stringify(PUBLIC_ASSET_PATHS),
    },
    async headers() {
      return [
        { source: "/:path*", headers: [...securityHeaders({ development })] },
        ...[...PUBLIC_ASSET_PATHS, ...METADATA_ROUTES].map((source) => ({
          source,
          headers: [{ key: "Cache-Control", value: cacheControlFor("publicAsset") }],
        })),
      ];
    },
  };
}
