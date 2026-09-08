"use client";

import type { MenuItem } from "@/lib/types";

interface DishCardProps {
  item: MenuItem;
  fallbackImg: string;
  onClick: (item: MenuItem) => void;
}

export function DishCard({ item, fallbackImg, onClick }: DishCardProps) {
  return (
    <button onClick={() => onClick(item)} className="group overflow-hidden rounded-2xl border border-stone-100 bg-white text-left transition hover:shadow-lg">
      <div className="relative h-36 overflow-hidden">
        <img src={item.img} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }} />
        {item.popular && <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow">Popular</span>}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-tight">{item.name}</h3>
        <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.desc}</p>
        <p className="mt-2 text-sm font-bold text-amber-700">{item.price}</p>
      </div>
    </button>
  );
}
