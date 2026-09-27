# Stroydocs — website

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
2. **Domain** — `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt` assume `https://stroydocs.bg`.
3. **Placeholders** — email in `src/data/site.ts`; case-study quote author in `src/components/Proof.astro`.

## Structure

- `src/data/site.ts` — all copy, prices, FAQ, contact details
- `src/components/Hero.astro` — first viewport: header, headline, stats, entrance curtain
- `src/components/ConstructionScene.astro` — animated line drawing of a building and tower crane behind the hero
- `src/components/Tape.astro` — barrier-tape section breaks (thin hazard stripe or crossed tapes with a message)
- `src/components/BigMarquee.astro` — oversized outlined words that move with the scroll
- `src/components/Process.astro` — pinned horizontal "how it works" (desktop) + animated КСС mockup
- `src/components/DocGallery.astro` — sliding rows of document mockups and photos
- `src/scripts/main.ts` — menu, count-ups, reveals, scroll-spy, forms, pricing calculator, scroll/pointer effects
- `src/styles/global.css` — design tokens and all animations

## Fonts

Inter (UI), Oswald (display headings and numbers), IBM Plex Mono (technical labels) — all from Google Fonts, all with Cyrillic.

## Photos

`src/assets/kss-desk.jpg` and `src/assets/acts-binder.jpg` (generated with Higgsfield); Astro converts them to responsive WebP.

## Swapping in a video background later

The hero background is the code-drawn construction scene. To use a clip instead, put the MP4 in `public/media/`
and replace `<ConstructionScene />` in `Hero.astro` with a muted, looping, `playsinline` `<video>`.
