import type { Metadata } from "next";
import { Checklist, FinalCta, PageHero, SectionTitle } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Документален офис — месечен абонамент от 350 €",
  description: "Цялата строителна документация по вашите обекти всеки месец — без да наемате служител.",
};

export default function OfficePage() {
  return (
    <>
      <PageHero
        kicker="Документален офис · от 350 € / мес."
        title="Вашият документален отдел — без служител на заплата"
        sub="Един месечен абонамент покрива КСС, актове, Акт 19 и папките по вашите обекти. Един телефон, един човек, който знае всичко."
      />
      <section className="section">
        <div className="container-x">
          <SectionTitle title="Какво включва абонаментът" />
          <div className="mt-8">
            <Checklist
              items={[
                "До 3 активни обекта едновременно",
                "Ежемесечни Акт 19 и сметки",
                "Всички актове по Наредба №3",
                "КСС за допълнителни работи и анекси",
                "Подредена папка за Акт 15 по всеки обект",
                "Отговор във Viber в рамките на работния ден",
              ]}
            />
          </div>
          <div className="mt-10 rounded-2xl bg-navy-900 p-8 text-white">
            <p className="text-lg">
              Служител по документацията струва <b>над 1 500 € / месец</b> с осигуровките. Абонаментът започва от{" "}
              <b className="text-accent">350 €</b> и спира, когато спрат обектите.
            </p>
          </div>
        </div>
      </section>
      <FinalCta title="Колко обекта имате? Ще ви дадем цена до 2 часа." />
    </>
  );
}
