"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";

interface HeroCarouselProps {
  photos: string[];
  settings: RestaurantSettings;
  isOpen: boolean;
  onScroll: (id: string) => void;
}

export function HeroCarousel({ photos, settings, isOpen, onScroll }: HeroCarouselProps) {
  const [photo, setPhoto] = useState(0);

  return (
    <section id="hero" className="relative h-[85vh] w-full overflow-hidden">
      <motion.div key={photo} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
        <img src={photos[photo]} alt={`${settings.name} Restaurant`} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = photos[0]; }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center text-white px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-2">Est. {settings.since}</p>
          <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-7xl italic">Giuseppe&apos;s</h1>
          <p className="mt-2 text-lg text-white/80">{settings.tagline}</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {settings.rating} · {settings.reviews} reviews</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${isOpen ? "bg-emerald-500" : "bg-white/20"}`}><Clock className="h-4 w-4" /> {isOpen ? "Open now" : "Closed"}</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={settings.phoneHref} className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700">Call to Reserve</a>
            <button onClick={() => onScroll("menu")} className="rounded-full border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View Menu</button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {photos.map((_, i) => (<button key={i} onClick={() => setPhoto(i)} className={`h-1.5 rounded-full transition-all ${i === photo ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />))}
      </div>
      <button onClick={() => setPhoto((p) => (p + 1) % photos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"><ChevronRight className="h-5 w-5" /></button>
      <button onClick={() => setPhoto((p) => (p - 1 + photos.length) % photos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"><ChevronLeft className="h-5 w-5" /></button>
    </section>
  );
}
