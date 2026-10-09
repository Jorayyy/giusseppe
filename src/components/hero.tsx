"use client";

import { Star, Clock, ChevronRight, Camera } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

type HeroProps = {
  photos: string[];
  photoIdx: number;
  setPhotoIdx: (i: number) => void;
  open: boolean;
  onShowLightbox: () => void;
};

export default function Hero({ photos, photoIdx, setPhotoIdx, open, onShowLightbox }: HeroProps) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-stone-900">
            <img src={photos[photoIdx]} alt="Giuseppe's" className="h-[240px] sm:h-[300px] lg:h-[360px] w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Giuseppe&apos;s</h1>
              <p className="mt-1 text-white/80">{RESTAURANT.tagline} · {RESTAURANT.priceRange} · Restaurant</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-900">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {RESTAURANT.rating} · {RESTAURANT.reviewCount} Google reviews
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${open ? "bg-emerald-500 text-white" : "bg-white/90 text-stone-900"}`}>
                  <Clock className="h-4 w-4" /> {open ? "Open now" : "Closed"} · Opens 11 AM
                </span>
              </div>
            </div>
            <div className="absolute right-3 top-3 flex gap-2">
              <button onClick={() => setPhotoIdx((photoIdx + 1) % photos.length)} className="rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"><ChevronRight className="h-5 w-5" /></button>
            </div>
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {photos.map((_, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)} className={`h-1.5 rounded-full transition-all ${i === photoIdx ? "w-6 bg-white" : "w-1.5 bg-white/60"}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <div className="overflow-hidden rounded-2xl"><img src={photos[1]} className="h-[120px] sm:h-[150px] lg:h-[172px] w-full object-cover" alt="" /></div>
          <div className="relative overflow-hidden rounded-2xl">
            <img src={photos[2]} className="h-[120px] sm:h-[150px] lg:h-[172px] w-full object-cover" alt="" />
            <button onClick={onShowLightbox} className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 text-sm font-medium text-white opacity-100 sm:opacity-0 transition sm:hover:opacity-100">
              <Camera className="h-4 w-4" /> See all photos
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
