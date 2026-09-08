"use client";

import { Flame, Wine, Gift, Store, Utensils, Users, Wifi, Car, Baby } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./Reveal";
import { FEATURES } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  wine: Wine,
  gift: Gift,
  store: Store,
  utensils: Utensils,
  users: Users,
  wifi: Wifi,
  car: Car,
  baby: Baby,
};

export function FeaturesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Experience</p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">More than a meal</h2>
            <p className="mt-3 text-stone-500">Everything that makes Giuseppe&apos;s special</p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3" stagger={0.08}>
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Utensils;
            return (
              <StaggerItem key={feature.title}>
                <div className="group rounded-3xl border border-stone-100 bg-white p-6 transition-all hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-stone-900">{feature.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">{feature.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Amaretto highlight */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 sm:p-10 border border-amber-100">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/30">
                <Gift className="h-7 w-7" />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <h3 className="font-serif text-xl font-bold text-amber-900">Complimentary Amaretto</h3>
                <p className="mt-2 text-sm leading-relaxed text-amber-800/70">
                  Every meal at Giuseppe&apos;s ends with a complimentary glass of Amaretto digestif — a warm Italian tradition that&apos;s become our signature gesture of hospitality. It&apos;s the little things that make a meal memorable.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Private dining & events */}
        <Reveal delay={0.4}>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-8 text-white">
              <Users className="h-8 w-8 text-amber-400" />
              <h3 className="mt-4 font-serif text-xl font-bold">Private Dining</h3>
              <p className="mt-2 text-sm text-white/60">
                Our second floor accommodates 25-50 guests for intimate gatherings, birthday celebrations, and corporate dinners. Full course Italian menus available.
              </p>
              <p className="mt-4 text-xs text-white/40">Reserve via call or Facebook message</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-stone-900 to-zinc-800 p-8 text-white">
              <Store className="h-8 w-8 text-amber-400" />
              <h3 className="mt-4 font-serif text-xl font-bold">Italian Deli & Shop</h3>
              <p className="mt-2 text-sm text-white/60">
                Take a piece of Italy home. We stock imported olive oils, balsamic vinegar, Italian cheeses, cold cuts, wines, and specialty items — all directly from Italy.
              </p>
              <p className="mt-4 text-xs text-white/40">Available in-restaurant</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
