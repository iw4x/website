import type { NextConfig } from "next";

import { cacheControlFor } from "./lib/http/cache-control";
import { publicAssetPaths } from "./lib/http/public-assets";

const PUBLIC_ASSET_PATHS = publicAssetPaths(process.cwd());

const nextConfig: NextConfig = {
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  env: {
    PUBLIC_ASSET_PATHS: JSON.stringify(PUBLIC_ASSET_PATHS),
  },
  async headers() {
    return PUBLIC_ASSET_PATHS.map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: cacheControlFor("publicAsset") }],
    }));
  },
};

export default nextConfig;
