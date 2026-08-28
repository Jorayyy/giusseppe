"use client";

import { Phone, Navigation, MessageCircle } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 font-serif text-sm font-bold text-white">G</div>
          <span className="font-serif text-lg font-bold tracking-tight">Giuseppe&apos;s</span>
          <span className="hidden text-xs text-stone-500 sm:inline">· Tacloban</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={RESTAURANT.phoneHref} className="hidden items-center gap-1.5 rounded-full bg-amber-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-amber-700 sm:inline-flex">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={RESTAURANT.waOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp to order"
            className="hidden items-center justify-center rounded-full bg-[#25D366] p-2 text-white hover:bg-[#20bd5a] sm:inline-flex"
            title="WhatsApp to order"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a href={RESTAURANT.phoneHref} className="inline-flex items-center justify-center rounded-full bg-amber-600 p-2 text-white hover:bg-amber-700 sm:hidden">
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={RESTAURANT.waOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp to order"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] p-2 text-white hover:bg-[#20bd5a] sm:hidden"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a href={RESTAURANT.mapsUrl} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium hover:bg-stone-50">
            <Navigation className="h-4 w-4" /> <span className="hidden sm:inline">Directions</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
