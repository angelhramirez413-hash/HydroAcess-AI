import Link from "next/link";
import type { AppLocale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SiteFooter({ locale, dictionary }: { locale: AppLocale; dictionary: Dictionary }) {
  return (
    <footer className="border-t border-ocean-100 bg-ocean-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold tracking-wide">HydroAccess AI</p>
          <div className="flex flex-wrap gap-4 text-white/80">
            <Link className="transition hover:text-white" href={`/${locale}/water-advisor`}>
              {dictionary.nav.advisor}
            </Link>
            <Link className="transition hover:text-white" href={`/${locale}/about`}>
              {dictionary.nav.about}
            </Link>
            <Link className="transition hover:text-white" href={`/${locale}/contact`}>
              {dictionary.nav.contact}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-white/65 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-white/85">{dictionary.footer.product}</p>
            <p>{dictionary.footer.creator}</p>
            <p>{dictionary.footer.rights}</p>
          </div>
          <p className="max-w-2xl md:text-right">{dictionary.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
