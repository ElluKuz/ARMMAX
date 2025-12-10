// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/painting", label: "Interior<br>painting" },
  { href: "/furniture-assembly", label: "Furniture<br>assembly" },
  { href: "/gazebo-installation", label: "Gazebo<br>installation" },
  { href: "/handyman-services", label: "TV & art<br>mounting" },
];

export function Navbar({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur transition-colors duration-300",
        scrolled
          ? "bg-white/80 border-slate-200"
          : "bg-white/80 border-slate-200/50"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Левая часть: бургер + логотип */}
        <div className="flex items-center gap-3">
          {/* бургер только на мобилке */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span className="h-[2px] w-full rounded-full bg-slate-700" />
              <span className="h-[2px] w-full rounded-full bg-slate-700" />
              <span className="h-[2px] w-full rounded-full bg-slate-700" />
            </span>
          </button>

          {/* логотип — чуть правее за счёт бургера */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 min-w-[2.5rem] md:h-14 md:w-14">
              <img
                src="/armmax-logo.png"
                alt="ARMMAX logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Десктоп-навигация по центру */}
        <div className="hidden flex-1 justify-center gap-8 text-[13px] font-semibold uppercase tracking-[0.25em] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition text-center",
                pathname === item.href
                  ? "text-brand-accent"
                  : "text-slate-700 hover:text-brand-accent"
              )}
              dangerouslySetInnerHTML={{ __html: item.label }}
            />
          ))}
        </div>

        {/* Кнопка Call us справа (всегда видна) */}
        <a
          href={`tel:${phone}`}
          className="ml-3 rounded-full bg-sky-500 px-6 py-2 text-xs md:text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400 transition-colors"
        >
          Call us
        </a>
      </nav>

      {/* Мобильное меню под шапкой */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-800">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-1 text-center",
                  pathname === item.href
                    ? "text-brand-accent"
                    : "text-slate-700"
                )}
              >
                {item.label.replace(/<br>/g, " ")}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
