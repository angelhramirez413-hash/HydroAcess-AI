import "server-only";
import type { AppLocale } from "./config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  es: () => import("@/messages/es.json").then((module) => module.default)
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: AppLocale) {
  return dictionaries[locale]();
}
