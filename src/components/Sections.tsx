import Link from "next/link";
import { faq, services, site } from "@/lib/site";
import Icon from "./Icon";
import InquiryForm from "./InquiryForm";

export function SectionTitle({
  kicker,
  title,
  sub,
  light = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl" data-reveal>
      {kicker && <p className={`kicker ${light ? "text-accent" : "text-accent"}`}>{kicker}</p>}
      <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {sub && <p className={`mt-5 max-w-xl text-lg ${light ? "text-white/65" : "text-graphite-600"}`}>{sub}</p>}
    </div>
  );
}

/** Номериран редакционен списък с услугите — ред се запълва при hover. */
export function ServiceList() {
  return (
    <div className="border-t border-navy-900/15">
      {services.map((s, i) => (
        <Link
          key={s.title}
          href={s.href}
          data-reveal
          style={{ "--d": i } as React.CSSProperties}
          className="service-row group relative block overflow-hidden border-b border-navy-900/15"
        >
          <span className="service-fill absolute inset-0 bg-navy-900" />
          <span className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 py-7 transition-colors duration-500 group-hover:text-white sm:grid-cols-[4rem_1fr_1.1fr_auto] sm:px-4 sm:py-9">
            <span className="font-serif text-lg italic text-accent">0{i + 1}</span>
            <span className="display text-3xl sm:text-4xl">{s.title}</span>
            <span className="col-span-2 text-graphite-600 transition-colors duration-500 group-hover:text-white/70 sm:col-span-1">
              {s.text}
            </span>
            <span className="col-span-2 flex items-center gap-3 text-xl font-extrabold sm:col-span-1">
              {s.price}
              <span className="btn-arrow text-accent">→</span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Steps() {
  const steps = [
    { t: "Изпращате файл", d: "Количествена сметка, чертеж или снимки — по формата, Viber или имейл." },
    { t: "Оферта до 2 часа", d: "Точна цена и срок. Без изненади след това." },
    { t: "Готово до 48 часа", d: "Корекции — безплатно, докато не е точно както трябва." },
  ];
  return (
    <div data-reveal className="relative">
      <div className="absolute top-5 right-0 left-0 hidden h-px bg-white/15 md:block">
        <div className="progress-line h-full bg-accent" />
      </div>
      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.t} className="relative">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-accent font-bold text-white ring-8 ring-navy-900">
              {i + 1}
            </span>
            <h3 className="display mt-6 text-3xl">{s.t}</h3>
            <p className="mt-3 text-white/65">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const priceRows = [
  { s: "КСС до 50 позиции", p: "150 €", n: "Малки ремонти, еднофамилни къщи" },
  { s: "КСС до 200 позиции", p: "от 300 €", n: "Жилищни сгради, търговски обекти" },
  { s: "Оферта за търг", p: "от 400 €", n: "КСС + техническо предложение" },
  { s: "Актове по Наредба №3", p: "от 300 €", n: "Пакет за обект: 12, 14, 19, 15 и протоколи" },
  { s: "Акт 19 (отделно)", p: "от 60 €", n: "Месечно отчитане на СМР" },
  { s: "Документален офис", p: "от 350 € / мес.", n: "Всички документи по до 3 обекта" },
];

export function PriceCards() {
  const featured = [priceRows[0], priceRows[3], priceRows[5]];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {featured.map((r, i) => (
        <div
          key={r.s}
          data-reveal
          style={{ "--d": i } as React.CSSProperties}
          className={`flex flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 ${
            i === 2 ? "bg-navy-900 text-white" : "bg-cream"
          }`}
        >
          <p className={`text-sm font-bold ${i === 2 ? "text-accent" : "text-graphite-600"}`}>{r.n}</p>
          <p className="display mt-4 text-3xl">{r.s}</p>
          <p className="display mt-auto pt-10 text-4xl text-accent lg:text-5xl">{r.p}</p>
        </div>
      ))}
    </div>
  );
}

export function PriceTable() {
  return (
    <div className="border-t border-navy-900/15">
      {priceRows.map((r, i) => (
        <div
          key={r.s}
          data-reveal
          style={{ "--d": i } as React.CSSProperties}
          className="flex flex-col gap-1 border-b border-navy-900/15 py-6 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <div>
            <p className="display text-2xl sm:text-3xl">{r.s}</p>
            <p className="mt-1 text-graphite-600">{r.n}</p>
          </div>
          <p className="display shrink-0 text-3xl text-accent">{r.p}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <div className="border-t border-navy-900/15" data-reveal>
      {faq.map((f, i) => (
        <details key={f.q} className="group border-b border-navy-900/15 py-6">
          <summary className="flex cursor-pointer items-baseline gap-5 text-xl font-bold sm:text-2xl">
            <span className="font-serif text-base italic text-accent">0{i + 1}</span>
            <span className="flex-1">{f.q}</span>
            <span className="faq-plus text-3xl font-light text-accent">+</span>
          </summary>
          <p className="faq-body mt-4 max-w-2xl pl-10 text-lg text-graphite-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FinalCta({ title }: { title?: React.ReactNode }) {
  return (
    <section id="zapitvane" className="section scroll-mt-16 bg-navy-900 text-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div data-reveal>
          <p className="kicker text-accent">Запитване</p>
          <h2 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">
            {title ?? (
              <>
                Изпратете файла.
                <br />
                <em className="text-accent">Цената е до 2 часа.</em>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/65">
            Четири полета. Без регистрация. Ако ви е по-лесно — просто се обадете или пишете във Viber.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={site.phoneTel} className="btn-ghost">
              <Icon name="phone" className="h-5 w-5 text-accent" /> {site.phoneDisplay}
            </a>
            <a href={site.viber} className="btn-ghost">
              <Icon name="chat" className="h-5 w-5 text-accent" /> Пиши във Viber
            </a>
          </div>
        </div>
        <div className="text-navy-900" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

export function PageHero({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-accent/15 blur-3xl" />
      <div className="container-x relative">
        <p className="kicker fade-up text-accent">{kicker}</p>
        <h1 className="display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
          <span className="rise">
            <span>{title}</span>
          </span>
        </h1>
        <p className="fade-up mt-6 max-w-2xl text-lg text-white/65" style={{ "--d": 3 } as React.CSSProperties}>
          {sub}
        </p>
        <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--d": 4 } as React.CSSProperties}>
          <a href="#zapitvane" className="btn-primary">
            Изпрати запитване <span className="btn-arrow">→</span>
          </a>
          <a href={site.phoneTel} className="btn-ghost">
            Обади се: {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <li
          key={it}
          data-reveal
          style={{ "--d": i } as React.CSSProperties}
          className="flex gap-3 rounded-2xl bg-cream p-5"
        >
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
