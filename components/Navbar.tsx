// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur transition-colors duration-300",
        scrolled
          ? "bg-white/80 border-slate-200" // Более плотный белый при скролле
          : "bg-white/80 border-slate-200/50" // Прозрачный белый вверху
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* логотип слева - увеличили размер */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 min-w-[3rem] md:h-14 md:w-14">
            <img
              src="/armmax-logo.png"
              alt="ARMMAX logo"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        {/* навигация по центру */}
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

        {/* большая кнопка Call us справа */}
        <a
          href={`tel:${phone}`}
          className="ml-4 rounded-full bg-sky-500 px-7 py-3 text-sm md:text-base font-semibold text-slate-950 shadow-sm hover:bg-sky-400 transition-colors"
        >
          Call us
        </a>
      </nav>
    </header>
  );
}