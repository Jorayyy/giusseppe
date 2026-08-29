"use client";

import { Sparkles, ShoppingBag, CreditCard, Camera, Clock3, BarChart3, Bot, Eye, Gift, Ticket, Bell, CheckCircle } from "lucide-react";
import Link from "next/link";
import { RESTAURANT } from "@/lib/data";

export default function Roadmap({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <section id="roadmap" className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          <Sparkles className="h-3.5 w-3.5 text-accent" /> Roadmap
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight">What We&apos;re Building</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-stone-500">We&apos;re building more for our Tacloban family — from seamless ordering to AI sommeliers.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-light">Tier 2</span>
            <h3 className="text-sm font-semibold text-stone-700">Order & Delight</h3>
          </div>
          {[
            { icon: ShoppingBag, title: "Online Ordering", desc: "GCash / PayMongo, real-time tracking, pickup & delivery.", live: false },
            { icon: CreditCard, title: "Loyalty Card", desc: "Earn stamps, unlock free tiramisu & wine nights. Digital, no plastic.", live: true, href: "/#loyalty" },
            { icon: Camera, title: "Instagram Feed", desc: "Live #GiuseppesTacloban wall — your photos on our homepage.", live: false },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                {item.live ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    <CheckCircle className="h-3 w-3" /> Live
                  </span>
                ) : (
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Soon</span>
                )}
              </div>
              <h4 className="mt-3 text-sm font-semibold">{item.title}</h4>
              <p className="mt-1 text-xs leading-5 text-stone-500">{item.desc}</p>
              {item.live ? (
                <Link href={item.href || "/"} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
                  <CheckCircle className="h-3.5 w-3.5" /> Try it now
                </Link>
              ) : (
                <button onClick={() => onToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-light">Tier 2</span>
            <h3 className="text-sm font-semibold text-stone-700">Ops & Growth</h3>
          </div>
          {[
            { icon: Clock3, title: "Waitlist & Reminders", desc: "Join the waitlist from your phone, get notified when your table is ready.", live: true, href: "/#waitlist" },
            { icon: BarChart3, title: "Sales Dashboard", desc: "For owners: daily sales, bestsellers & peak hours at a glance.", live: true, href: "/admin/sales" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                {item.live ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    <CheckCircle className="h-3 w-3" /> Live
                  </span>
                ) : (
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Soon</span>
                )}
              </div>
              <h4 className="mt-3 text-sm font-semibold">{item.title}</h4>
              <p className="mt-1 text-xs leading-5 text-stone-500">{item.desc}</p>
              {item.live ? (
                <Link href={item.href || "/"} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
                  <CheckCircle className="h-3.5 w-3.5" /> Try it now
                </Link>
              ) : (
                <button onClick={() => onToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              )}
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50 p-4 text-center">
            <p className="text-xs font-medium text-emerald-700">Tier 2 — Loyalty, Waitlist & Dashboard live!</p>
            <p className="mt-1 text-[11px] text-emerald-600">More features coming soon</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Tier 3</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-light"><Sparkles className="h-3 w-3" /> Wow</span>
            <h3 className="text-sm font-semibold text-stone-700">Magic</h3>
          </div>
          {[
            { icon: Bot, title: "Ask Giuseppe AI", desc: "Chat with our AI sommelier — wine pairings, allergy checks, menu stories.", live: false },
            { icon: Eye, title: "360° Tour", desc: "Walk the terrace & wood-fire oven from your phone. VR-ready.", live: false },
            { icon: Gift, title: "Gift Vouchers", desc: "Send a date-night gift — redeemable for dinner, deliverable via GCash.", live: true, href: "/#vouchers" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                  <item.icon className="h-5 w-5 text-violet-600" />
                </div>
                {item.live ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    <CheckCircle className="h-3 w-3" /> Live
                  </span>
                ) : (
                  <span className="rounded-full bg-violet-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Soon</span>
                )}
              </div>
              <h4 className="mt-3 text-sm font-semibold">{item.title}</h4>
              <p className="mt-1 text-xs leading-5 text-stone-500">{item.desc}</p>
              {item.live ? (
                <Link href={item.href || "/"} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 py-2 text-xs font-medium text-violet-700 hover:bg-violet-100">
                  <CheckCircle className="h-3.5 w-3.5" /> Try it now
                </Link>
              ) : (
                <button onClick={() => onToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-violet-200 bg-white py-2 text-xs font-medium text-violet-700 hover:bg-violet-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              )}
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 p-4 text-center">
            <p className="text-xs font-medium text-stone-600">Tier 3 — when the stars align</p>
            <p className="mt-1 text-[11px] text-stone-400">AI & 360° Tour coming later</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-stone-500">Have an idea? We listen — call us with your wishlist.</p>
        <a href={RESTAURANT.phoneHref} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light">
          Contact us
        </a>
      </div>
    </section>
  );
}
