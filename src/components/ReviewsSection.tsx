"use client";

import { Star } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";
import { REVIEWS } from "@/lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "./Reveal";

interface ReviewsSectionProps {
  settings: RestaurantSettings;
}

export function ReviewsSection({ settings }: ReviewsSectionProps) {
  return (
    <section id="reviews">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Reviews</p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">What people say</h2>
          </div>
          <a href={settings.google} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
            See all on Google →
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-4xl font-bold">{settings.rating}</span>
          <div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-5 w-5 ${s <= Math.round(settings.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
              ))}
            </div>
            <p className="mt-1 text-sm text-stone-500">{settings.reviews} Google reviews</p>
          </div>
        </div>
      </Reveal>

      <StaggerContainer className="mt-6 space-y-4" stagger={0.1}>
        {REVIEWS.map((r, i) => (
          <StaggerItem key={i}>
            <div className="rounded-2xl bg-stone-50 p-5 transition-all hover:bg-stone-100 hover:shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{r.name}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                  ))}
                </div>
                <span className="text-xs text-stone-400">{r.date}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{r.text}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Reveal delay={0.3}>
        <div className="mt-6 flex gap-3">
          <a href={settings.google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> All Google Reviews
          </a>
          <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm">
            Facebook
          </a>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium transition-all hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm">
            Instagram
          </a>
        </div>
      </Reveal>
    </section>
  );
}
