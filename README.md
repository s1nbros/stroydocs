# Стройдокс — сайт

Next.js + Tailwind. Хостване: Vercel.

## Старт
    npm install
    npm run dev

## Преди пускане
1. Създайте форма във formspree.io и сложете ID-то в `NEXT_PUBLIC_FORMSPREE_ID` (Vercel → Settings → Environment Variables). Вижте `.env.example`.
   Прикачването на файлове във Formspree изисква платен план; без него запитването минава, но без файла.
2. Сменете имейла в `src/lib/site.ts`.
3. Заменете плейсхолдърите `[Име ...]` в `src/app/page.tsx` (цитат от казуса и екипа) и сложете реални снимки.
4. Файловете за безплатните образци трябва да се пращат автоматично (напр. автоотговор във Formspree).

## Медия (Higgsfield)
- `public/media/kss.jpg` — КСС (Nano Banana)
- `public/media/aktove.jpg` — папка с актове (Nano Banana)
- `public/media/hero.mp4` — анимация в hero (Veo 3.1 Lite от kss.jpg)
