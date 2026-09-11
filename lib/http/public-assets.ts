import { existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_METADATA_FILE =
  /^(favicon\.ico|(icon|apple-icon|opengraph-image|twitter-image)\d*\.(ico|jpg|jpeg|png|gif|svg)|robots\.txt|sitemap\.xml|manifest\.(json|webmanifest))$/;

const URL_SAFE_PATH = /^\/[A-Za-z0-9._~/-]+$/;

function listFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name));
}

function toUrlPath(directory: string, file: string): string {
  return `/${relative(directory, file).split(sep).join("/")}`;
}

export function publicAssetPaths(projectDirectory: string): string[] {
  const publicDirectory = join(projectDirectory, "public");
  const appDirectory = join(projectDirectory, "app");

  const publicFiles = listFiles(publicDirectory).map((file) => toUrlPath(publicDirectory, file));

  const metadataFiles = existsSync(appDirectory)
    ? readdirSync(appDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && APP_METADATA_FILE.test(entry.name))
        .map((entry) => `/${entry.name}`)
    : [];

  const paths = [...new Set([...publicFiles, ...metadataFiles])].sort();

  for (const path of paths) {
    if (!URL_SAFE_PATH.test(path)) {
      throw new Error(`Public asset path is not URL-safe: ${path}`);
    }
  }

  return paths;
}
