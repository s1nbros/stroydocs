import type { Metadata } from "next";
import { FinalCta, PageHero, PriceTable } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Цени",
  description: "Цени за изготвяне на КСС, актове по Наредба №3, документален офис и документи за обществени поръчки.",
};

export default function PricesPage() {
  return (
    <>
      <PageHero kicker="Цени" title="Цената е ясна преди да започнем" sub="Точната цена зависи от обема. Изпратете файла и до 2 часа знаете колко струва и кога е готово." />
      <section className="section">
        <div className="container-x">
          <PriceTable />
          <p className="mt-6 text-graphite-600">Цените са без ДДС. Корекциите по същия обект са безплатни.</p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
