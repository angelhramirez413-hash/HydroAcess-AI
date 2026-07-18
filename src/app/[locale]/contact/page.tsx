import { notFound } from "next/navigation";
import { Send } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type AppLocale } from "@/lib/i18n/config";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as AppLocale);

  return (
    <section className="water-grid bg-[linear-gradient(180deg,#edfaff_0%,#ffffff_54%,#f6fbfc_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="reveal-up mx-auto max-w-3xl rounded-lg border border-white/80 bg-white/[0.9] p-6 shadow-[0_24px_70px_rgba(6,35,57,0.12)] ring-1 ring-ocean-100/70 backdrop-blur">
        <p className="text-sm font-semibold text-aqua-600">{dictionary.nav.contact}</p>
        <h1 className="mt-3 text-4xl font-semibold text-ocean-950">{dictionary.contact.title}</h1>
        <form className="mt-8 grid gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">{dictionary.contact.name}</span>
            <input className="focus-ring mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white/[0.9] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_rgba(6,35,57,0.04)]" required />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">{dictionary.contact.email}</span>
            <input className="focus-ring mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white/[0.9] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_rgba(6,35,57,0.04)]" type="email" required />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">{dictionary.contact.message}</span>
            <textarea className="focus-ring mt-1 min-h-36 w-full rounded-lg border border-slate-200 bg-white/[0.9] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_rgba(6,35,57,0.04)]" required />
          </label>
          <button className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#075f8e,#0d9488)] px-5 font-semibold text-white shadow-[0_18px_36px_rgba(7,95,142,0.24)] transition hover:translate-y-[-1px]" type="submit">
            <Send size={18} aria-hidden />
            {dictionary.contact.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
