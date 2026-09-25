import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Изпратете запитване за КСС или актове. Телефон, Viber и WhatsApp. Отговаряме до 2 часа в работен ден.",
};

export default function ContactPage() {
  const ways = [
    { icon: "phone", t: "Телефон", v: site.phoneDisplay, href: site.phoneTel },
    { icon: "chat", t: "Viber", v: site.phoneDisplay, href: site.viber },
    { icon: "chat", t: "WhatsApp", v: site.phoneDisplay, href: site.whatsapp },
    { icon: "file", t: "Имейл", v: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <section className="bg-navy-900 pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <p className="kicker text-accent">Контакти</p>
          <h1 className="mt-3 display text-5xl sm:text-6xl lg:text-7xl">Изпратете запитване</h1>
          <p className="mt-4 text-lg text-white/70">Отговаряме до 2 часа в работен ден. Понеделник – петък, 8:00 – 18:00.</p>
          <div className="mt-8 grid gap-3">
            {ways.map((w) => (
              <a key={w.t} href={w.href} className="flex items-center gap-4 rounded-xl bg-white/5 p-4 hover:bg-white/10">
                <Icon name={w.icon} className="h-6 w-6 text-accent" />
                <span>
                  <span className="block text-sm text-white/60">{w.t}</span>
                  <span className="text-lg font-bold">{w.v}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div id="zapitvane" className="scroll-mt-20 text-navy-900">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
