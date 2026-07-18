export const locales = ["en", "es"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";

export const futureLocales = ["pt", "fr", "ar", "hi", "sw"] as const;

export function isLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
