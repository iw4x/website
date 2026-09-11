import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, LOCALES, LOCALE_DETAILS, isLocale, splitLocale } from "@/lib/i18n/config";

describe("locale configuration", () => {
  it("includes the default locale in the supported set", () => {
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("has no duplicate locales", () => {
    expect(new Set(LOCALES).size).toBe(LOCALES.length);
  });

  it("uses lowercase URL segments", () => {
    for (const locale of LOCALES) {
      expect(locale).toMatch(/^[a-z]{2,3}(-[a-z0-9]+)*$/);
    }
  });

  it.each(LOCALES)("gives %s a canonical BCP 47 tag matching its URL segment", (locale) => {
    const { tag } = LOCALE_DETAILS[locale];

    expect(Intl.getCanonicalLocales(tag)).toEqual([tag]);
    expect(tag.toLowerCase()).toBe(locale);
  });

  it.each(LOCALES)("names %s in its own language", (locale) => {
    expect(LOCALE_DETAILS[locale].name.trim()).not.toBe("");
  });
});

describe("isLocale", () => {
  it.each(LOCALES)("accepts %s", (locale) => {
    expect(isLocale(locale)).toBe(true);
  });

  it.each(["de", "EN", "en-US", "", "..", "e", "english"])("rejects %s", (value) => {
    expect(isLocale(value)).toBe(false);
  });
});

describe("splitLocale", () => {
  it("splits a localised root path", () => {
    expect(splitLocale("/en")).toEqual({ locale: "en", rest: "/" });
  });

  it("splits a localised nested path", () => {
    expect(splitLocale("/en/docs/install")).toEqual({ locale: "en", rest: "/docs/install" });
  });

  it("reports no locale for an unprefixed path", () => {
    expect(splitLocale("/docs")).toEqual({ locale: null, rest: "/docs" });
  });

  it("reports no locale for the bare root", () => {
    expect(splitLocale("/")).toEqual({ locale: null, rest: "/" });
  });

  it("does not treat an unsupported language as a prefix", () => {
    expect(splitLocale("/de/docs").locale).toBeNull();
  });

  it("does not mistake a segment that merely starts with a locale", () => {
    expect(splitLocale("/english").locale).toBeNull();
  });
});
