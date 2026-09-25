import type { Metadata } from "next";
import Image from "next/image";
import { Checklist, FinalCta, PageHero, SectionTitle, Steps } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Изготвяне на КСС — от 150 €",
  description: "Количествено-стойностна сметка от чертеж или количествена сметка. Оферта до 2 часа, готова КСС до 48 часа.",
};

export default function KssPage() {
  return (
    <>
      <PageHero
        kicker="КСС и оферти · от 150 €"
        title="КСС за оферта или търг — готова до 48 часа"
        sub="Изпращате чертежи или количествена сметка. Получавате КСС в Excel и PDF, готова за подаване към инвеститор или възложител."
      />
      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title="Какво получавате" />
            <div className="mt-8">
              <Checklist
                items={[
                  "КСС в Excel — с формули, можете да я редактирате",
                  "PDF версия за подаване",
                  "Анализ на единичните цени при нужда",
                  "Разбивка по видове СМР",
                  "Проверка на количествата спрямо чертежите",
                  "Безплатни корекции по същия обект",
                ]}
              />
            </div>
          </div>
          <Image src="/media/kss.jpg" alt="Примерна КСС" width={1200} height={896} className="rounded-[2rem]" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container-x">
          <SectionTitle title="Как работи" />
          <div className="mt-8"><Steps /></div>
        </div>
      </section>
      <FinalCta title="Пратете чертежа — цената за КСС е до 2 часа." />
    </>
  );
}
