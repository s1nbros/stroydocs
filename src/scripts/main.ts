/**
 * Page behaviour: menu, scroll-spy, forms, pricing calculator, cursor spotlight.
 * All animation lives in motion.ts (GSAP).
 */
import { gsap } from "gsap";
import { FORMSPREE_ENDPOINT, checklistStages, quote, site } from "../data/site";
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

/* ---------- Viber: open the chat, fall back if the app doesn't take over ---------- */

const viberHelp = document.querySelector<HTMLElement>("[data-viber-help]");
let viberTimer = 0;

function showViberHelp() {
  if (!viberHelp) return;
  viberHelp.hidden = false;
  viberHelp.querySelector<HTMLElement>("[data-viber-copy]")?.focus({ preventScroll: true });
}
function hideViberHelp() {
  if (viberHelp) viberHelp.hidden = true;
}
// Leaving the page (app opened) cancels the fallback
const cancelViberFallback = () => clearTimeout(viberTimer);
addEventListener("blur", cancelViberFallback);
addEventListener("pagehide", cancelViberFallback);
document.addEventListener("visibilitychange", () => document.hidden && cancelViberFallback());

document.querySelectorAll<HTMLAnchorElement>('a[href^="viber:"]').forEach((link) => {
  link.addEventListener("click", () => {
    hideViberHelp();
    clearTimeout(viberTimer);
    // The browser hands viber:// to the app; if we are still here and focused after 1.6 s, it didn't open
    viberTimer = window.setTimeout(() => {
      if (!document.hidden && document.hasFocus()) showViberHelp();
    }, 1600);
  });
});
viberHelp?.querySelector("[data-viber-close]")?.addEventListener("click", hideViberHelp);
document.addEventListener("keydown", (e) => e.key === "Escape" && hideViberHelp());
viberHelp?.querySelector<HTMLButtonElement>("[data-viber-copy]")?.addEventListener("click", async (e) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const value = btn.dataset.viberCopy ?? "";
  const label = btn.querySelector("span");
  let ok = false;
  try {
    await navigator.clipboard.writeText(value);
    ok = true;
  } catch {
    // Older iOS / non-secure contexts: copy through a temporary field
    const field = Object.assign(document.createElement("textarea"), { value, readOnly: true });
    field.style.cssText = "position:fixed;opacity:0";
    document.body.append(field);
    field.select();
    ok = document.execCommand("copy");
    field.remove();
  }
  if (ok) {
    btn.classList.add("is-done");
    if (label) label.textContent = "Копирано";
  } else {
    // Last resort: select the number so the user can copy it by hand
    const num = viberHelp.querySelector(".viber-help-number b");
    if (num) getSelection()?.selectAllChildren(num);
  }
});

/* ---------- Free document checklist ---------- */

const checklist = document.querySelector<HTMLElement>("[data-checklist]");
if (checklist) {
  const STORE = "sd-checklist-v1";
  let saved: Record<string, boolean> = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE) ?? "{}");
  } catch {}
  const save = () => {
    try {
      localStorage.setItem(STORE, JSON.stringify(saved));
    } catch {}
  };

  const tabs = [...checklist.querySelectorAll<HTMLButtonElement>("[data-cl-tab]")];
  const panels = [...checklist.querySelectorAll<HTMLElement>("[data-cl-panel]")];
  const boxes = [...checklist.querySelectorAll<HTMLInputElement>("[data-cl-item]")];
  const $ = (sel: string) => checklist.querySelector<HTMLElement>(sel)!;
  let current = tabs[0]?.dataset.clTab ?? "";

  boxes.forEach((b) => (b.checked = !!saved[b.dataset.clItem!]));

  const render = () => {
    const panel = panels.find((p) => p.dataset.clPanel === current)!;
    const items = [...panel.querySelectorAll<HTMLInputElement>("[data-cl-item]")];
    const done = items.filter((i) => i.checked).length;
    const missing = items.length - done;
    $("[data-cl-title]").textContent = panel.dataset.clTitleText ?? "";
    $("[data-cl-done]").textContent = String(done);
    $("[data-cl-total]").textContent = String(items.length);
    $("[data-cl-bar]").style.width = `${(done / items.length) * 100}%`;
    $(".checklist-progress").classList.toggle("is-done", missing === 0);
    $("[data-cl-status]").textContent =
      missing === 0
        ? "Всичко е налице — папката е готова."
        : done === 0
          ? "Отметнете документите, които имате."
          : `Липсват ${missing} ${missing === 1 ? "документ" : "документа"}. Можем да ги подготвим вместо вас.`;
  };

  const select = (id: string, focus = false) => {
    current = id;
    tabs.forEach((t) => {
      const on = t.dataset.clTab === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach((p) => (p.hidden = p.dataset.clPanel !== id));
    render();
  };

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t.dataset.clTab!));
    // Arrow keys move between tabs (WAI-ARIA tabs pattern)
    t.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      select(tabs[(i + step + tabs.length) % tabs.length].dataset.clTab!, true);
    });
  });
  boxes.forEach((b) =>
    b.addEventListener("change", () => {
      saved[b.dataset.clItem!] = b.checked;
      save();
      render();
    }),
  );

  // Print the current stage as a clean one-page list with the missing items marked
  $("[data-cl-print]").addEventListener("click", () => {
    const stage = checklistStages.find((st) => st.id === current)!;
    const rows = stage.items
      .map((item, j) => `<li>${saved[`${stage.id}-${j}`] ? "☑" : "☐"} ${item}</li>`)
      .join("");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html lang="bg"><meta charset="utf-8"><title>${stage.title} — ${site.name}</title>
      <style>body{font:16px/1.6 system-ui,sans-serif;margin:40px;color:#111}h1{font-size:22px}ul{list-style:none;padding:0}li{padding:6px 0;border-bottom:1px solid #ddd}p{color:#666;font-size:13px}</style>
      <h1>${stage.title}</h1><ul>${rows}</ul>
      <p>Ориентировъчен списък. ${site.name} · ${site.phoneDisplay} · stroydocs.net</p>`);
    w.document.close();
    w.focus();
    w.print();
  });

  render();
}

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

  const kinds = calc.querySelectorAll<HTMLButtonElement>("[data-calc-kind]");
  let k = 1;

  const update = () => {
    const area = Number(input.value);
    const q = quote(area, k);
    areaOut.textContent = `${area.toLocaleString("bg-BG")} м²`;
    kssRate.textContent = `средно ${rate(q.avgKss)}`;
    fullRate.textContent = `средно ${rate(q.avgFull)}`;
    input.style.setProperty("--p", `${((area - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100}%`);
    // Bands the area passes through are "used"; the band it ends in is the active one
    rows.forEach((r) => {
      const i = Number(r.dataset.tier);
      r.classList.toggle("is-active", i === q.tier);
      r.classList.toggle("is-used", i < q.tier);
    });
    chips.forEach((c) => c.classList.toggle("is-active", Number(c.dataset.calcSet) === area));
    tweenTo({ kss: q.kss, full: q.full });
  };

  input.addEventListener("input", update);
  kinds.forEach((c) =>
    c.addEventListener("click", () => {
      k = Number(c.dataset.calcKind);
      kinds.forEach((o) => {
        o.classList.toggle("is-active", o === c);
        o.setAttribute("aria-checked", String(o === c));
      });
      update();
    }),
  );
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
