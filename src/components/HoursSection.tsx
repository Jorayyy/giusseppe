"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { HoursData } from "@/lib/types";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

interface HoursSectionProps {
  hours: HoursData;
  isOpen: boolean;
}

function formatDayHours(h: { open: string; close: string; open2?: string; close2?: string }): string {
  if (!h.open) return "Closed";
  let s = `${h.open} – ${h.close}`;
  if (h.open2 && h.close2) s += `, ${h.open2} – ${h.close2}`;
  return s;
}

export function HoursSection({ hours, isOpen }: HoursSectionProps) {
  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <motion.section id="hours" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="text-2xl font-bold">Hours</h2>
      <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${isOpen ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}><Clock className="h-3 w-3" /> {isOpen ? "Open now" : "Closed"}</p>
      <div className="mt-4 divide-y divide-stone-100 text-sm">
        {Object.entries(hours).map(([day, h]) => (
          <div key={day} className={`flex justify-between py-2 ${day === dayName ? "font-semibold text-amber-700" : "text-stone-600"}`}><span>{day}</span><span className="tabular-nums">{formatDayHours(h)}</span></div>
        ))}
      </div>
    </motion.section>
  );
}
