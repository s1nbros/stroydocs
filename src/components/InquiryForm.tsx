"use client";

import { useState } from "react";
import { objectTypes, site } from "@/lib/site";
import Icon from "./Icon";

type Status = "idle" | "sending" | "done" | "error";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.formspreeId) {
      setStatus("error");
      return;
    }
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
    return (
      <div className="rounded-3xl bg-white p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <p className="mt-4 text-xl font-extrabold">Получихме запитването.</p>
        <p className="mt-2 text-graphite-600">Ще ви се обадим до 2 часа в работен ден.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-10">
      <label className="grid gap-1.5">
        <span className="text-sm font-bold">Име</span>
        <input name="name" required autoComplete="name" className="field" placeholder="Иван Петров" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-bold">Телефон</span>
        <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" className="field" placeholder="088 123 4567" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-bold">Тип обект</span>
        <select name="object_type" required defaultValue="" className="field">
          <option value="" disabled>Изберете…</option>
          {objectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-bold">
          Файл <span className="font-normal text-graphite-600">(по желание)</span>
        </span>
        <span className="field flex cursor-pointer items-center gap-3 border-dashed text-graphite-600">
          <Icon name="upload" className="h-5 w-5 shrink-0 text-accent" />
          <span className="truncate">{fileName || "КСС, чертеж или снимка"}</span>
          <input
            name="file"
            type="file"
            className="sr-only"
            accept=".pdf,.xls,.xlsx,.dwg,.jpg,.jpeg,.png,.zip"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </span>
      </label>

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 w-full text-lg !py-4 disabled:opacity-60">
        {status === "sending" ? "Изпращане…" : "Изпрати запитване"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Не успяхме да изпратим формата. Обадете ни се на{" "}
          <a href={site.phoneTel} className="font-bold underline">{site.phoneDisplay}</a> или пишете във{" "}
          <a href={site.viber} className="font-bold underline">Viber</a>.
        </p>
      )}

      <p className="flex items-center justify-center gap-2 text-sm text-graphite-600">
        <Icon name="clock" className="h-4 w-4" />
        Отговаряме до 2 часа в работен ден.
      </p>
    </form>
  );
}
