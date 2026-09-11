import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";
import { negotiateLocale, negotiateTag } from "@/lib/i18n/negotiate";

const TAGS = ["en", "fr", "ru", "zh-Hans", "zh-Hant"];

function negotiate(acceptLanguage: string | null): string {
  return negotiateTag(acceptLanguage, TAGS, "en");
}

describe("negotiateTag", () => {
  it("picks the language the device asks for", () => {
    expect(negotiate("fr")).toBe("fr");
    expect(negotiate("ru")).toBe("ru");
    expect(negotiate("en")).toBe("en");
  });

  it("matches a regional variant to its base language", () => {
    expect(negotiate("fr-CA")).toBe("fr");
    expect(negotiate("en-GB")).toBe("en");
    expect(negotiate("ru-RU")).toBe("ru");
  });

  it.each([
    ["zh", "zh-Hans"],
    ["zh-CN", "zh-Hans"],
    ["zh-SG", "zh-Hans"],
    ["zh-Hans-HK", "zh-Hans"],
    ["zh-TW", "zh-Hant"],
    ["zh-HK", "zh-Hant"],
    ["zh-MO", "zh-Hant"],
    ["zh-Hant", "zh-Hant"],
  ])("serves %s readers the %s script", (header, expected) => {
    expect(negotiate(header)).toBe(expected);
  });

  it("honours quality values rather than header order", () => {
    expect(negotiate("en;q=0.2, fr;q=0.9")).toBe("fr");
    expect(negotiate("fr;q=0.1, en;q=0.8")).toBe("en");
  });

  it("skips languages it cannot serve", () => {
    expect(negotiate("de, fr;q=0.7")).toBe("fr");
  });

  it("falls back for an unsupported language", () => {
    expect(negotiate("de-DE, de;q=0.9")).toBe("en");
  });

  it("falls back when no header is sent", () => {
    expect(negotiate(null)).toBe("en");
    expect(negotiate("")).toBe("en");
  });

  it("treats a wildcard as no preference", () => {
    expect(negotiate("*")).toBe("en");
    expect(negotiate("*, fr;q=0.5")).toBe("fr");
  });

  it.each(["en_US", "!!!", ";;;", "en;q=nonsense", "a".repeat(5000), "zh-Hans-".repeat(500)])(
    "survives the malformed header %#",
    (header) => {
      expect(TAGS).toContain(negotiate(header));
    },
  );
});

describe("negotiateLocale", () => {
  it("returns a supported locale for any header", () => {
    for (const header of [null, "", "en", "fr-CA", "zh-TW", "de", "*", "en_US"]) {
      expect(LOCALES).toContain(negotiateLocale(header));
    }
  });

  it("falls back to the default locale for unsupported languages", () => {
    expect(negotiateLocale("de-DE")).toBe(DEFAULT_LOCALE);
  });

  it("serves English to English devices", () => {
    expect(negotiateLocale("en-US,en;q=0.9")).toBe("en");
  });
});
