"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import type { MenuItem, RestaurantSettings } from "@/lib/types";

interface DishModalProps {
  dish: MenuItem | null;
  fallbackImg: string;
  settings: RestaurantSettings;
  onClose: () => void;
}

export function DishModal({ dish, fallbackImg, settings, onClose }: DishModalProps) {
  return (
    <AnimatePresence>
      {dish && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={onClose}>
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-t-2xl bg-white sm:rounded-2xl">
            <div className="relative h-56">
              <img src={dish.img} alt={dish.name} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }} />
              <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold">{dish.name}</h3>
              <p className="mt-1 text-sm text-stone-500">{dish.desc}</p>
              <p className="mt-3 text-2xl font-bold text-amber-700">{dish.price}</p>
              <div className="mt-4 flex gap-2">
                <a href={settings.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-600 py-3 text-sm font-semibold text-white transition hover:bg-amber-700">
                  <Phone className="h-4 w-4" /> Call to Order
                </a>
                <button onClick={onClose} className="rounded-full border border-stone-200 px-4 py-3 text-sm font-medium transition hover:bg-stone-50">Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
