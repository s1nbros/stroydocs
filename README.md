# StroyDocs — website

Single-page marketing site (Bulgarian) for a construction documentation service in Sofia.
Astro + Tailwind CSS, static output, deployed to Vercel.

## Run

    npm install
    npm run dev      # http://localhost:4321
    npm run build    # static site in dist/

## Before launch

1. **Formspree** — create a form at formspree.io and replace `YOUR_FORM_ID` in `src/data/site.ts`
   (`FORMSPREE_ENDPOINT`). Until then both forms show a "call us instead" message.
   File attachments require a paid Formspree plan.
2. **Domain** — `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt` assume `https://stroydocs.net`.
3. **Placeholders** — email in `src/data/site.ts`; case-study quote author in `src/components/Proof.astro`.

## Structure

- `src/data/site.ts` — all copy, prices, FAQ, contact details
- `src/components/Hero.astro` — first viewport: header, headline, stats, entrance curtain
- `src/components/ConstructionScene.astro` — animated line drawing of a building and tower crane behind the hero
- `src/components/Tape.astro` — barrier-tape section breaks (thin hazard stripe or crossed tapes with a message)
- `src/components/BigMarquee.astro` — oversized outlined words that move with the scroll
- `src/components/Process.astro` — pinned horizontal "how it works" (desktop) + animated КСС mockup
- `src/components/DocGallery.astro` — sliding rows of document mockups and photos
- `src/scripts/main.ts` — menu, scroll-spy, forms, pricing calculator, cursor spotlight
- `src/scripts/motion.ts` — all animation with GSAP (ScrollTrigger, SplitText, ScrambleText): hero timeline, reveals, pinned steps, marquees, counters, magnetic buttons, tilt
- `src/components/ui/` — text animations from [Componentry](https://componentry.dev) (MIT): TextMorph, KineticTextReveal, AnnotatedText, FlippingWordSwap, LetterCascade — React islands
- `src/components/Heading.astro` — section heading built on KineticTextReveal
- `src/styles/global.css` — design tokens and all animations

## Fonts

Source Serif 4 (headings and numbers), IBM Plex Sans (UI), IBM Plex Mono (technical labels) — all from Google Fonts, all with Cyrillic.
The Bulgarian `locl` letterforms are switched off in `global.css` so the Cyrillic uses the neutral shapes.

## Photos

`src/assets/kss-desk.jpg` and `src/assets/acts-binder.jpg` (generated with Higgsfield); Astro converts them to responsive WebP.

## Swapping in a video background later

The hero background is the code-drawn construction scene. To use a clip instead, put the MP4 in `public/media/`
and replace `<ConstructionScene />` in `Hero.astro` with a muted, looping, `playsinline` `<video>`.

## Logo

Brand files live in `public/brand/`:

| File | Use |
|---|---|
| `stroydocs-logo-dark.svg` / `stroydocs-logo-on-navy.png` | Horizontal logo for dark backgrounds |
| `stroydocs-logo-light.svg` / `stroydocs-logo-on-white.png` | Horizontal logo for white backgrounds (documents, offers, email) |
| `stroydocs-app-icon.svg` / `-512.png` / `-1024.png` | Square icon (Google Business, Viber, social avatars) |
| `stroydocs-mark.svg` | Symbol without background |
| `stroydocs-favicon.svg` | Simplified symbol for 16–32 px (also `/favicon.svg`, `/apple-touch-icon.png`) |

The mark is a document sheet with a folded corner, a tower crane over a building inside it, and a brass
check seal. Colours: navy `#0d1522`, cream `#f4efe4`, brass `#c8963e`. Wordmark: Source Serif 4 SemiBold,
tagline: IBM Plex Mono — both converted to outlines. Regenerate the SVGs with
`python tools/brand/make_logo.py` (needs `fonttools`, `brotli`, `uharfbuzz`).
