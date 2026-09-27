export const site = {
  name: "Stroydocs",
  city: "София",
  phoneDisplay: "0884 782 777",
  phoneE164: "+359884782777",
  phoneHref: "tel:+359884782777",
  viberHref: "viber://chat?number=%2B359884782777",
  whatsappHref: "https://wa.me/359884782777",
  // TODO: replace with the real mailbox
  email: "office@stroydocs.bg",
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

export const services = [
  {
    title: "КСС и оферти",
    icon: "fa-solid fa-calculator",
    preview: "КСС",
    tag: "Количествено-стойностни сметки",
    text: "КСС по вашите чертежи или количествена сметка — готова за подаване към инвеститора.",
    price: "от 180 €",
  },
  {
    title: "Актове по Наредба №3",
    icon: "fa-solid fa-stamp",
    preview: "Акт № 19",
    tag: "Актове 12, 14, 19, 15",
    text: "Попълнени, проверени и подредени в папка — готови за подпис на обекта.",
    price: "в пакет от 350 €",
  },
  {
    title: "Документален офис",
    icon: "fa-solid fa-folder-open",
    preview: "Папка обект",
    tag: "Месечен абонамент",
    text: "Цялата документация по обектите ви всеки месец — без да наемате служител.",
    price: "от 350 € / мес.",
  },
  {
    title: "Обществени поръчки",
    icon: "fa-solid fa-landmark",
    preview: "Техническо предложение",
    tag: "Тръжни процедури",
    text: "Техническо предложение, КСС и пълният пакет документи за участие в търг.",
    price: "от 400 €",
  },
];

export const steps = [
  { title: "Изпращате файл", text: "Количествена сметка, чертежи (PDF или DWG) или снимки от обекта — през формата, Viber или имейл." },
  { title: "Оферта до 2 часа", text: "Точна цена и срок. Без изненади след това." },
  { title: "Готово до 48 часа", text: "Готовият документ в Excel и PDF. Корекциите са безплатни, докато не е точно." },
];

/**
 * Base rates by gross floor area (РЗП). The scale is descending: the rate of the
 * bracket the whole area falls into applies to every m², with a minimum per order.
 */
export const pricingTiers = [
  { label: "до 150 м²", max: 150, kss: 2.5, full: 5.0 },
  { label: "151–400 м²", max: 400, kss: 2.0, full: 4.2 },
  { label: "401–800 м²", max: 800, kss: 1.6, full: 3.5 },
  { label: "801–1500 м²", max: 1500, kss: 1.3, full: 2.9 },
  { label: "над 1500 м²", max: Infinity, kss: 1.0, full: 2.3 },
];
export const pricingMin = { kss: 180, full: 350 };

export const pricingExamples = [
  { label: "Апартамент", area: 90 },
  { label: "Къща", area: 280 },
  { label: "Жилищна сграда", area: 640 },
  { label: "Хале", area: 2200 },
];

export const otherPrices = [
  { item: "Оферта за търг", note: "КСС + техническо предложение", price: "от 400 €" },
  { item: "Акт 19 (отделно)", note: "Месечно отчитане на изпълнени СМР", price: "от 60 €" },
  { item: "Документален офис", note: "Всички документи по до 3 активни обекта", price: "от 350 € / мес." },
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
    q: "Подписвате ли актовете?",
    a: "Не. Ние ги подготвяме напълно готови, подписват ги участниците в строителството — точно както изисква Наредба №3.",
  },
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
