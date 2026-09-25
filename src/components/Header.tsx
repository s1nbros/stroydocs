"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import Icon from "./Icon";

const nav = [
  { href: "/uslugi/kss", label: "КСС" },
  { href: "/uslugi/aktove", label: "Актове" },
  { href: "/uslugi/dokumentalen-ofis", label: "Документален офис" },
  { href: "/ceni", label: "Цени" },
  { href: "/shabloni", label: "Образци" },
  { href: "/kontakti", label: "Контакти" },
];

export function Logo() {
  return (
    <span className="flex items-baseline gap-0.5 font-serif text-2xl font-semibold tracking-tight">
      Стройдокс<span className="text-accent">.</span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-white transition-all duration-500 ${
        scrolled || open ? "bg-navy-950/85 py-3 shadow-lg shadow-black/10 backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <Link href="/" aria-label="Стройдокс — начало">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`group relative py-1 transition-colors ${pathname === n.href ? "text-white" : "text-white/70 hover:text-white"}`}
            >
              {n.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                  pathname === n.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneTel}
            className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-bold transition hover:bg-white hover:text-navy-900 sm:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-accent" />
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Меню"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/25 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-white transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-white transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Мобилно меню */}
      <div className={`grid transition-all duration-500 lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <nav className="container-x overflow-hidden">
          <div className="flex flex-col py-4">
            {nav.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-serif text-2xl"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {n.label}
              </Link>
            ))}
            <a href={site.phoneTel} className="btn-primary mt-6">
              <Icon name="phone" className="h-5 w-5" /> Обади се: {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
