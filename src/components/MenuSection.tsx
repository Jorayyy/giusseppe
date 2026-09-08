"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { MenuData, MenuItem } from "@/lib/types";
import { DishCard } from "./DishCard";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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
      <motion.section id="menu" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Menu Highlights</h2>
          <button onClick={() => setShowFullMenu(true)} className="text-sm font-medium text-amber-600 hover:text-amber-700">Full menu →</button>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-zinc-900 text-white" : "bg-stone-100 hover:bg-stone-200"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(menu[cat] ?? []).map((item) => (
            <DishCard key={item.name} item={item} fallbackImg={fallbackImg} onClick={onSelectDish} />
          ))}
        </div>
      </motion.section>

      {showFullMenu && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
            <button onClick={() => setShowFullMenu(false)} className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-amber-600"><ArrowLeft className="h-4 w-4" /> Back</button>
            <h2 className="text-lg font-bold">Full Menu</h2>
            <div className="w-16" />
          </div>
          <div className="mx-auto max-w-2xl p-4">
            <div className="flex gap-2 overflow-x-auto pb-4 sticky top-14 bg-white z-10 py-3">
              {categories.map((c) => (<button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${cat === c ? "bg-zinc-900 text-white" : "bg-stone-100"}`}>{c}</button>))}
            </div>
            <div className="space-y-4">
              {(menu[cat] ?? []).map((item) => (
                <button key={item.name} onClick={() => { onSelectDish(item); setShowFullMenu(false); }} className="flex w-full gap-4 rounded-xl bg-stone-50 p-3 text-left transition hover:bg-stone-100">
                  <img src={item.img} alt={item.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }} />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name} {item.popular && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700">Popular</span>}</h3>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                    <p className="mt-1 text-sm font-bold text-amber-700">{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-stone-400">Prices may vary. Full menu available at the restaurant.</p>
          </div>
        </div>
      )}
    </>
  );
}
