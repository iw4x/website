import type { NextConfig } from "next";

import { cacheControlFor } from "./lib/http/cache-control";
import { publicAssetPaths } from "./lib/http/public-assets";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async headers() {
    return publicAssetPaths(process.cwd()).map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: cacheControlFor("publicAsset") }],
    }));
  },
};

export default nextConfig;
