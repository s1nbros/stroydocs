import type { Metadata } from "next";
import EmailCapture from "@/components/EmailCapture";
import Icon from "@/components/Icon";
import { FinalCta } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Безплатни образци — КСС, актове, чеклист Акт 15",
  description: "Безплатни образци на КСС, Акт 19 и чеклист за папка Акт 15. Изпращаме ги на имейл.",
};

const templates = [
  { id: "checklist-akt-15", t: "Чеклист: папка за Акт 15", d: "Всички документи, които комисията ще поиска — на една страница." },
  { id: "obrazec-kss", t: "Образец на КСС (Excel)", d: "Структура с формули, готова за попълване." },
  { id: "obrazec-akt-19", t: "Образец на Акт 19", d: "Попълнен пример с коментари къде се греши най-често." },
];

export default function TemplatesPage() {
  return (
    <>
      <section className="bg-navy-900 pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
        <div className="container-x">
          <p className="kicker text-accent">Безплатно</p>
          <h1 className="mt-3 max-w-3xl display text-5xl sm:text-6xl lg:text-7xl">Безплатни образци за строители</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">Оставете имейл — изпращаме файла веднага.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-4">
          {templates.map((x) => (
            <div key={x.id} className="grid items-center gap-5 rounded-3xl bg-cream p-6 sm:p-8 lg:grid-cols-[auto_1fr_1.2fr]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-accent">
                <Icon name="file" />
              </span>
              <div>
                <h2 className="display text-2xl">{x.t}</h2>
                <p className="text-graphite-600">{x.d}</p>
              </div>
              <EmailCapture resource={x.id} />
            </div>
          ))}
        </div>
      </section>
      <FinalCta title="Не искате да го попълвате сами? Ние ще го направим." />
    </>
  );
}
