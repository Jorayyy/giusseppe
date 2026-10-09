"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "@/components/section-header";
import { PHOTOS, fetchPhotos } from "@/lib/data";

export default function Gallery() {
  const [photos, setPhotos] = useState<string[]>(PHOTOS);
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPhotos().then((p) => {
      if (!cancelled && p.length > 0) setPhotos(p);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const close = useCallback(() => setIdx(null), []);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % photos.length)), [photos.length]);
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx, close, next, prev]);

  return (
    <section id="gallery" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <SectionHeader
          eyebrow="The room & the table"
          title="Photos from the restaurant"
          lede="Shot at our tables, not in a studio — the food, the room, and a few regulars."
        />

        <div className="mt-12 grid grid-cols-3 gap-3" data-reveal>
          {photos.map((photo, i) => (
            <button
              key={`${photo}-${i}`}
              type="button"
              onClick={() => setIdx(i)}
              className={`group relative overflow-hidden rounded-sm bg-stone-100 ${i === 0 ? "col-span-2 row-span-2" : "aspect-square"}`}
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={photo}
                alt={`Giuseppe's photo ${i + 1}`}
                fill={i === 0}
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${i === 0 ? "" : "absolute inset-0"}`}
                {...(i !== 0 ? { loading: "lazy" as const } : {})}
              />
            </button>
          ))}
        </div>
      </div>

      {idx !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white md:left-8"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <div className="relative h-full w-full max-w-5xl px-16 py-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[idx]}
              alt={`Giuseppe's photo ${idx + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white md:right-8"
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.14em] text-white/60">
            {idx + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
