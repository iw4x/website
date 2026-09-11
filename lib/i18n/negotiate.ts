import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { DEFAULT_LOCALE, LOCALES, LOCALE_DETAILS, type Locale } from "./config";

export function negotiateTag(acceptLanguage: string | null, tags: readonly string[], fallback: string): string {
  if (!acceptLanguage) {
    return fallback;
  }

  let languages: string[];

  try {
    languages = new Negotiator({ headers: { "accept-language": acceptLanguage } }).languages();
  } catch {
    return fallback;
  }

  const preferences = languages.filter((language) => language !== "*");

  if (preferences.length === 0) {
    return fallback;
  }

  try {
    return match(preferences, [...tags], fallback);
  } catch {
    return fallback;
  }
}

const LOCALE_BY_TAG = new Map<string, Locale>(LOCALES.map((locale) => [LOCALE_DETAILS[locale].tag, locale]));

export function negotiateLocale(acceptLanguage: string | null): Locale {
  const tag = negotiateTag(acceptLanguage, [...LOCALE_BY_TAG.keys()], LOCALE_DETAILS[DEFAULT_LOCALE].tag);

  return LOCALE_BY_TAG.get(tag) ?? DEFAULT_LOCALE;
}
