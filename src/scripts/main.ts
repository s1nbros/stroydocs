/**
 * Page behaviour: menu, scroll-spy, forms, pricing calculator, cursor spotlight.
 * All animation lives in motion.ts (GSAP).
 */
import { gsap } from "gsap";
import { FORMSPREE_ENDPOINT, pricingMin, pricingTiers, site } from "../data/site";
import "./motion";

const root = document.documentElement;
root.classList.add("js");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Mobile menu ---------- */

const burger = document.querySelector<HTMLButtonElement>(".burger");
const menu = document.querySelector<HTMLElement>(".mobile-menu");
const overlay = document.querySelector<HTMLElement>(".menu-overlay");

function setMenu(open: boolean) {
  if (!burger || !menu || !overlay) return;
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Затвори менюто" : "Отвори менюто");
  menu.hidden = !open;
  overlay.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  if (open) menu.querySelector("a")?.focus();
}

burger?.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
overlay?.addEventListener("click", () => setMenu(false));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && burger?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    burger.focus();
  }
});
addEventListener("resize", () => {
  if (innerWidth > 720) setMenu(false);
});

/* ---------- Scroll-spy for the nav ---------- */

const spyLinks = document.querySelectorAll<HTMLAnchorElement>("[data-spy]");
const spyTargets = [...new Set([...spyLinks].map((a) => a.dataset.spy!))]
  .map((id) => document.querySelector<HTMLElement>(id))
  .filter((el): el is HTMLElement => !!el);

function updateSpy() {
  const probe = innerHeight * 0.35;
  let current = spyTargets[0];
  for (const t of spyTargets) if (t.getBoundingClientRect().top <= probe) current = t;
  spyLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.spy === `#${current?.id}`));
  moveIndicator();
}

/* ---------- Sliding indicator behind the active / hovered nav link ---------- */

const navEl = document.querySelector<HTMLElement>("[data-nav]");
const indicator = navEl?.querySelector<HTMLElement>(".nav-indicator");
let hovered: HTMLElement | null = null;

function moveIndicator() {
  if (!navEl || !indicator) return;
  const target = hovered ?? navEl.querySelector<HTMLElement>("a.is-active");
  if (!target || !target.offsetWidth) return gsap.to(indicator, { opacity: 0, duration: 0.2 });
  gsap.to(indicator, {
    x: target.offsetLeft,
    width: target.offsetWidth,
    opacity: 1,
    duration: reduceMotion ? 0 : 0.45,
    ease: "power3.out",
    overwrite: true,
  });
}
navEl?.querySelectorAll<HTMLElement>("a").forEach((a) => {
  a.addEventListener("pointerenter", () => {
    hovered = a;
    moveIndicator();
  });
});
navEl?.addEventListener("pointerleave", () => {
  hovered = null;
  moveIndicator();
});
addEventListener("resize", moveIndicator);
document.fonts?.ready.then(moveIndicator);
addEventListener("scroll", updateSpy, { passive: true });
updateSpy();

/* ---------- Forms (Formspree) ---------- */

const isPlaceholder = FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

document.querySelectorAll<HTMLFormElement>("form[data-form]").forEach((form) => {
  const status = form.querySelector<HTMLElement>(".form-status");
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const say = (msg: string, ok: boolean) => {
    if (!status) return;
    status.textContent = msg;
    status.style.color = ok ? "" : "#ff8a80";
  };

  form.querySelector<HTMLInputElement>('input[type="file"]')?.addEventListener("change", (e) => {
    const input = e.target as HTMLInputElement;
    const label = form.querySelector(".file-name");
    if (label) label.textContent = input.files?.[0]?.name ?? "КСС, чертеж или снимка";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isPlaceholder) {
      say(`Формата още не е свързана — обадете се на ${site.phoneDisplay} или пишете във Viber.`, false);
      return;
    }
    submit?.setAttribute("disabled", "");
    say("Изпращане…", true);
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say("Благодарим! Ще ви отговорим до 2 часа в работен ден.", true);
    } catch {
      say(`Нещо се обърка. Обадете се на ${site.phoneDisplay} или пишете във Viber.`, false);
    } finally {
      submit?.removeAttribute("disabled");
    }
  });
});

/* ---------- Pricing calculator ---------- */

const eur = (n: number) => `${Math.round(n).toLocaleString("bg-BG")} €`;
const rate = (n: number) => `${n.toFixed(2).replace(".", ",")} €/м²`;

function quote(area: number) {
  const i = pricingTiers.findIndex((t) => area <= t.max);
  const t = pricingTiers[i];
  return { tier: i, t, kss: Math.max(pricingMin.kss, area * t.kss), full: Math.max(pricingMin.full, area * t.full) };
}

const calc = document.querySelector<HTMLElement>("[data-calc]");
if (calc) {
  const input = calc.querySelector<HTMLInputElement>("[data-calc-input]")!;
  const areaOut = calc.querySelector<HTMLElement>("[data-calc-area]")!;
  const kssOut = calc.querySelector<HTMLElement>("[data-calc-kss]")!;
  const fullOut = calc.querySelector<HTMLElement>("[data-calc-full]")!;
  const kssRate = calc.querySelector<HTMLElement>("[data-calc-kss-rate]")!;
  const fullRate = calc.querySelector<HTMLElement>("[data-calc-full-rate]")!;
  const rows = document.querySelectorAll<HTMLElement>("[data-tier]");
  const chips = calc.querySelectorAll<HTMLButtonElement>("[data-calc-set]");
  const shown = { kss: 0, full: 0 };

  // Tween the totals so they visibly count to the new value
  const tweenTo = (target: { kss: number; full: number }) => {
    gsap.to(shown, {
      ...target,
      duration: reduceMotion ? 0 : 0.45,
      ease: "power3.out",
      overwrite: true,
      onUpdate: () => {
        kssOut.textContent = eur(shown.kss);
        fullOut.textContent = eur(shown.full);
      },
    });
  };

  const update = () => {
    const area = Number(input.value);
    const q = quote(area);
    areaOut.textContent = `${area.toLocaleString("bg-BG")} м²`;
    kssRate.textContent = rate(q.t.kss);
    fullRate.textContent = rate(q.t.full);
    input.style.setProperty("--p", `${((area - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100}%`);
    rows.forEach((r) => r.classList.toggle("is-active", Number(r.dataset.tier) === q.tier));
    chips.forEach((c) => c.classList.toggle("is-active", Number(c.dataset.calcSet) === area));
    tweenTo({ kss: q.kss, full: q.full });
  };

  input.addEventListener("input", update);
  chips.forEach((c) =>
    c.addEventListener("click", () => {
      input.value = c.dataset.calcSet!;
      update();
    }),
  );
  update();
}

/* ---------- Cursor spotlight on rows and cards (mouse only) ---------- */

if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  document.addEventListener(
    "pointermove",
    (e) => {
      const spot = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    },
    { passive: true },
  );
}
