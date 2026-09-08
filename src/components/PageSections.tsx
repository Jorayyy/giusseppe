"use client";

import { motion } from "framer-motion";
import { Phone, Navigation, MapPin, Clock, ExternalLink, Wine, Bookmark, BookmarkCheck, Share2, Check, UtensilsCrossed } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";
import { Reveal } from "./Reveal";
import { OpenIndicator } from "./OpenIndicator";

interface ActionBarProps {
  settings: RestaurantSettings;
  saved: boolean;
  copied: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  onShowFullMenu: () => void;
}

export function ActionBar({ settings, saved, copied, onToggleSave, onShare, onShowFullMenu }: ActionBarProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <Reveal>
        <div className="flex flex-wrap gap-2">
          <a href={settings.maps} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm"><Navigation className="h-4 w-4" /> Directions</a>
          <a href={settings.phoneHref} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm"><Phone className="h-4 w-4" /> Call</a>
          <button onClick={onShowFullMenu} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm"><UtensilsCrossed className="h-4 w-4" /> Full Menu</button>
          <button onClick={onToggleSave} className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${saved ? "border-amber-200 bg-amber-50 text-amber-700 shadow-sm" : "border-stone-200 hover:border-stone-300 hover:bg-stone-50"}`}>{saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />} {saved ? "Saved" : "Save"}</button>
          <button onClick={onShare} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm">{copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />} {copied ? "Copied" : "Share"}</button>
        </div>
      </Reveal>
    </div>
  );
}

interface SidebarProps {
  settings: RestaurantSettings;
  isOpen: boolean;
}

export function Sidebar({ settings, isOpen }: SidebarProps) {
  return (
    <div className="space-y-6">
      <Reveal delay={0.1}>
        <div className="rounded-3xl bg-zinc-900 p-8 text-white">
          <h3 className="font-serif text-xl font-bold">Reserve a table</h3>
          <p className="mt-2 text-sm text-white/60">Especially for Friday &amp; Saturday nights.</p>
          <a href={settings.phoneHref} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-600/30"><Phone className="h-4 w-4" /> Call to Reserve</a>
          <p className="mt-3 text-center text-[11px] text-white/40">{settings.phone}</p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="rounded-3xl border border-stone-200 p-8">
          <h3 className="font-bold">Contact</h3>
          <div className="mt-4 space-y-4 text-sm">
            <a href={settings.maps} target="_blank" className="flex gap-3 transition-colors hover:text-amber-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
              <span>{settings.address}<br /><span className="text-amber-600">Get directions</span></span>
            </a>
            <a href={settings.phoneHref} className="flex items-center gap-3 transition-colors hover:text-amber-600">
              <Phone className="h-4 w-4 text-stone-400" /> {settings.phone}
            </a>
            <div className="flex items-center gap-3 text-stone-600">
              <Clock className="h-4 w-4 text-stone-400" />
              <OpenIndicator isOpen={isOpen} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href={settings.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-amber-700"><Phone className="h-4 w-4" /> Call</a>
            <a href={settings.maps} target="_blank" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2.5 text-sm font-medium transition-all hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="overflow-hidden rounded-3xl border border-stone-200">
          <iframe title="map" src="https://maps.google.com/maps?q=173%20Avenida%20Veteranos%20Tacloban%20City&z=15&output=embed" className="h-64 w-full border-0" loading="lazy" />
          <a href={settings.maps} target="_blank" className="flex items-center justify-center gap-1 border-t border-stone-200 py-3.5 text-sm font-medium transition-colors hover:bg-stone-50"><ExternalLink className="h-4 w-4" /> Open in Maps</a>
        </div>
      </Reveal>
    </div>
  );
}

interface FooterProps {
  settings: RestaurantSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="border-t border-stone-100 bg-stone-50 py-12 text-center text-xs text-stone-400">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 font-serif text-lg font-bold text-white italic mx-auto">G</div>
        <p className="mt-4 font-serif text-lg font-bold text-stone-900">Giuseppe&apos;s</p>
        <p className="mt-1 text-stone-500">Est. {settings.since} · {settings.address}</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-amber-600">Facebook</a>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-amber-600">Instagram</a>
          <a href={settings.website} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-amber-600">Website</a>
        </div>
        <p className="mt-6 text-stone-400">© {new Date().getFullYear()} Giuseppe&apos;s Restaurant</p>
      </div>
    </footer>
  );
}

interface MobileCTABarProps {
  settings: RestaurantSettings;
}

export function MobileCTABar({ settings }: MobileCTABarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-100 bg-white/90 backdrop-blur-md px-4 py-3 md:hidden">
      <div className="flex gap-2">
        <a href={settings.phoneHref} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-amber-600 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-600/20"><Phone className="h-4 w-4" /> Call</a>
        <a href={settings.maps} target="_blank" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-stone-200 py-3 text-sm font-semibold"><Navigation className="h-4 w-4" /> Directions</a>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <Reveal>
      <section className="py-8">
        <p className="text-sm font-medium tracking-widest uppercase text-amber-600">About</p>
        <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Italian tradition since 1992</h2>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          Giuseppe&apos;s is a husband-wife tandem of Italian-American Joseph Bonavitacola and Taclobanon Cathy Añover, opened in October 1992. Joseph inherited the Italian cooking tradition from Guardia Dei Lombardi, Avellino, Italy. We serve fresh, flavorful Italian dishes — USDA Choice beef, Monterey pork and chicken, fresh never frozen fish, and extra virgin olive oil imported from Southern Italy.
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-stone-400">
          <Wine className="h-4 w-4" /> Wine list · Italian imports · Wood-fired oven
        </div>
      </section>
    </Reveal>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-xl md:bottom-8"
    >
      {message}
    </motion.div>
  );
}
