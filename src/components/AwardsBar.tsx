"use client";

import { Star, Award, Trophy } from "lucide-react";
import { Reveal } from "./Reveal";

export function AwardsBar() {
  return (
    <section className="py-16 bg-stone-50">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Recognition</p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Award-winning dining</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Google */}
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <Star className="h-6 w-6 fill-red-500 text-red-500" />
              </div>
              <p className="mt-3 font-serif text-2xl font-bold">4.4</p>
              <p className="text-xs text-stone-500">Google Rating</p>
              <p className="mt-1 text-[10px] text-stone-400">328 reviews</p>
            </div>

            {/* TripAdvisor */}
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <p className="mt-3 font-serif text-2xl font-bold">4.2</p>
              <p className="text-xs text-stone-500">TripAdvisor</p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5">
                <Trophy className="h-3 w-3 text-green-600" />
                <span className="text-[10px] font-medium text-green-700">Travelers&apos; Choice</span>
              </div>
            </div>

            {/* Menuweb */}
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <Star className="h-6 w-6 fill-blue-500 text-blue-500" />
              </div>
              <p className="mt-3 font-serif text-2xl font-bold">4.3</p>
              <p className="text-xs text-stone-500">Menuweb</p>
              <p className="mt-1 text-[10px] text-stone-400">555 reviews</p>
            </div>

            {/* Restaurant Guru */}
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <p className="mt-3 font-serif text-2xl font-bold">#2</p>
              <p className="text-xs text-stone-500">Restaurant Guru</p>
              <p className="mt-1 text-[10px] text-stone-400">of 811 restaurants</p>
            </div>
          </div>
        </Reveal>

        {/* Featured in */}
        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400">As featured in</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-stone-400">
              <span className="font-serif text-lg font-bold italic text-stone-300">Manila Bulletin</span>
              <span className="font-serif text-lg font-bold italic text-stone-300">Out of Town Blog</span>
              <span className="font-serif text-lg font-bold italic text-stone-300">TripAdvisor</span>
              <span className="font-serif text-lg font-bold italic text-stone-300">HeyPlaces</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
