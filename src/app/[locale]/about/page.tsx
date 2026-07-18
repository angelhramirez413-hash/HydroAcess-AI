import { notFound } from "next/navigation";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type AppLocale } from "@/lib/i18n/config";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as AppLocale);

  return (
    <section className="water-grid bg-[linear-gradient(180deg,#ffffff_0%,#f3fbfb_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="interactive-lift relative min-h-80 overflow-hidden rounded-lg bg-ocean-950 p-8 text-white shadow-[0_24px_70px_rgba(6,35,57,0.18)]">
          <Image src="/images/hydroaccess-hero.png" alt="" fill className="object-cover opacity-55" sizes="(min-width: 1024px) 36rem, 100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,35,57,0.22),rgba(6,35,57,0.88))]" />
          <div className="relative z-10 flex h-full flex-col justify-end">
            <HeartHandshake size={36} aria-hidden />
            <p className="mt-8 text-3xl font-semibold leading-10">HydroAccess AI</p>
          </div>
        </div>
        <div className="reveal-up self-center">
          <p className="text-sm font-semibold text-aqua-600">{dictionary.nav.about}</p>
          <h1 className="mt-3 text-4xl font-semibold text-ocean-950 sm:text-5xl">{dictionary.about.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">{dictionary.about.body}</p>
        </div>
      </div>
    </section>
  );
}
