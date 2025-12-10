// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/painting", label: "Interior painting" },
  { href: "/furniture-assembly", label: "Furniture assembly" },
  { href: "/gazebo-installation", label: "Gazebo installation" },
  { href: "/handyman-services", label: "TV & art mounting" },
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
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300",
        "bg-white/90 border-slate-200"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Левая часть: бургер + логотип */}
        <div className="flex items-center gap-3 md:gap-4 md:mr-6">
          {/* Бургер только на мобиле */}
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

          {/* Логотип — крупнее */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12 md:h-16 md:w-16">
              <img
                src="/armmax-logo.png"
                alt="ARMMAX logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="hidden text-sm font-semibold tracking-[0.2em] text-slate-800 md:inline">
                           
            </span>
          </Link>
        </div>

        {/* Десктоп-навигация по центру */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex flex-col items-center text-[11px] font-semibold uppercase tracking-[0.2em]",
                      active
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "mt-1 h-[2px] w-0 rounded-full bg-sky-500 transition-all",
                        active && "w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Кнопка Call us справа */}
        <a
          href={`tel:${phone}`}
          className="ml-3 rounded-full bg-sky-500 px-6 py-2 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-sky-400 transition-colors"
        >
          Call us
        </a>
      </nav>

      {/* Мобильное меню под шапкой */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-800">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "py-1 text-center",
                    active ? "text-brand-accent" : "text-slate-700"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
