"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";
import { REVIEWS } from "@/lib/data";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

interface ReviewsSectionProps {
  settings: RestaurantSettings;
}

export function ReviewsSection({ settings }: ReviewsSectionProps) {
  return (
    <motion.section id="reviews" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <a href={settings.google} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-amber-600 hover:text-amber-700">See all on Google →</a>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-3xl font-bold">{settings.rating}</span>
        <div>
          <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-4 w-4 ${s <= Math.round(settings.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />)}</div>
          <p className="text-xs text-stone-500">{settings.reviews} Google reviews</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {REVIEWS.map((r, i) => (
          <div key={i} className="rounded-xl bg-stone-50 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{r.name}</span>
              <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />)}</div>
              <span className="text-xs text-stone-400">{r.date}</span>
            </div>
            <p className="mt-1 text-sm text-stone-600">{r.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <a href={settings.google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> All Google Reviews</a>
        <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">Facebook</a>
        <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">Instagram</a>
      </div>
    </motion.section>
  );
}
