"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SiteNavProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export function SiteNav({ items }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav className="order-3 flex w-full gap-2 overflow-x-auto text-sm font-semibold text-slate-700 md:order-none md:w-auto md:items-center md:justify-center md:gap-1 md:overflow-visible">
      {items.map((item) => {
        const isHome = item.href.split("/").length === 2;
        const active = isHome ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`focus-ring group relative shrink-0 rounded-lg px-3 py-2 transition duration-200 ${
              active ? "text-ocean-950" : "text-slate-700 hover:bg-ocean-50 hover:text-ocean-700"
            }`}
          >
            {item.label}
            <span
              className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[linear-gradient(90deg,#0c8cc8,#2dd4bf,#f7c35f)] transition duration-200 ${
                active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
