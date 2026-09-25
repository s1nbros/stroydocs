"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function EmailCapture({ resource }: { resource: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.formspreeId) return setStatus("error");
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="font-bold text-accent">Готово! Изпратихме ви файла на имейла.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input type="hidden" name="resource" value={resource} />
      <input name="email" type="email" required autoComplete="email" placeholder="вашият@имейл.bg" className="field flex-1" />
      <button type="submit" disabled={status === "sending"} className="btn-primary shrink-0 disabled:opacity-60">
        {status === "sending" ? "Изпращане…" : "Изпрати ми го"}
      </button>
      {status === "error" && <p className="text-sm text-red-400 sm:hidden">Грешка — опитайте отново.</p>}
    </form>
  );
}
