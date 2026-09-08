"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

export function SplitAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <motion.img
                  style={{ y }}
                  src="/photos/google/placejoys-4.jpg"
                  alt="Giuseppe's interior"
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-amber-600 px-6 py-4 text-white shadow-xl">
                <p className="font-serif text-3xl font-bold">30+</p>
                <p className="text-sm text-white/80">Years serving</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Our Story</p>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Three decades of Italian tradition in Tacloban
              </h2>
              <div className="space-y-4 text-stone-600">
                <p className="leading-relaxed">
                  Giuseppe&apos;s is a husband-wife tandem of Italian-American Joseph Bonavitacola and Taclobanon Cathy Añover, opened in October 1992.
                </p>
                <p className="leading-relaxed">
                  Joseph inherited the Italian cooking tradition from Guardia Dei Lombardi, Avellino, Italy. We serve fresh, flavorful Italian dishes — USDA Choice beef, Monterey pork and chicken, fresh never frozen fish, and extra virgin olive oil imported from Southern Italy.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-amber-600">10K+</p>
                  <p className="text-xs text-stone-500">Plates served</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-amber-600">4.4</p>
                  <p className="text-xs text-stone-500">Google rating</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-amber-600">315+</p>
                  <p className="text-xs text-stone-500">Happy reviews</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
