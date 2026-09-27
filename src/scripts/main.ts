import { FORMSPREE_ENDPOINT, pricingMin, pricingTiers, site } from "../data/site";

const root = document.documentElement;
root.classList.add("js");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Entrance ---------- */

// Keep in sync with --intro in global.css
const INTRO_MS = root.classList.contains("play-intro") ? 1100 : 0;

// Hero headline: wrap every character so the letters can rise one by one
const headline = document.querySelector<HTMLElement>(".headline");
if (headline) {
  let ci = 0;
  const splitChars = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent ?? "") {
          const span = document.createElement("span");
          if (ch.trim() === "") span.className = "sp";
          else {
            span.className = "ch";
            span.textContent = ch;
            span.style.setProperty("--ci", String(ci++));
          }
          frag.append(span);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) splitChars(child);
    }
  };
  headline.querySelectorAll(":scope > span").forEach(splitChars);
  headline.classList.add("is-split");
}

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

/* ---------- Count-up numbers ---------- */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function countUp(el: HTMLElement, target: number, opts: { decimals: number; suffix: string; duration: number; delay: number; format?: (n: number) => string }) {
  const render = (n: number) => (opts.format ? opts.format(n) : n.toFixed(opts.decimals)) + opts.suffix;
  if (reduceMotion) {
    el.textContent = render(target);
    return;
  }
  el.textContent = render(0);
  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / opts.duration);
      el.textContent = render(target * easeOutCubic(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, opts.delay);
}

function observeOnce(els: Iterable<Element>, threshold: number, onEnter: (el: HTMLElement) => void, rootMargin = "0px") {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        onEnter(entry.target as HTMLElement);
      }
    },
    { threshold, rootMargin },
  );
  for (const el of els) io.observe(el);
}

// Hero stats: timing tied to the entrance stagger
const heroStats = document.querySelectorAll<HTMLElement>(".stats [data-count]");
heroStats.forEach((el) => (el.textContent = `${Number(0).toFixed(Number(el.dataset.decimals))}${el.dataset.suffix}`));
observeOnce(heroStats, 0.25, (el) => {
  const i = Number(el.dataset.index ?? 0);
  countUp(el, Number(el.dataset.count), {
    decimals: Number(el.dataset.decimals ?? 0),
    suffix: el.dataset.suffix ?? "",
    duration: 1500 + i * 80,
    delay: 480 + i * 90 + INTRO_MS,
  });
});

// Case-study numbers
observeOnce(document.querySelectorAll<HTMLElement>("[data-scroll-count]"), 0.4, (el) => {
  countUp(el, Number(el.dataset.count), {
    decimals: Number(el.dataset.decimals ?? 0),
    suffix: el.dataset.suffix ?? "",
    duration: 1800,
    delay: 200,
  });
});

/* ---------- Section headings: split into words for the rise-in ---------- */

document.querySelectorAll<HTMLElement>(".h2").forEach((h) => {
  let wi = 0;
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const part of (child.textContent ?? "").split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) frag.append(" ");
          else {
            const w = document.createElement("span");
            w.className = "w";
            const inner = document.createElement("span");
            inner.textContent = part;
            inner.style.setProperty("--wi", String(wi++));
            w.append(inner);
            frag.append(w);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
    }
  };
  walk(h);
  h.classList.add("split");
});

/* ---------- Scroll reveal + document mockup ---------- */

const money = (n: number) => n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

observeOnce(document.querySelectorAll("[data-reveal]"), 0.12, (el) => el.classList.add("is-in"), "0px 0px -8% 0px");
observeOnce(document.querySelectorAll(".step-panel, [data-reveal-photo]"), 0.3, (el) => el.classList.add("is-in"));

observeOnce(document.querySelectorAll("[data-doc]"), 0.3, (el) => {
  el.classList.add("is-in");
  // Totals tick up after the rows have been "typed" in
  el.querySelectorAll<HTMLElement>("[data-doc-count]").forEach((n, i) =>
    countUp(n, Number(n.dataset.docCount), { decimals: 2, suffix: "", duration: 900, delay: 2000 + i * 150, format: money }),
  );
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
}
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
  let shown = { kss: 0, full: 0 };
  let raf = 0;

  // Tween the totals so they visibly count to the new value
  const tweenTo = (target: { kss: number; full: number }) => {
    cancelAnimationFrame(raf);
    const from = { ...shown };
    const start = performance.now();
    const step = (now: number) => {
      const p = reduceMotion ? 1 : Math.min(1, (now - start) / 450);
      const e = easeOutCubic(p);
      shown = { kss: from.kss + (target.kss - from.kss) * e, full: from.full + (target.full - from.full) * e };
      kssOut.textContent = eur(shown.kss);
      fullOut.textContent = eur(shown.full);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
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

/* ---------- Scroll-linked effects ---------- */

const hero = document.querySelector<HTMLElement>(".hero");
const marquees = [...document.querySelectorAll<HTMLElement>("[data-marquee]")];
const sectionWords = [...document.querySelectorAll<HTMLElement>("[data-word]")];
const pin = document.querySelector<HTMLElement>("[data-pin]");
const pinTrack = pin?.querySelector<HTMLElement>("[data-pin-track]");
const pinQuery = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
const syncPin = () => pin?.classList.toggle("is-pinned", pinQuery.matches);
pinQuery.addEventListener("change", () => {
  syncPin();
  onScrollFx();
});
syncPin();

let ticking = false;
function onScrollFx() {
  ticking = false;
  const vh = innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  root.style.setProperty("--progress", String(max > 0 ? scrollY / max : 0));
  if (reduceMotion) return;

  // Hero: photo drifts and the copy fades as it scrolls away
  if (hero) hero.style.setProperty("--hp", Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * 0.9))).toFixed(3));

  // Section words drift sideways while their section passes
  for (const w of sectionWords) {
    const r = w.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    w.style.setProperty("--wx", `${((r.top - vh / 2) * 0.18).toFixed(1)}px`);
  }

  // Big outlined words slide with the scroll
  for (const m of marquees) {
    const r = m.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) continue;
    m.style.setProperty("--shift", ((vh - r.top) * 0.45).toFixed(1));
  }

  // "How it works": map the pinned scroll distance to a sideways slide
  if (pin && pinTrack && pin.classList.contains("is-pinned")) {
    const r = pin.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
    const distance = pinTrack.scrollWidth - innerWidth;
    pin.style.setProperty("--pin-x", `${(-p * Math.max(0, distance)).toFixed(1)}px`);
    pin.style.setProperty("--pin-p", p.toFixed(3));
    pinTrack.querySelectorAll<HTMLElement>(".step-panel").forEach((panel, i, all) => {
      if (p >= i / all.length - 0.05) panel.classList.add("is-in");
    });
  }
}
addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFx);
    }
  },
  { passive: true },
);
addEventListener("resize", onScrollFx);
onScrollFx();

/* ---------- Pointer effects: spotlight + tilt (mouse only) ---------- */

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
  // Services: a document preview follows the cursor with a little lag and sway
  const list = document.querySelector<HTMLElement>("[data-svc-list]");
  const preview = list?.querySelector<HTMLElement>(".svc-preview");
  if (list && preview) {
    const docs = [...preview.querySelectorAll<HTMLElement>("[data-svc-doc]")];
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const follow = () => {
      const dx = tx - x;
      x += dx * 0.16;
      y += (ty - y) * 0.16;
      preview.style.setProperty("--px", `${x.toFixed(1)}px`);
      preview.style.setProperty("--py", `${y.toFixed(1)}px`);
      preview.style.setProperty("--pr", `${Math.max(-12, Math.min(12, dx * 0.12)).toFixed(2)}deg`);
      raf = Math.abs(dx) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(follow) : 0;
    };
    list.addEventListener("pointermove", (e) => {
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left + 40;
      ty = e.clientY - r.top - 125;
      const row = (e.target as HTMLElement).closest<HTMLElement>("[data-svc]");
      preview.classList.toggle("is-on", !!row);
      docs.forEach((d) => d.classList.toggle("is-on", row?.dataset.svc === d.dataset.svcDoc));
      if (!raf) raf = requestAnimationFrame(follow);
    });
    list.addEventListener("pointerleave", () => preview.classList.remove("is-on"));
  }

  // Magnetic buttons: pulled a little towards the cursor
  document.querySelectorAll<HTMLElement>(".cta, .btn-white, .btn-accent, .sign-in").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mgx", `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
      btn.style.setProperty("--mgy", `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.setProperty("--mgx", "0px");
      btn.style.setProperty("--mgy", "0px");
    });
  });

  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });
}
