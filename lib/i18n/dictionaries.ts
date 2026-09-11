import type { Locale } from "./config";
import en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const DICTIONARIES = { en } as const satisfies Record<Locale, Dictionary>;

export const ALL_DICTIONARIES: Readonly<Record<Locale, Dictionary>> = DICTIONARIES;

export function getDictionaryFor(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
