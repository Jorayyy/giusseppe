"use client";

import { Phone, Navigation } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";

interface NavBarProps {
  settings: RestaurantSettings;
  onScroll: (id: string) => void;
}

export function NavBar({ settings, onScroll }: NavBarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stone-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <button onClick={() => onScroll("hero")} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 font-serif text-sm font-bold text-white italic">G</div>
          <span className="font-serif text-lg font-bold tracking-tight italic">Giuseppe&apos;s</span>
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {["Menu", "Hours", "Reviews"].map((s) => (
            <button key={s} onClick={() => onScroll(s.toLowerCase())} className="rounded-full px-3 py-1.5 text-sm font-medium text-stone-500 transition hover:text-amber-700">{s}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={settings.phoneHref} className="hidden items-center gap-1.5 rounded-full bg-amber-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700 sm:inline-flex"><Phone className="h-4 w-4" /> Call</a>
          <a href={settings.maps} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium transition hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
        </div>
      </div>
    </nav>
  );
}
