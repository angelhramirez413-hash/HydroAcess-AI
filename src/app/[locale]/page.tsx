import Link from "next/link";
import { ArrowRight, Droplets, Gauge, Globe2, Map, ShieldCheck, Wrench } from "lucide-react";
import { createElement } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type AppLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as AppLocale);
  const statIcons = [Globe2, ShieldCheck, Wrench];
  const statTreatments = [
    "bg-aqua-100 text-aqua-600",
    "bg-[#fff2cc] text-[#a16300]",
    "bg-ocean-100 text-ocean-700"
  ];

  return (
    <>
      <section className="hydro-lab relative isolate overflow-hidden bg-[#03131d] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_24%,rgba(45,212,191,0.2),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(247,195,95,0.14),transparent_24%),linear-gradient(135deg,#03131d_0%,#062339_46%,#041923_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(45,212,191,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="reveal-up max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-aqua-400/25 bg-aqua-400/10 px-3 py-1.5 text-sm font-semibold text-aqua-100 backdrop-blur">
              <Droplets size={16} aria-hidden />
              {dictionary.home.eyebrow}
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-7xl lg:text-8xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/[0.78] sm:text-xl">{dictionary.home.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="focus-ring shine-button inline-flex h-12 items-center gap-2 rounded-lg bg-aqua-400 px-5 font-semibold text-ocean-950 shadow-[0_18px_44px_rgba(45,212,191,0.28)] transition hover:bg-aqua-100" href={`/${locale}/water-advisor`}>
                {dictionary.home.cta}
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="focus-ring inline-flex h-12 items-center rounded-lg border border-white/[0.22] bg-white/10 px-5 font-semibold text-white backdrop-blur transition hover:bg-white/[0.18]" href={`/${locale}/how-it-works`}>
                {dictionary.home.secondary}
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[dictionary.home.stat1, dictionary.home.stat2, dictionary.home.stat3].map((stat, index) => (
                <div key={stat} className="border-l border-aqua-400/35 pl-4">
                  <div className={`mb-3 grid h-9 w-9 place-items-center rounded-md ${statTreatments[index]}`}>
                    {createElement(statIcons[index], { size: 18, "aria-hidden": true })}
                  </div>
                  <p className="text-sm font-semibold leading-6 text-white/86">{stat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up">
            <div className="watershed-map relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.07] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
              <div className="contour contour-one" />
              <div className="contour contour-two" />
              <div className="contour contour-three" />
              <div className="water-thread water-thread-one" />
              <div className="water-thread water-thread-two" />
              <div className="water-thread water-thread-three" />
              <div className="relative z-10 flex h-full min-h-[30rem] flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-aqua-100">{dictionary.home.modelEyebrow}</p>
                    <p className="mt-2 max-w-sm text-3xl font-semibold leading-tight">{dictionary.home.modelTitle}</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/10 text-aqua-100">
                    <Map size={22} aria-hidden />
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {dictionary.home.modelSteps.map((step, index) => (
                    <div key={step.label} className="map-node rounded-2xl border border-white/12 bg-[#03131d]/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-aqua-400/18 text-sm font-semibold text-aqua-100">{index + 1}</span>
                      <div>
                        <p className="mt-4 text-xs uppercase text-white/45">{step.label}</p>
                        <p className="mt-1 font-semibold text-white">{step.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                  <div className="flex items-center gap-2 text-aqua-100">
                    <Gauge size={18} aria-hidden />
                    <p className="text-sm font-semibold">{dictionary.home.modelScore}</p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[84%] rounded-full bg-[linear-gradient(90deg,#2dd4bf,#f7c35f)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6fbfc] px-4 py-24 sm:px-6 lg:px-8">
        <div className="current-ribbon absolute inset-x-0 top-0 h-10 opacity-70" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-stretch">
          <div className="field-manifest relative overflow-hidden rounded-[2rem] bg-ocean-950 p-6 text-white shadow-[0_30px_90px_rgba(6,35,57,0.18)]">
            <p className="text-sm font-semibold text-aqua-100">{dictionary.home.principlesEyebrow}</p>
            <div className="mt-5 grid gap-3">
              {dictionary.home.principles.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.08] px-3 py-3 text-sm font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-aqua-400 shadow-[0_0_0_5px_rgba(45,212,191,0.16)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-ocean-100 bg-white p-8 shadow-[0_24px_80px_rgba(6,35,57,0.09)]">
            <p className="max-w-4xl text-3xl font-semibold leading-10 text-ocean-950 sm:text-4xl">{dictionary.home.mission}</p>
            <div className="mt-8 h-1 w-32 rounded-full bg-[linear-gradient(90deg,#0c8cc8,#2dd4bf,#f7c35f)]" />
          </div>
        </div>
      </section>
    </>
  );
}
