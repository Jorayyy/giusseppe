"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";
import { SplitText } from "./SplitText";
import { OpenIndicator } from "./OpenIndicator";

interface HeroCarouselProps {
  photos: string[];
  settings: RestaurantSettings;
  isOpen: boolean;
  onScroll: (id: string) => void;
}

export function HeroCarousel({ photos, settings, isOpen, onScroll }: HeroCarouselProps) {
  const [photo, setPhoto] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setPhoto((p) => (p + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setPhoto((p) => (p - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={photo}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={photos[photo]}
            alt={`${settings.name} Restaurant`}
            className="h-full w-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = photos[0]; }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 text-center text-white px-4">
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm font-medium tracking-[0.3em] uppercase text-white/60"
          >
            Est. {settings.since}
          </motion.p>

          <SplitText
            text="Giuseppe's"
            className="font-serif text-6xl font-bold tracking-tight sm:text-8xl italic"
            delay={0.5}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-lg text-white/70 sm:text-xl"
          >
            {settings.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center justify-center gap-4 pt-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {settings.rating} · {settings.reviews} reviews
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <OpenIndicator isOpen={isOpen} />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href={settings.phoneHref}
              className="rounded-full bg-amber-600 px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-600/30 transition-all hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-600/40"
            >
              Call to Reserve
            </a>
            <button
              onClick={() => onScroll("menu")}
              className="rounded-full border-2 border-white/20 px-10 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
            >
              View Menu
            </button>
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > photo ? 1 : -1); setPhoto(i); }}
            className={`rounded-full transition-all duration-500 ${i === photo ? "w-8 h-2 bg-white" : "h-2 w-2 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/40 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/40 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
