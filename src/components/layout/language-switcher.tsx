"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { AppLocale } from "@/lib/i18n/config";

const languageLabels: Record<AppLocale, string> = {
  en: "English",
  es: "Espa\u00f1ol"
};

function localizedHref(pathname: string, targetLocale: AppLocale) {
  const segments = pathname.split("/").filter(Boolean);
  const [, ...rest] = segments;
  return `/${[targetLocale, ...rest].join("/")}`;
}

export function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-ocean-100/80 bg-white/95 p-1 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_rgba(6,35,57,0.08)] transition duration-200 hover:border-aqua-400/50">
      <Languages className="ml-2 hidden text-ocean-700 sm:block" size={17} aria-hidden />
      {(["en", "es"] as AppLocale[]).map((targetLocale) => {
        const active = targetLocale === locale;
        return (
          <Link
            key={targetLocale}
            href={localizedHref(pathname, targetLocale)}
            aria-current={active ? "page" : undefined}
            className={`focus-ring rounded-md px-3 py-2 transition ${
              active ? "bg-ocean-700 text-white shadow-sm" : "text-ocean-700 hover:bg-ocean-50"
            }`}
          >
            {languageLabels[targetLocale]}
          </Link>
        );
      })}
    </div>
  );
}
