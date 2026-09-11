import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { publicAssetPaths } from "@/lib/http/public-assets";

describe("publicAssetPaths", () => {
  let project: string;

  async function touch(...paths: string[]): Promise<void> {
    for (const path of paths) {
      const file = join(project, path);

      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, "");
    }
  }

  beforeEach(async () => {
    project = await mkdtemp(join(tmpdir(), "public-assets-"));
  });

  afterEach(async () => {
    await rm(project, { recursive: true, force: true });
  });

  it("returns nothing for a project without public files", () => {
    expect(publicAssetPaths(project)).toEqual([]);
  });

  it("lists files in public/ recursively as URL paths", async () => {
    await touch("public/logo.png", "public/images/hero.webp", "public/.well-known/security.txt");

    expect(publicAssetPaths(project)).toEqual(["/.well-known/security.txt", "/images/hero.webp", "/logo.png"]);
  });

  it("lists static metadata files from the root of app/", async () => {
    await touch(
      "app/favicon.ico",
      "app/icon.png",
      "app/icon1.svg",
      "app/apple-icon.png",
      "app/opengraph-image.jpg",
      "app/twitter-image.gif",
      "app/robots.txt",
      "app/sitemap.xml",
      "app/manifest.webmanifest",
    );

    expect(publicAssetPaths(project)).toEqual([
      "/apple-icon.png",
      "/favicon.ico",
      "/icon.png",
      "/icon1.svg",
      "/manifest.webmanifest",
      "/opengraph-image.jpg",
      "/robots.txt",
      "/sitemap.xml",
      "/twitter-image.gif",
    ]);
  });

  it("ignores app/ files that are not static metadata", async () => {
    await touch("app/page.tsx", "app/globals.css", "app/robots.ts", "app/blog/favicon.ico", "app/logo.png");

    expect(publicAssetPaths(project)).toEqual([]);
  });

  it("does not list directories", async () => {
    await mkdir(join(project, "public/empty"), { recursive: true });

    expect(publicAssetPaths(project)).toEqual([]);
  });

  it("deduplicates a file present in both public/ and app/", async () => {
    await touch("public/favicon.ico", "app/favicon.ico");

    expect(publicAssetPaths(project)).toEqual(["/favicon.ico"]);
  });

  it.each(["public/my logo.png", "public/(group).png", "public/a:b.png", "public/100%.png"])(
    "rejects %s because it is not URL-safe",
    async (path) => {
      await touch(path);

      expect(() => publicAssetPaths(project)).toThrow("Public asset path is not URL-safe");
    },
  );

  it("covers the favicon of this project", () => {
    expect(publicAssetPaths(process.cwd())).toContain("/favicon.ico");
  });
});
