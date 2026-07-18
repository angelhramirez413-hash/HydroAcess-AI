import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type AppLocale } from "@/lib/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as AppLocale);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader locale={locale as AppLocale} dictionary={dictionary} />
      <main>{children}</main>
      <SiteFooter locale={locale as AppLocale} dictionary={dictionary} />
    </div>
  );
}
