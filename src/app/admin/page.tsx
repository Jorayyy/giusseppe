"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Clock,
  Camera,
  Settings,
  TrendingUp,
  Star,
  Copy,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { MENU } from "@/lib/data";

const QUICK_ACTIONS = [
  { label: "Sales Dashboard", href: "/admin/sales", icon: BarChart3, color: "bg-primary text-white" },
  { label: "Edit Menu", href: "/admin/menu", icon: UtensilsCrossed, color: "bg-surface text-primary" },
  { label: "Edit Hours", href: "/admin/hours", icon: Clock, color: "bg-surface text-primary" },
  { label: "Edit Photos", href: "/admin/photos", icon: Camera, color: "bg-surface text-primary" },
  { label: "Settings", href: "/admin/settings", icon: Settings, color: "bg-surface text-primary" },
];

export default function AdminDashboard() {
  const [menu, setMenu] = useState(MENU);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        if (!json.data || Object.keys(json.data).length === 0) throw new Error("empty");
        if (!cancelled) setMenu(json.data);
        return;
      } catch {}
      try {
        const m = localStorage.getItem("giuseppe_menu");
        if (m && !cancelled) setMenu(JSON.parse(m));
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalItems = Object.values(menu).flat().length;
  const totalCategories = Object.keys(menu).length;
  const popularItems = Object.values(menu).flat().filter((i) => i.popular).length;

  const copyLink = () => {
    navigator.clipboard.writeText("https://giusseppe.vercel.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Dashboard</h1>
        <p className="mt-1 text-stone-500">Welcome back. Here&apos;s an overview of your restaurant.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3 w-3" /> Active
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{totalItems}</p>
          <p className="text-sm text-stone-500">Menu Items</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{totalCategories}</p>
          <p className="text-sm text-stone-500">Categories</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
              <Star className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{popularItems}</p>
          <p className="text-sm text-stone-500">Popular Items</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/25">
              <Camera className="h-5 w-5 text-stone-800" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">4.4</p>
          <p className="text-sm text-stone-500">Google Rating</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-stone-900 group-hover:text-primary-light transition">{action.label}</p>
                <p className="text-xs text-stone-500">Manage</p>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-primary transition" />
            </Link>
          ))}
        </div>
      </div>

      {/* Live Preview & Links */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Website Preview */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900">Website</h3>
          <p className="mt-1 text-sm text-stone-500">Your restaurant website is live and ready.</p>
          <div className="mt-4 space-y-2">
            <a
              href="https://giusseppe.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-700 hover:bg-stone-100 transition"
            >
              <ExternalLink className="h-4 w-4 text-stone-400" />
              giusseppe.vercel.app
            </a>
            <a
              href="https://giusseppe.vercel.app/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-700 hover:bg-stone-100 transition"
            >
              <UtensilsCrossed className="h-4 w-4 text-stone-400" />
              Menu — giusseppe.vercel.app/menu
            </a>
          </div>
          <button
            onClick={copyLink}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Website Link
              </>
            )}
          </button>
        </div>

        {/* QR Code */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900">QR Code</h3>
          <p className="mt-1 text-sm text-stone-500">Scan to open the menu on a phone.</p>
          <div className="mt-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://giusseppe.vercel.app/menu"
              alt="QR Code"
              className="rounded-xl"
            />
          </div>
          <p className="mt-3 text-center text-xs text-stone-400">Points to /menu</p>
        </div>
      </div>

      {/* Popular Items Preview */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-stone-900">Popular Items</h3>
          <Link href="/admin/menu" className="text-sm font-medium text-primary hover:text-primary-light">
            View all →
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {Object.entries(menu)
            .flatMap(([cat, items]) => items.filter((i) => i.popular).map((i) => ({ ...i, category: cat })))
            .slice(0, 5)
            .map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3">
                <div>
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-500">{item.category}</p>
                </div>
                <span className="font-semibold text-primary-light">{item.price}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}