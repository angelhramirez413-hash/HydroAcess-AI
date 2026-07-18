import Link from "next/link";
import Image from "next/image";
import type { AppLocale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { SiteNav } from "./site-nav";

export function SiteHeader({ locale, dictionary }: { locale: AppLocale; dictionary: Dictionary }) {
  const nav = [
    { label: dictionary.nav.home, href: `/${locale}` },
    { label: dictionary.nav.how, href: `/${locale}/how-it-works` },
    { label: dictionary.nav.advisor, href: `/${locale}/water-advisor` },
    { label: dictionary.nav.about, href: `/${locale}/about` },
    { label: dictionary.nav.contact, href: `/${locale}/contact` }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/[0.78] shadow-[0_18px_58px_rgba(6,35,57,0.1)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link href={`/${locale}`} className="focus-ring flex items-center gap-2 rounded-md text-ocean-950">
          <Image src="/images/hydroaccess-ai-mark.svg" alt="" width={44} height={44} className="h-11 w-11 rounded-xl shadow-[0_14px_32px_rgba(7,95,142,0.18)]" priority />
          <span className="text-lg font-semibold">HydroAccess AI</span>
        </Link>
        <SiteNav items={nav} />
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
