import { site } from "@/lib/site";

export default function FloatingChat() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="Пишете ни в WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2s-1.1-1.5-1.1-2.9 .7-2 1-2.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4" />
        </svg>
      </a>
      <a
        href={site.viber}
        aria-label="Пишете ни във Viber"
        className="flex h-14 items-center gap-2 rounded-full bg-[#7360F2] pl-4 pr-5 font-bold text-white shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M11.4 2C8 2 3.3 2.9 2.4 7.3c-.5 2.3-.5 4.9 0 7.2.5 2.4 2 3.7 3.6 4.3V22c0 .5.6.7.9.4l2.6-2.8c.7 0 1.3.1 2 .1 3.4 0 8.1-.9 9-5.3.5-2.3.5-4.9 0-7.2C19.6 2.9 14.8 2 11.4 2m4.8 13.2c-.4.6-1.4 1.1-2 .9-3.1-1.2-5.6-3.5-7-6.6-.3-.7.3-1.6.9-2 .5-.4 1.2-.3 1.5.2l1 1.5c.3.5.2 1.1-.3 1.4l-.4.3c.6 1.5 1.8 2.7 3.3 3.3l.3-.4c.3-.5.9-.6 1.4-.3l1.5 1c.5.4.2 1.1-.2 1.7" />
        </svg>
        Viber
      </a>
    </div>
  );
}
