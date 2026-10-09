"use client";

import { useEffect, useState } from "react";
import { isOpen } from "@/lib/data";

export default function OpenPill() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpen(new Date()));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return <span className="sr-only" aria-hidden />;

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${open ? "text-emerald-700" : "text-stone-500"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-500" : "bg-stone-400"}`} />
      {open ? "Open now" : "Closed now"}
    </span>
  );
}
