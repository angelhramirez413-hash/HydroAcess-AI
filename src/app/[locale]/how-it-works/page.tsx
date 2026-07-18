import { notFound } from "next/navigation";
import { ClipboardCheck, DatabaseZap, FileCheck2 } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type AppLocale } from "@/lib/i18n/config";

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as AppLocale);
  const steps = [
    { icon: ClipboardCheck, title: dictionary.how.step1 },
    { icon: DatabaseZap, title: dictionary.how.step2 },
    { icon: FileCheck2, title: dictionary.how.step3 }
  ];

  return (
    <section className="water-grid bg-[linear-gradient(180deg,#ffffff_0%,#edfaff_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-up">
          <p className="text-sm font-semibold text-aqua-600">{dictionary.nav.how}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ocean-950 sm:text-5xl">{dictionary.how.title}</h1>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title }, index) => (
            <article key={title} className="interactive-lift rounded-lg border border-white/80 bg-white/[0.88] p-6 shadow-[0_22px_60px_rgba(6,35,57,0.1)] ring-1 ring-ocean-100/70 backdrop-blur">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[linear-gradient(135deg,#edfaff,#ccfbf1)] text-ocean-700 shadow-[0_12px_28px_rgba(7,95,142,0.12)]">
                <Icon size={22} aria-hidden />
              </div>
              <p className="mt-6 text-sm font-semibold text-aqua-600">0{index + 1}</p>
              <h2 className="mt-2 text-2xl font-semibold text-ocean-950">{title}</h2>
              <p className="mt-4 leading-7 text-slate-700">
                {dictionary.how.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
