import { chromium } from "@playwright/test";
import { launch } from "chrome-launcher";
import lighthouse, { type Config, type Result } from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

import { LOCALES } from "../lib/i18n/config.ts";

const THRESHOLD = 100;

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"] as const;

type Category = (typeof CATEGORIES)[number];

type FormFactor = {
  readonly name: string;
  readonly config: Config | undefined;
};

const FORM_FACTORS: readonly FormFactor[] = [
  { name: "mobile", config: undefined },
  { name: "desktop", config: desktopConfig },
];

const RUNS = Number(process.env.LIGHTHOUSE_RUNS ?? 3);

const BASE_URL = process.argv[2] ?? process.env.LIGHTHOUSE_BASE_URL ?? "http://127.0.0.1:3000";

function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function categoryScore(lhr: Result, category: Category): number {
  return Math.round((lhr.categories[category]?.score ?? 0) * 100);
}

function failingAudits(lhr: Result, category: Category): string[] {
  return (lhr.categories[category]?.auditRefs ?? [])
    .filter((ref) => ref.weight > 0)
    .map((ref) => lhr.audits[ref.id])
    .filter((audit) => audit.score !== null && audit.score < 1)
    .map((audit) => (audit.displayValue ? `${audit.id} (${audit.displayValue})` : audit.id));
}

async function audit(url: string, port: number, config: Config | undefined): Promise<Result> {
  const result = await lighthouse(url, { port, output: "json", logLevel: "error" }, config);

  if (!result) {
    throw new Error(`Lighthouse returned no result for ${url}`);
  }

  if (result.lhr.runtimeError) {
    throw new Error(`Lighthouse failed on ${url}: ${result.lhr.runtimeError.message}`);
  }

  return result.lhr;
}

async function main(): Promise<void> {
  if (!Number.isInteger(RUNS) || RUNS < 1) {
    throw new Error(`LIGHTHOUSE_RUNS must be a positive integer, got ${process.env.LIGHTHOUSE_RUNS}`);
  }

  const chrome = await launch({
    chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const rows: { target: string; scores: Record<Category, number> }[] = [];
  const failures: string[] = [];

  try {
    for (const locale of LOCALES) {
      for (const { name, config } of FORM_FACTORS) {
        const url = `${BASE_URL}/${locale}`;
        const target = `/${locale} ${name}`;
        const reports: Result[] = [];

        for (let run = 0; run < RUNS; run++) {
          reports.push(await audit(url, chrome.port, config));
        }

        const scores = Object.fromEntries(
          CATEGORIES.map((category) => [category, median(reports.map((lhr) => categoryScore(lhr, category)))]),
        ) as Record<Category, number>;

        rows.push({ target, scores });

        for (const category of CATEGORIES) {
          if (scores[category] >= THRESHOLD) {
            continue;
          }

          const worst = reports.reduce((a, b) => (categoryScore(b, category) < categoryScore(a, category) ? b : a));
          const audits = failingAudits(worst, category);

          failures.push(
            `${target} ${category}: ${scores[category]} < ${THRESHOLD}` +
              (audits.length > 0 ? `\n    failing audits: ${audits.join(", ")}` : ""),
          );
        }
      }
    }
  } finally {
    chrome.kill();
  }

  const width = Math.max(...rows.map(({ target }) => target.length)) + 2;

  console.log(`\n${"target".padEnd(width)}${CATEGORIES.map((category) => category.padStart(16)).join("")}`);

  for (const { target, scores } of rows) {
    console.log(`${target.padEnd(width)}${CATEGORIES.map((category) => String(scores[category]).padStart(16)).join("")}`);
  }

  if (failures.length > 0) {
    console.error(`\nLighthouse gate failed:\n  ${failures.join("\n  ")}`);
    process.exitCode = 1;

    return;
  }

  console.log(
    `\nEvery category scored ${THRESHOLD} across ${LOCALES.length} locale(s) and ${FORM_FACTORS.length} form factors (median of ${RUNS} runs).`,
  );
}

await main();
