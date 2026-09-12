export const LOCALES = ["en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type LocaleDetails = {
  readonly tag: string;
  readonly name: string;
};

export const LOCALE_DETAILS: Readonly<Record<Locale, LocaleDetails>> = {
  en: { tag: "en", name: "English" },
};

export function localeTag(locale: Locale): string {
  return LOCALE_DETAILS[locale].tag;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function splitLocale(pathname: string): { locale: Locale | null; rest: string } {
  const [, first = "", ...others] = pathname.split("/");

  if (!isLocale(first)) {
    return { locale: null, rest: pathname };
  }

  return { locale: first, rest: `/${others.join("/")}` };
}
