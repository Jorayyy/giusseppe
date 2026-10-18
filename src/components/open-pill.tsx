"use client";

import { useEffect, useState } from "react";
import { isOpen, HOURS } from "@/lib/data";

type Hours = typeof HOURS;

export default function OpenPill({ hours = HOURS }: { hours?: Hours }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpen(new Date(), hours));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [hours]);

  if (open === null) return <span className="sr-only" aria-hidden />;

  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 ${open ? "text-primary" : "text-muted"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-primary" : "bg-stone-400"}`} />
      {open ? "Open now" : "Closed now"}
    </span>
  );
}
