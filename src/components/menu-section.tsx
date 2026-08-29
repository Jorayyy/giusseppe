"use client";

import { useState } from "react";
import { UtensilsCrossed, QrCode, ExternalLink } from "lucide-react";
import { MENU } from "@/lib/data";

export default function MenuSection() {
  const [menuCat, setMenuCat] = useState<keyof typeof MENU>("Antipasti");

  return (
    <section id="menu" className="rounded-2xl border border-stone-200 bg-white p-6 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">Menu</h2>
        <button className="text-sm font-medium text-primary hover:text-primary-light">View full menu →</button>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-stone-300 bg-surface/50 px-3 py-2 text-xs text-primary">
        <QrCode className="h-3.5 w-3.5" />
        <span>At the restaurant? <a href="/qr" className="font-semibold underline decoration-accent underline-offset-2 hover:text-primary">Scan table QR</a> for the live menu</span>
        <a href="/qr" className="ml-auto hidden items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium shadow-sm sm:inline-flex">Open QR <ExternalLink className="h-3 w-3" /></a>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {Object.keys(MENU).map((cat) => (
          <button
            key={cat}
            onClick={() => setMenuCat(cat as keyof typeof MENU)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${menuCat === cat ? "bg-zinc-900 text-white" : "bg-stone-100 hover:bg-stone-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mt-4 divide-y divide-stone-100">
        {MENU[menuCat].map((item) => (
          <div key={item.name} className="flex gap-4 py-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                {item.popular && <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-light">Popular</span>}
              </div>
              <p className="mt-0.5 text-xs leading-5 text-stone-500">{item.desc}</p>
            </div>
            <span className="text-sm font-semibold text-zinc-900">{item.price}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-surface/50 p-3">
        <UtensilsCrossed className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs text-primary">Browse the full menu with photos, allergens & pricing</span>
      </div>
    </section>
  );
}
