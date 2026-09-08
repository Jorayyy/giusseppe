"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { RestaurantSettings } from "@/lib/types";
import { Reveal } from "./Reveal";

interface GalleryProps {
  photos: string[];
  settings: RestaurantSettings;
}

export function PhotoGallery({ photos, settings }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 mb-10">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Gallery</p>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">A taste of Giuseppe&apos;s</h2>
        </Reveal>
      </div>
      <motion.div style={{ x }} className="flex gap-5 px-4">
        {photos.map((photo, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="relative h-64 w-80 shrink-0 overflow-hidden rounded-3xl sm:h-80 sm:w-[400px] group">
              <img
                src={photo}
                alt={`${settings.name} gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                <p className="text-sm font-medium text-white">Photo {i + 1}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </motion.div>
    </section>
  );
}
