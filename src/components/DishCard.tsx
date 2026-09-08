"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/lib/types";

interface DishCardProps {
  item: MenuItem;
  fallbackImg: string;
  onClick: (item: MenuItem) => void;
}

export function DishCard({ item, fallbackImg, onClick }: DishCardProps) {
  return (
    <motion.button
      onClick={() => onClick(item)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group overflow-hidden rounded-2xl border border-stone-100 bg-white text-left shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {item.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-lg">
            Popular
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="text-xs font-medium text-white/90">View details →</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-tight group-hover:text-amber-700 transition-colors">{item.name}</h3>
        <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold text-amber-700">{item.price}</p>
          <span className="text-[10px] font-medium text-stone-400 opacity-0 transition-opacity group-hover:opacity-100">Tap to order</span>
        </div>
      </div>
    </motion.button>
  );
}
