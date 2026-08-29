"use client";

import { useState } from "react";
import { Phone, Navigation, Menu, X, MapPin, Clock, MessageSquare } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

const NAV_LINKS = [
  { label: "Menu", href: "#menu", icon: MapPin },
  { label: "Hours", href: "#hours", icon: Clock },
  { label: "Contact", href: "#contact", icon: Phone },
  { label: "Reserve", href: "#booking", icon: MessageSquare },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-serif text-sm font-bold text-white">G</div>
          <span className="font-serif text-lg font-bold tracking-tight">Giuseppe&apos;s</span>
          <span className="hidden text-xs text-stone-500 sm:inline">· Tacloban</span>
        </a>

        <div className="flex items-center gap-1.5">
          <a href={RESTAURANT.phoneHref} className="inline-flex items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-primary-light" aria-label="Call">
            <Phone className="h-4 w-4" />
          </a>
          <a href={RESTAURANT.phoneHref} className="hidden items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-light md:inline-flex">
            <Phone className="h-3.5 w-3.5" /> Call
          </a>
          <a href={RESTAURANT.mapsUrl} target="_blank" className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white p-2 text-stone-700 hover:bg-stone-50" aria-label="Directions">
            <Navigation className="h-4 w-4" />
          </a>
          <a href={RESTAURANT.mapsUrl} target="_blank" className="hidden items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 md:inline-flex">
            <Navigation className="h-3.5 w-3.5" /> Directions
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-stone-100"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-100 bg-white px-4 py-3">
          <div className="flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 active:bg-stone-100"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
