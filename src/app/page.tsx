import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import EmailCapture from "@/components/EmailCapture";
import Marquee from "@/components/Marquee";
import HeroVideo from "@/components/HeroVideo";
import { CountUp } from "@/components/Motion";
import { Faq, FinalCta, PriceCards, SectionTitle, ServiceList, Steps } from "@/components/Sections";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      {/* 1. Hero — видео на цял екран */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-950 text-white">
        {/* Видеото е 16:9 с кадър 4:3 в средата: размерът е сметнат така, че кадърът да покрие екрана без страничните ленти */}
        <HeroVideo
          className="hero-video absolute top-1/2 left-1/2 h-auto w-[max(133.34vw,177.78svh)] max-w-none"
          src="/media/hero.mp4"
          poster="/media/kss.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/25 to-transparent" />

        <div className="container-x relative pt-32 pb-14 sm:pb-20">
          <p className="fade-up inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase backdrop-blur">
            <span>София</span>
            <span className="text-accent">·</span>
            <span>КСС и актове</span>
            <span className="text-accent">·</span>
            <span>Оферта до 2 часа</span>
          </p>

          <h1 className="display mt-6 max-w-5xl text-[2.3rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <span className="rise"><span style={d(0)}>КСС, актове и оферти</span></span>
            <span className="rise"><span style={d(1)}>за вашата фирма&nbsp;—</span></span>
            <span className="rise"><span style={d(2)}><em className="text-accent">готови до 48 часа.</em></span></span>
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="fade-up max-w-xl text-lg text-white/75 sm:text-xl" style={d(4)}>
              Вие строите. Ние правим документите. Изпратете количествена сметка или чертеж и получавате оферта за 2 часа.
            </p>
            <div className="fade-up flex flex-col gap-3 sm:flex-row" style={d(5)}>
              <a href="#zapitvane" className="btn-primary text-lg">
                Изпрати запитване <span className="btn-arrow">→</span>
              </a>
              <a href={site.phoneTel} className="btn-ghost text-lg">
                <Icon name="phone" className="h-5 w-5 text-accent" /> {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="fade-up mt-12 hidden items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/50 uppercase sm:flex" style={d(7)}>
            <span className="scroll-cue">↓</span> Реална КСС от наш обект · данните на фирмите са скрити
          </div>
        </div>
      </section>

      {/* Лента */}
      <div className="border-b border-navy-900/10 bg-accent py-5 text-white">
        <Marquee
          items={["КСС", "Акт 12", "Акт 14", "Акт 19", "Акт 15", "Обществени поръчки", "Документален офис", "Корекции безплатно"]}
          className="display text-2xl sm:text-3xl"
          separator="—"
        />
      </div>

      {/* 2. Болката */}
      <section className="section bg-paper">
        <div className="container-x">
          <p className="kicker text-graphite-600" data-reveal>Познато ли ви е?</p>
          <div className="mt-8 grid gap-6">
            {["Три дни в Excel за една КСС.", "Акт 19 в неделя вечер.", "Липсващ документ седмица преди Акт 15."].map((t, i) => (
              <p key={t} data-reveal style={d(i)} className="display text-4xl text-navy-900/85 sm:text-6xl lg:text-7xl">
                <span className="strike">{t}</span>
              </p>
            ))}
          </div>
          <p data-reveal style={d(3)} className="mt-12 max-w-xl text-xl text-graphite-600">
            Това го задраскваме ние. <b className="text-navy-900">Вие оставате на обекта.</b>
          </p>
        </div>
      </section>

      {/* 3. Какво правим */}
      <section className="section bg-cream">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle kicker="Какво правим" title={<>Четири услуги. <em>Една цел</em> — да не губите време.</>} />
          </div>
          <div className="mt-14">
            <ServiceList />
          </div>
        </div>
      </section>

      {/* 4. Как работи */}
      <section className="section bg-navy-900 text-white">
        <div className="container-x">
          <SectionTitle light kicker="Как работи" title={<>Три стъпки. <em>Без срещи.</em></>} />
          <div className="mt-16">
            <Steps />
          </div>
        </div>
      </section>

      {/* 5. Защо нас */}
      <section className="section bg-paper">
        <div className="container-x">
          <SectionTitle
            kicker="Защо нас, а не софтуер"
            title={<>Софтуерът ви дава празна таблица. <em className="text-accent">Ние — готов документ.</em></>}
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <div data-reveal className="rounded-3xl border border-navy-900/15 p-8 sm:p-10">
              <p className="kicker text-graphite-600">Софтуер</p>
              <ul className="mt-6 grid gap-4 text-lg text-graphite-600">
                {["Вие въвеждате всичко сами", "Абонамент, обучение, настройки", "Грешката е ваша отговорност", "Вечерите пак отиват за документи"].map((t) => (
                  <li key={t} className="flex gap-3"><span className="text-graphite-600/60">✕</span>{t}</li>
                ))}
              </ul>
            </div>
            <div data-reveal style={d(1)} className="rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
              <p className="kicker text-accent">{site.name}</p>
              <ul className="mt-6 grid gap-4 text-lg">
                {["Вие пращате файл — получавате готово", "Плащате само за свършена работа", "Проверяваме количества и цени вместо вас", "Вие сте на обекта, не пред компютъра"].map((t) => (
                  <li key={t} className="flex gap-3"><Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Казус */}
      <section className="section bg-navy-950 text-white">
        <div className="container-x">
          <SectionTitle light kicker="Казус · кв. Малинова долина" title={<>КСС за 31 часа. <em className="text-accent">Поръчката — спечелена.</em></>} />
          <dl className="mt-14 grid grid-cols-3 border-y border-white/15">
            {[
              { v: 640, s: " м²", l: "РЗП на обекта" },
              { v: 180, s: "", l: "позиции в КСС" },
              { v: 31, s: " ч", l: "до готов документ" },
            ].map((x, i) => (
              <div key={x.l} data-reveal style={d(i)} className="border-white/15 py-8 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:py-12 sm:[&:not(:first-child)]:pl-8">
                <dt className="display text-4xl text-accent sm:text-7xl lg:text-8xl">
                  <CountUp to={x.v} suffix={x.s} />
                </dt>
                <dd className="mt-2 text-sm text-white/60 sm:text-base">{x.l}</dd>
              </div>
            ))}
          </dl>
          <figure data-reveal className="mt-14 max-w-3xl">
            <blockquote className="display text-2xl leading-snug italic sm:text-4xl">
              „Имахме два дни до срока за подаване. Пратих чертежите в петък вечер, в неделя сутрин КСС беше в пощата ми.
              Спечелихме обекта.“
            </blockquote>
            {/* TODO: заменете с истинско име и фирма (с писмено разрешение) */}
            <figcaption className="mt-6 text-white/55">— [Име Фамилия], управител, [Строителна фирма]</figcaption>
          </figure>
        </div>
      </section>

      {/* 7. Кои сме ние */}
      <section className="section bg-cream">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle kicker="Кои сме ние" title={<>Над <em className="text-accent">40 КСС</em> и над <em className="text-accent">200 акта</em> за софийски изпълнители.</>} />
            <p data-reveal className="mt-6 max-w-lg text-lg text-graphite-600">
              Познаваме Наредба №3 и начина, по който гледат технически контрол и инвеститорите. Документът минава от първия път.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-2 gap-4">
              {/* TODO: заменете с реални снимки (public/media/team-1.jpg, team-2.jpg) */}
              {["[Име] — КСС и оферти", "[Име] — Актове и документация"].map((n, i) => (
                <div key={n} data-reveal style={d(i)}>
                  <div className="grid aspect-[4/5] place-items-center rounded-3xl bg-sand text-sm text-graphite-600">Снимка</div>
                  <p className="mt-3 font-bold">{n}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem]">
            <Image
              data-reveal="scale"
              src="/media/aktove.jpg"
              alt="Папка с подредени актове 12, 14, 19 и 15"
              width={1200}
              height={896}
              className="aspect-[4/5] w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 8. Цени */}
      <section className="section bg-paper">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle kicker="Цени" title={<>Цената е ясна <em>преди</em> да започнем.</>} />
            <Link href="/ceni" data-reveal className="group flex shrink-0 items-center gap-2 text-lg font-bold whitespace-nowrap text-accent">
              Всички цени <span className="btn-arrow">→</span>
            </Link>
          </div>
          <div className="mt-14">
            <PriceCards />
          </div>
        </div>
      </section>

      {/* 9. Безплатно */}
      <section className="bg-paper pb-[clamp(72px,10vw,140px)]">
        <div className="container-x">
          <div data-reveal className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-accent p-8 text-white sm:p-14 lg:grid-cols-2">
            <div className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
            <div className="relative">
              <p className="kicker text-white/80">Безплатно</p>
              <h2 className="display mt-4 text-4xl sm:text-5xl">Чеклист: всички документи за папка <em>Акт 15</em></h2>
              <p className="mt-4 text-white/85">Една страница. Отметнете и вижте какво липсва — преди да дойде комисията.</p>
            </div>
            <div className="relative [&_.btn-primary]:bg-navy-900 [&_.btn-primary:hover]:bg-navy-950">
              <EmailCapture resource="checklist-akt-15" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionTitle kicker="Въпроси" title={<>Често <em>питат</em></>} />
          <Faq />
        </div>
      </section>

      {/* 11. Финален CTA + форма */}
      <FinalCta />
    </>
  );
}
