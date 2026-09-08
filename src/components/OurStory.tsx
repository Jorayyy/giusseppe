"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Our Story</p>
          <SplitText
            text="Three decades of Italian tradition in Tacloban"
            className="mt-3 font-serif text-3xl font-bold sm:text-5xl"
            delay={0.2}
            tag="h2"
          />
        </Reveal>

        {/* Main story grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <motion.img
                  style={{ y: imgY }}
                  src="/photos/google/placejoys-4.jpg"
                  alt="Giuseppe's interior"
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 rounded-3xl bg-amber-600 px-8 py-6 text-white shadow-2xl shadow-amber-600/30">
                <p className="font-serif text-4xl font-bold">33+</p>
                <p className="mt-1 text-sm text-white/80">Years of tradition</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-6 lg:pl-8">
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  In October 1992, Italian-American <strong className="text-stone-900">Joseph Bonavitacola</strong> and Taclobanon <strong className="text-stone-900">Cathy Añover</strong> opened the doors of Giuseppe&apos;s — bringing the authentic flavors of Guardia Dei Lombardi, Avellino, Italy to Tacloban City.
                </p>
                <p>
                  Joseph inherited the Italian cooking tradition from his family, and for over three decades, Giuseppe&apos;s has been Tacloban&apos;s beloved Italian institution. Through typhoons, pandemics, and the passage of time, we&apos;ve remained a constant — a place where families gather, friendships deepen, and memories are made over plates of handmade pasta and wood-fired pizza.
                </p>
              </div>

              {/* Timeline milestones */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-serif text-sm font-bold text-amber-700">92</div>
                  <div>
                    <p className="font-semibold text-stone-900">Founded</p>
                    <p className="text-sm text-stone-500">Opened October 1992 on Avenida Veteranos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-serif text-sm font-bold text-amber-700">13</div>
                  <div>
                    <p className="font-semibold text-stone-900">Survived Yolanda</p>
                    <p className="text-sm text-stone-500">Rebuilt after the devastating 2013 typhoon — stronger than ever</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-serif text-sm font-bold text-amber-700">25</div>
                  <div>
                    <p className="font-semibold text-stone-900">Next Generation</p>
                    <p className="text-sm text-stone-500">Giuseppe &quot;Tepi&quot; Bonavitacola, Enderun Culinary Arts grad, joins the kitchen</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chef spotlight */}
        <Reveal delay={0.2}>
          <div className="mt-20 rounded-3xl bg-zinc-900 p-8 sm:p-12 text-white">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-amber-400">Meet the Chef</p>
                <h3 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">Giuseppe &quot;Tepi&quot; Bonavitacola</h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  The torch has been passed to the next generation. Tepi, Joseph&apos;s son, trained at Enderun Culinary Arts and brings fresh energy to the family legacy — experimenting with Filipino-Vietnamese fusion while honoring the Italian traditions that made Giuseppe&apos;s an institution.
                </p>
                <p className="mt-4 leading-relaxed text-white/70">
                  &quot;We&apos;re not just a restaurant. We&apos;re a family that feeds a city.&quot;
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/photos/google/placejoys-2.jpg"
                  alt="Chef Tepi in the kitchen"
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-serif text-lg font-bold">Also by the family</p>
                  <p className="text-sm text-white/70">Pasqualino&apos;s Ristorante Italiano, Samar</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Resilience story */}
        <Reveal delay={0.3}>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-3xl bg-stone-50 p-8 text-center">
              <p className="font-serif text-3xl font-bold text-amber-600">10,000+</p>
              <p className="mt-2 text-sm text-stone-500">Plates served yearly</p>
            </div>
            <div className="rounded-3xl bg-stone-50 p-8 text-center">
              <p className="font-serif text-3xl font-bold text-amber-600">3 Generations</p>
              <p className="mt-2 text-sm text-stone-500">Of Italian cooking tradition</p>
            </div>
            <div className="rounded-3xl bg-stone-50 p-8 text-center">
              <p className="font-serif text-3xl font-bold text-amber-600">1 City</p>
              <p className="mt-2 text-sm text-stone-500">That calls us home</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
