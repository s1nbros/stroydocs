import type { Metadata } from "next";
import Image from "next/image";
import { Checklist, FinalCta, PageHero, SectionTitle } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Актове по Наредба №3 — от 300 € / обект",
  description: "Подготовка на Акт 12, Акт 14, Акт 19 и Акт 15 по Наредба №3. Готови за подпис, подредени в папка.",
};

const acts = [
  ["Акт 12", "Установяване на СМР, които са закрити и чиито количества не могат да бъдат установени по-късно."],
  ["Акт 14", "Приемане на конструкцията."],
  ["Акт 19", "Установяване на завършени СМР и изплащане — ежемесечно."],
  ["Акт 15", "Установяване годността за приемане на строежа. Събираме цялата папка."],
];

export default function AktovePage() {
  return (
    <>
      <PageHero
        kicker="Актове по Наредба №3 · от 300 € / обект"
        title="Актовете — готови за подпис, не в неделя вечер"
        sub="Попълваме, подреждаме и следим кой акт кога трябва. Вие само подписвате на обекта."
      />
      <section className="section">
        <div className="container-x grid gap-4 sm:grid-cols-2">
          {acts.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-cream p-8" data-reveal>
              <p className="display text-4xl text-accent">{t}</p>
              <p className="mt-2 text-graphite-600">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Image src="/media/aktove.jpg" alt="Подредена папка с актове" width={1200} height={896} className="rounded-[2rem]" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <SectionTitle title="Важно: ние не подписваме актовете" sub="Подготвяме ги напълно готови. Подписват ги участниците в строителството — както изисква Наредба №3." />
            <div className="mt-8">
              <Checklist items={["Попълнени по данни от обекта", "Подредени в папка за Акт 15", "Напомняне кога идва следващият акт", "Корекции без доплащане"]} />
            </div>
          </div>
        </div>
      </section>
      <FinalCta title="Кажете ни обекта — ще ви кажем кои актове липсват." />
    </>
  );
}
