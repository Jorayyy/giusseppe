"use client";

import { motion } from "framer-motion";
import { Phone, Navigation, MapPin, Clock, ExternalLink, Wine, Bookmark, BookmarkCheck, Share2, Check, UtensilsCrossed } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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
      <div className="flex flex-wrap gap-2">
        <a href={settings.maps} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
        <a href={settings.phoneHref} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><Phone className="h-4 w-4" /> Call</a>
        <button onClick={onShowFullMenu} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><UtensilsCrossed className="h-4 w-4" /> Full Menu</button>
        <button onClick={onToggleSave} className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${saved ? "border-amber-200 bg-amber-50 text-amber-700" : "border-stone-200 hover:bg-stone-50"}`}>{saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />} {saved ? "Saved" : "Save"}</button>
        <button onClick={onShare} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">{copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />} {copied ? "Copied" : "Share"}</button>
      </div>
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
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl bg-zinc-900 p-6 text-white">
        <h3 className="text-lg font-bold">Reserve a table</h3>
        <p className="mt-1 text-sm text-white/60">Especially for Friday &amp; Saturday nights.</p>
        <a href={settings.phoneHref} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"><Phone className="h-4 w-4" /> Call to Reserve</a>
        <p className="mt-2 text-center text-[11px] text-white/40">{settings.phone}</p>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl border border-stone-200 p-6">
        <h3 className="font-bold">Contact</h3>
        <div className="mt-3 space-y-3 text-sm">
          <a href={settings.maps} target="_blank" className="flex gap-3 hover:text-amber-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" /><span>{settings.address}<br /><span className="text-amber-600">Get directions</span></span></a>
          <a href={settings.phoneHref} className="flex items-center gap-3 hover:text-amber-600"><Phone className="h-4 w-4 text-stone-400" /> {settings.phone}</a>
          <div className="flex items-center gap-3 text-stone-600"><Clock className="h-4 w-4 text-stone-400" />{isOpen ? "Open" : "Closed"}</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={settings.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2 text-sm font-medium text-white transition hover:bg-amber-700"><Phone className="h-4 w-4" /> Call</a>
          <a href={settings.maps} target="_blank" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2 text-sm font-medium transition hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
        </div>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="overflow-hidden rounded-2xl border border-stone-200">
        <iframe title="map" src="https://maps.google.com/maps?q=173%20Avenida%20Veteranos%20Tacloban%20City&z=15&output=embed" className="h-64 w-full border-0" loading="lazy" />
        <a href={settings.maps} target="_blank" className="flex items-center justify-center gap-1 border-t border-stone-200 py-3 text-sm font-medium transition hover:bg-stone-50"><ExternalLink className="h-4 w-4" /> Open in Maps</a>
      </motion.div>
    </div>
  );
}

interface FooterProps {
  settings: RestaurantSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="border-t border-stone-100 py-6 text-center text-xs text-stone-400">
      © {new Date().getFullYear()} {settings.name} · Est. {settings.since} · {settings.address}
      <div className="mt-2 flex items-center justify-center gap-3">
        <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">Facebook</a>
        <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">Instagram</a>
        <a href={settings.website} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">Website</a>
      </div>
    </footer>
  );
}

interface MobileCTABarProps {
  settings: RestaurantSettings;
}

export function MobileCTABar({ settings }: MobileCTABarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-100 bg-white px-4 py-3 md:hidden">
      <div className="flex gap-2">
        <a href={settings.phoneHref} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2.5 text-sm font-semibold text-white"><Phone className="h-4 w-4" /> Call</a>
        <a href={settings.maps} target="_blank" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2.5 text-sm font-semibold"><Navigation className="h-4 w-4" /> Directions</a>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="text-2xl font-bold">About</h2>
      <p className="mt-2 text-sm leading-7 text-stone-600">
        Giuseppe&apos;s is a husband-wife tandem of Italian-American Joseph Bonavitacola and Taclobanon Cathy Añover, opened in October 1992. Joseph inherited the Italian cooking tradition from Guardia Dei Lombardi, Avellino, Italy. We serve fresh, flavorful Italian dishes — USDA Choice beef, Monterey pork and chicken, fresh never frozen fish, and extra virgin olive oil imported from Southern Italy.
      </p>
      <div className="mt-3 flex items-center gap-2 text-xs text-stone-400"><Wine className="h-3.5 w-3.5" /> Wine list · Italian imports · Wood-fired oven</div>
    </motion.section>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg md:bottom-8">{message}</div>;
}
