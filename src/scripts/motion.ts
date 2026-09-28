/**
 * All scroll, entrance and pointer animation, driven by GSAP (free, incl. its plugins).
 * The hero construction drawing itself stays in CSS keyframes (SVG stroke loops).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
// Keep in sync with --intro in global.css (the entrance curtain)
const INTRO = root.classList.contains("play-intro") ? 1.1 : 0;
const CYRILLIC = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЮЯ0123456789";

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---------- Counters ---------- */

const money = (n: number) => n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function countTo(el: HTMLElement, target: number, opts: { suffix?: string; decimals?: number; duration?: number; delay?: number; format?: (n: number) => string } = {}) {
  const { suffix = "", decimals = 0, duration = 1.6, delay = 0, format } = opts;
  const render = (n: number) => (format ? format(n) : n.toFixed(decimals)) + suffix;
  if (reduceMotion) {
    el.textContent = render(target);
    return;
  }
  const obj = { v: 0 };
  el.textContent = render(0);
  gsap.to(obj, { v: target, duration, delay, ease: "power3.out", onUpdate: () => (el.textContent = render(obj.v)) });
}

/* ---------- Reduced motion: show everything in its final state ---------- */

if (reduceMotion) {
  gsap.set("[data-reveal], .anim", { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
  gsap.set(".subhead", { autoAlpha: 0.8 });
  $$("[data-reveal], [data-doc], .step-panel, [data-reveal-photo]").forEach((el) => el.classList.add("is-in"));
  $$(".stats [data-count], [data-scroll-count]").forEach((el) => countTo(el, Number(el.dataset.count), { suffix: el.dataset.suffix, decimals: Number(el.dataset.decimals ?? 0) }));
  $(".headline")?.classList.add("is-split");
} else {
  /* ---------- Hero entrance timeline ---------- */

  const headline = $(".headline");
  const tl = gsap.timeline({ delay: INTRO + 0.1, defaults: { ease: "power3.out" } });

  if (headline) {
    const line2 = $(".hl-split", headline);
    const split = line2 ? SplitText.create(line2, { type: "chars", mask: "chars" }) : null;
    headline.classList.add("is-split");
    tl.from(".hl-morph", { yPercent: 110, autoAlpha: 0, rotate: 3, duration: 1 }, 0);
    if (split) tl.from(split.chars, { yPercent: 115, rotate: 8, duration: 0.9, stagger: 0.035 }, 0.15);
  }
  tl.to(".trust.anim", { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9 }, 0)
    .to(".subhead.anim", { autoAlpha: 0.8, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9 }, 0.35)
    .to(".cta.anim", { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9 }, 0.5)
    .fromTo(".cta.anim", { boxShadow: "0 0 0 0 rgba(255,255,255,0.6)" }, { boxShadow: "0 0 0 14px rgba(255,255,255,0)", duration: 1.2, ease: "power2.out" }, 1)
    .to(".stats .anim", { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.08 }, 0.6)
    .add(() => {
      $$(".stats [data-count]").forEach((el, i) =>
        countTo(el, Number(el.dataset.count), { suffix: el.dataset.suffix, decimals: Number(el.dataset.decimals ?? 0), duration: 1.5 + i * 0.08, delay: i * 0.09 }),
      );
    }, 0.65);

  // Hero copy lifts and fades while the scene sinks as you scroll away
  gsap.to(".hero-main, .stats", {
    autoAlpha: 0,
    y: -60,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 25%", scrub: true },
  });
  gsap.to(".scene", { "--sy": "80px", ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  /* ---------- Header: compact glass bar once the page scrolls ---------- */

  ScrollTrigger.create({
    start: 60,
    end: "max",
    onToggle: (self) => $("#site-header")?.classList.toggle("is-scrolled", self.isActive),
  });

  /* ---------- Scroll progress bar ---------- */

  gsap.fromTo(".scroll-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  /* ---------- Reveals (batched so neighbours stagger together) ---------- */

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => {
      els.forEach((el) => el.classList.add("is-in"));
      gsap.to(els, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true });
      // Eyebrow labels decode into place
      els
        .filter((el) => el.classList.contains("eyebrow"))
        .forEach((el) => {
          const text = el.textContent ?? "";
          gsap.to(el, { duration: 1, scrambleText: { text, chars: CYRILLIC, speed: 0.6, revealDelay: 0.2 } });
        });
    },
  });

  /* ---------- Document mockup + photo wipe ---------- */

  ScrollTrigger.create({
    trigger: "[data-doc]",
    start: "top 70%",
    once: true,
    onEnter: (self) => {
      const el = self.trigger as HTMLElement;
      el.classList.add("is-in");
      $$("[data-doc-count]", el).forEach((n, i) => countTo(n, Number(n.dataset.docCount), { duration: 0.9, delay: 2 + i * 0.15, format: money }));
    },
  });
  $$("[data-reveal-photo]").forEach((el) =>
    ScrollTrigger.create({ trigger: el, start: "top 80%", once: true, onEnter: () => el.classList.add("is-in") }),
  );
  $$("[data-scroll-count]").forEach((el) =>
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => countTo(el, Number(el.dataset.count), { suffix: el.dataset.suffix, duration: 1.8 }),
    }),
  );

  /* ---------- Big marquees and section words move with the scroll ---------- */

  $$("[data-marquee]").forEach((m) => {
    const track = $(".big-marquee-track", m);
    const reverse = m.classList.contains("reverse");
    gsap.fromTo(
      track,
      { xPercent: reverse ? -35 : -5 },
      { xPercent: reverse ? -5 : -35, ease: "none", scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: 0.6 } },
    );
  });
  $$("[data-word]").forEach((el) =>
    gsap.fromTo(el, { "--wx": "140px" }, { "--wx": "-140px", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } }),
  );

  /* ---------- "How it works": pinned horizontal slide (desktop) ---------- */

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const pin = $("[data-pin]");
    const track = pin && $("[data-pin-track]", pin);
    if (!pin || !track) return;
    pin.classList.add("is-pinned");
    const bar = $(".pin-progress span", pin);
    const distance = () => Math.max(0, track.scrollWidth - innerWidth);
    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${distance() + innerHeight * 0.6}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
      },
    });
    $$(".step-panel", track).forEach((panel) =>
      ScrollTrigger.create({ trigger: panel, containerAnimation: slide, start: "left 80%", onEnter: () => panel.classList.add("is-in") }),
    );
    return () => pin.classList.remove("is-pinned");
  });
  mm.add("(max-width: 1023px)", () => {
    $$(".step-panel").forEach((panel) => ScrollTrigger.create({ trigger: panel, start: "top 75%", once: true, onEnter: () => panel.classList.add("is-in") }));
  });

  /* ---------- Pointer effects (mouse only) ---------- */

  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    // Magnetic buttons
    $$(".cta, .btn-white, .btn-accent, .nav-phone").forEach((btn) => {
      const toX = gsap.quickTo(btn, "--mgx", { duration: 0.5, ease: "power3" });
      const toY = gsap.quickTo(btn, "--mgy", { duration: 0.5, ease: "power3" });
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        toX((e.clientX - r.left - r.width / 2) * 0.22);
        toY((e.clientY - r.top - r.height / 2) * 0.3);
      });
      btn.addEventListener("pointerleave", () => {
        toX(0);
        toY(0);
      });
    });

    // Services: a document preview trails the cursor and sways with its speed
    const list = $("[data-svc-list]");
    const preview = list && $(".svc-preview", list);
    if (list && preview) {
      const docs = $$("[data-svc-doc]", preview);
      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });
      const rTo = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      list.addEventListener("pointermove", (e) => {
        const r = list.getBoundingClientRect();
        xTo(e.clientX - r.left + 40);
        yTo(e.clientY - r.top - 125);
        rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.8));
        lastX = e.clientX;
        const row = (e.target as HTMLElement).closest<HTMLElement>("[data-svc]");
        preview.classList.toggle("is-on", !!row);
        docs.forEach((d) => d.classList.toggle("is-on", row?.dataset.svc === d.dataset.svcDoc));
      });
      list.addEventListener("pointerleave", () => preview.classList.remove("is-on"));
    }

    // 3D tilt towards the pointer
    $$("[data-tilt]").forEach((el) => {
      gsap.set(el, { transformPerspective: 1100 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      });
      el.addEventListener("pointerleave", () => {
        rx(0);
        ry(0);
      });
    });
  }

  // Fonts and late-hydrating islands change heights: recalculate trigger positions
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener("load", () => ScrollTrigger.refresh());
}
