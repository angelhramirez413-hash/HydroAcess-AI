import { notFound } from "next/navigation";
import { WaterAdvisor } from "@/components/advisor/water-advisor";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type AppLocale } from "@/lib/i18n/config";

export default async function WaterAdvisorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as AppLocale);

  return (
    <section className="advisor-stage relative overflow-hidden bg-[linear-gradient(180deg,#eef9fc_0%,#ffffff_34%,#f6fbfc_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="water-grid absolute inset-0 opacity-75" />
      <div className="hydro-orbit absolute -right-48 top-12 h-96 w-96 rounded-full opacity-45" />
      <div className="absolute -left-24 top-72 h-72 w-72 rounded-full bg-aqua-400/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="reveal-up relative z-10 mb-8 max-w-3xl">
          <p className="text-sm font-semibold text-aqua-600">{dictionary.nav.advisor}</p>
          <h1 className="mt-3 text-4xl font-semibold text-ocean-950 sm:text-5xl">{dictionary.advisor.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">{dictionary.advisor.subtitle}</p>
        </div>
        <div className="relative z-10">
          <WaterAdvisor dictionary={dictionary} locale={locale as AppLocale} />
        </div>
      </div>
    </section>
  );
}
