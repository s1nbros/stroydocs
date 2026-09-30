export const site = {
  name: "Stroydocs",
  city: "София",
  phoneDisplay: "0884 782 777",
  phoneE164: "+359884782777",
  phoneHref: "tel:+359884782777",
  // Opens a Viber chat with the number (international format, "+" encoded as %2B)
  viberHref: "viber://chat?number=%2B359884782777",
  whatsappHref: "https://wa.me/359884782777",
  // TODO: create this mailbox on stroydocs.net (or replace with the address you use)
  email: "office@stroydocs.net",
  title: "КСС, актове и оферти за строителни фирми — готови до 48 часа | Stroydocs",
  description:
    "Изготвяне на КСС, актове по Наредба №3, оферти и документи за обществени поръчки за строителни фирми в София. Изпращате файл — оферта до 2 часа, готов документ до 48 часа.",
};

/**
 * FORMSPREE ENDPOINT — PLACEHOLDER
 * Create a form at https://formspree.io and replace YOUR_FORM_ID below.
 * Until then the forms show a "call us instead" message on submit.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export const nav = [
  { href: "#top", label: "Начало" },
  { href: "#services", label: "Услуги" },
  { href: "#pricing", label: "Цени" },
  { href: "#contact", label: "Контакти" },
];

// icon = Font Awesome class
export const heroStats = [
  { icon: "fa-regular fa-clock", target: 2, suffix: " ч", decimals: 0, label: "Оферта" },
  { icon: "fa-solid fa-file-circle-check", target: 48, suffix: " ч", decimals: 0, label: "Готов документ" },
  { icon: "fa-solid fa-stamp", target: 200, suffix: "+", decimals: 0, label: "Изготвени акта" },
  { icon: "fa-solid fa-calculator", target: 40, suffix: "+", decimals: 0, label: "Изготвени КСС" },
];

/** Minimum order (raised +50% after the market check, Sept 2026). Also the "от" prices in the services list. */
export const pricingMin = { kss: 270, full: 525 };

export const services = [
  {
    title: "КСС и оферти",
    icon: "fa-solid fa-calculator",
    preview: "КСС",
    tag: "Количествено-стойностни сметки",
    text: "КСС по вашите чертежи или количествена сметка — готова за подаване към инвеститора.",
    price: `от ${pricingMin.kss} €`,
  },
  {
    title: "Актове по Наредба №3",
    icon: "fa-solid fa-stamp",
    preview: "Акт № 19",
    tag: "Актове 12, 14, 19, 15",
    text: "Попълнени, проверени и подредени в папка — готови за подпис на обекта.",
    price: `в пакет от ${pricingMin.full} €`,
  },
  {
    title: "Документален офис",
    icon: "fa-solid fa-folder-open",
    preview: "Папка обект",
    tag: "Месечен абонамент",
    text: "Цялата документация по обектите ви всеки месец — без да наемате служител.",
    price: "от 525 € / мес.",
  },
  {
    title: "Обществени поръчки",
    icon: "fa-solid fa-landmark",
    preview: "Техническо предложение",
    tag: "Тръжни процедури",
    text: "Техническо предложение, КСС и пълният пакет документи за участие в търг.",
    price: "от 600 €",
  },
];

export const steps = [
  { title: "Изпращате файл", text: "Количествена сметка, чертежи (PDF или DWG) или снимки от обекта — през формата, Viber или имейл." },
  { title: "Оферта до 2 часа", text: "Точна цена и срок. Без изненади след това." },
  { title: "Готово до 48 часа", text: "Готовият документ в Excel и PDF. Корекциите са безплатни, докато не е точно." },
];

/**
 * Progressive scale by gross floor area (РЗП), like tax brackets: each band of m² is charged at its own
 * rate (the first 150 m² at the first rate, the next 250 m² at the second, …). The total therefore always
 * grows with the area and there is no jump at the band limits. A minimum per order applies.
 */
export const pricingTiers = [
  { label: "първите 150 м²", upTo: 150, kss: 2.5, full: 5.0 },
  { label: "от 151 до 400 м²", upTo: 400, kss: 2.0, full: 4.2 },
  { label: "от 401 до 800 м²", upTo: 800, kss: 1.6, full: 3.5 },
  { label: "от 801 до 1500 м²", upTo: 1500, kss: 1.3, full: 2.9 },
  { label: "над 1500 м²", upTo: Infinity, kss: 1.0, full: 2.3 },
];

/** Complexity coefficient by type of project (applied to the scale price). */
export const pricingKinds = [
  { id: "new", label: "Ново строителство", k: 1.0 },
  { id: "renovation", label: "Ремонт", k: 1.3 },
  { id: "interior", label: "Интериор", k: 1.5 },
  { id: "tender", label: "Обществена поръчка", k: 1.4 },
];

export const pricingExamples = [
  { label: "Апартамент", area: 90 },
  { label: "Къща", area: 280 },
  { label: "Жилищна сграда", area: 640 },
  { label: "Хале", area: 2200 },
];

/** Indicative price for an area and a complexity coefficient. Single source for the page and the calculator. */
export function quote(area: number, k = 1) {
  const sum = (col: "kss" | "full") => {
    let total = 0;
    let from = 0;
    for (const t of pricingTiers) {
      const band = Math.min(area, t.upTo) - from;
      if (band <= 0) break;
      total += band * t[col];
      from = t.upTo;
    }
    return total * k;
  };
  const kss = Math.max(pricingMin.kss, sum("kss"));
  const full = Math.max(pricingMin.full, sum("full"));
  const tier = pricingTiers.findIndex((t) => area <= t.upTo);
  return { kss, full, tier, avgKss: kss / area, avgFull: full / area };
}

export const otherPrices = [
  { item: "Оферта за търг", note: "КСС + техническо предложение", price: "от 600 €" },
  { item: "Акт 19 (отделно)", note: "Месечно отчитане на изпълнени СМР", price: "от 90 €" },
  { item: "Документален офис", note: "Всички документи по до 3 активни обекта", price: "от 525 € / мес." },
];

export const projectTypes = [
  "Жилищна сграда",
  "Еднофамилна къща",
  "Ремонт / вътрешни работи",
  "Промишлен / складов обект",
  "Инфраструктура",
  "Обществена поръчка",
  "Друго",
];

export const faq = [
  {
    q: "Какво трябва да изпратя за КСС?",
    a: "Количествена сметка, чертежи (PDF или DWG) или дори снимки от обекта. Ако нещо липсва, ще ви се обадим — не е нужно да подготвяте нищо специално.",
  },
  {
    q: "Наистина ли е толкова бързо?",
    a: "Цена — до 2 часа в работен ден. Готов документ — до 48 часа за стандартен обем. За големи обекти уговаряме срока предварително.",
  },
  {
    q: "Ами ако има грешка или промяна?",
    a: "Корекциите са безплатни. Ако инвеститорът промени количествата, преработваме КСС без доплащане в рамките на същия обект.",
  },
  {
    q: "По какви единични цени смятате?",
    a: "По вашите, ако имате такива — иначе по актуални пазарни цени за София. Винаги виждате разбивката и можете да я коригирате.",
  },
  {
    q: "Работите ли извън София?",
    a: "Да. Всичко става по имейл и Viber, така че обектът може да е навсякъде в България.",
  },
];
