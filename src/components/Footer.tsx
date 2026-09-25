import Link from "next/link";
import { site } from "@/lib/site";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <a href="/kontakti" className="block border-y border-white/10 py-8 transition-colors hover:bg-accent">
        <Marquee
          items={["Изпратете файла", "Оферта до 2 часа", "Готово до 48 часа"]}
          className="display text-4xl sm:text-6xl"
          speed="28s"
        />
      </a>
      <div className="container-x grid gap-10 py-14 text-sm text-white/60 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl font-semibold text-white">
            Стройдокс<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs">КСС, актове и документация за строителни фирми. {site.city}.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="kicker mb-2 text-white/40">Услуги</p>
          <Link href="/uslugi/kss" className="hover:text-white">КСС и оферти</Link>
          <Link href="/uslugi/aktove" className="hover:text-white">Актове по Наредба №3</Link>
          <Link href="/uslugi/dokumentalen-ofis" className="hover:text-white">Документален офис</Link>
          <Link href="/ceni" className="hover:text-white">Цени</Link>
          <Link href="/shabloni" className="hover:text-white">Безплатни образци</Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="kicker mb-2 text-white/40">Връзка</p>
          <a href={site.phoneTel} className="text-lg font-bold text-white">{site.phoneDisplay}</a>
          <a href={site.viber} className="hover:text-white">Viber</a>
          <a href={site.whatsapp} className="hover:text-white">WhatsApp</a>
          <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
        </div>
      </div>
      <p className="container-x border-t border-white/10 py-6 text-xs text-white/40">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
