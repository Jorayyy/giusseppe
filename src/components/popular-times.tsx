"use client";

import { useState } from "react";
import { POPULAR, HOURS_LABELS } from "@/lib/data";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DAY_MAP: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export default function PopularTimes() {
  const [selectedDay, setSelectedDay] = useState("Fri");

  const fullDay = DAY_MAP[selectedDay];
  const values = POPULAR[fullDay];

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="font-serif text-xl font-semibold">Popular times</h2>
      <div className="mt-3 flex gap-1.5 overflow-x-auto">
        {DAYS.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selectedDay === d
                ? "bg-primary text-white"
                : "bg-stone-100 hover:bg-stone-200"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-end gap-1">
        {values.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-primary transition-all"
              style={{ height: `${v / 1.2}px`, opacity: 0.3 + v / 150 }}
            />
            <span className="text-[10px] text-stone-400">{HOURS_LABELS[i]}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-stone-500">
        8 PM:{" "}
        <span className="font-medium text-primary-light">
          Usually a little busy
        </span>{" "}
        · No wait
      </p>
    </section>
  );
}
