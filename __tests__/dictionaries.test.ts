import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";
import { ALL_DICTIONARIES, getDictionaryFor } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/format";

function strings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") {
    return [[path, value]];
  }

  if (typeof value !== "object" || value === null) {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => strings(child, path ? `${path}.${key}` : key));
}

const REFERENCE_KEYS = strings(ALL_DICTIONARIES[DEFAULT_LOCALE])
  .map(([path]) => path)
  .sort();

const PLACEHOLDER = /\{(\w+)\}/g;

const REFERENCE_PLACEHOLDERS = new Map(
  strings(ALL_DICTIONARIES[DEFAULT_LOCALE]).map(([path, text]) => [
    path,
    [...text.matchAll(PLACEHOLDER)].map(([, name]) => name).sort(),
  ]),
);

describe("dictionaries", () => {
  it.each(LOCALES)("provides a dictionary for %s", (locale) => {
    expect(getDictionaryFor(locale)).toBe(ALL_DICTIONARIES[locale]);
  });

  it.each(LOCALES)("%s has exactly the keys of the default locale", (locale) => {
    const keys = strings(ALL_DICTIONARIES[locale])
      .map(([path]) => path)
      .sort();

    expect(keys).toEqual(REFERENCE_KEYS);
  });

  it.each(LOCALES)("%s has no empty strings", (locale) => {
    for (const [path, text] of strings(ALL_DICTIONARIES[locale])) {
      expect(text.trim(), `${locale}: ${path}`).not.toBe("");
    }
  });

  it.each(LOCALES)("%s has no untrimmed strings", (locale) => {
    for (const [path, text] of strings(ALL_DICTIONARIES[locale])) {
      expect(text, `${locale}: ${path}`).toBe(text.trim());
    }
  });

  it.each(LOCALES)("%s only uses placeholders the default locale already declares", (locale) => {
    for (const [path, text] of strings(ALL_DICTIONARIES[locale])) {
      expect([...text.matchAll(PLACEHOLDER)].map(([, name]) => name).sort(), `${locale}: ${path}`).toEqual(
        REFERENCE_PLACEHOLDERS.get(path) ?? [],
      );
    }
  });

  it.each(LOCALES)("%s writes every placeholder in a form fill() can substitute", (locale) => {
    for (const [path, text] of strings(ALL_DICTIONARIES[locale])) {
      for (const [, name] of text.matchAll(PLACEHOLDER)) {
        expect(fill(text, { [name]: "" }), `${locale}: ${path}`).not.toContain(`{${name}}`);
      }
    }
  });

  it.each(LOCALES)("%s leaves no half-written placeholder behind", (locale) => {
    for (const [path, text] of strings(ALL_DICTIONARIES[locale])) {
      expect(text.replace(PLACEHOLDER, ""), `${locale}: ${path}`).not.toMatch(/[{}]/);
    }
  });

  it.each(LOCALES.filter((locale) => locale !== DEFAULT_LOCALE))("%s is translated rather than copied", (locale) => {
    const reference = new Map(strings(ALL_DICTIONARIES[DEFAULT_LOCALE]));
    const copied = strings(ALL_DICTIONARIES[locale]).filter(([path, text]) => reference.get(path) === text);

    expect(copied.map(([path]) => path)).toEqual([]);
  });
});
