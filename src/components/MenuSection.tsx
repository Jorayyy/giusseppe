"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuData, MenuItem } from "@/lib/types";
import { DishCard } from "./DishCard";

interface MenuSectionProps {
  menu: MenuData;
  onSelectDish: (item: MenuItem) => void;
}

export function MenuSection({ menu, onSelectDish }: MenuSectionProps) {
  const categories = Object.keys(menu);
  const [cat, setCat] = useState<string>(categories[0] ?? "");
  const [showFullMenu, setShowFullMenu] = useState(false);

  const fallbackImg = menu[categories[0]]?.[0]?.img ?? "/photos/google/placejoys-1.jpg";

  return (
    <>
      <section id="menu">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Menu</p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Explore our dishes</h2>
          </div>
          <button
            onClick={() => setShowFullMenu(true)}
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Full menu →
          </button>
        </div>

        {/* Category tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                cat === c
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu grid with crossfade */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3"
            >
              {(menu[cat] ?? []).map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <DishCard item={item} fallbackImg={fallbackImg} onClick={onSelectDish} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Full Menu Modal */}
      <AnimatePresence>
        {showFullMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowFullMenu(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white/90 px-6 py-4 backdrop-blur-md">
                <h2 className="font-serif text-xl font-bold">Full Menu</h2>
                <button
                  onClick={() => setShowFullMenu(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Category tabs */}
              <div className="flex gap-2 overflow-x-auto border-b border-stone-100 px-6 py-3 scrollbar-hide">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      cat === c ? "bg-zinc-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {(menu[cat] ?? []).map((item) => (
                      <button
                        key={item.name}
                        onClick={() => { onSelectDish(item); setShowFullMenu(false); }}
                        className="flex w-full gap-4 rounded-xl bg-stone-50 p-3 text-left transition-all hover:bg-stone-100 hover:shadow-sm"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded-lg object-cover"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {item.name}
                            {item.popular && (
                              <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700">
                                Popular
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-stone-500">{item.desc}</p>
                          <p className="mt-1 text-sm font-bold text-amber-700">{item.price}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-stone-100 px-6 py-3">
                <p className="text-center text-xs text-stone-400">
                  Prices may vary. Full menu available at the restaurant.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
