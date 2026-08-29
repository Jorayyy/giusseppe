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
  QrCode,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

const DEFAULT_MENU: Record<string, { name: string; price: string; desc: string; popular?: boolean; image?: string }[]> = {
  Antipasti: [
    { name: "Focaccia", price: "₱180", desc: "Warm house-baked flatbread, rosemary, olive oil", popular: true },
    { name: "Bruschetta al Pomodoro", price: "₱320", desc: "Grilled sourdough, fresh tomatoes, basil, extra virgin olive oil", popular: true },
    { name: "Calamari Fritti", price: "₱480", desc: "Lightly fried squid, lemon aioli, marinara" },
  ],
  "Wood-Fired Pizza": [
    { name: "Margherita", price: "₱420", desc: "San Marzano tomato, fresh mozzarella, basil", popular: true },
    { name: "Prosciutto e Rucola", price: "₱520", desc: "Parma ham, wild arugula, parmesan shavings" },
  ],
  Primi: [
    { name: "Spaghetti Puttanesca", price: "₱420", desc: "Tomato sauce, olives, capers, anchovies, garlic", popular: true },
    { name: "Lasagna", price: "₱480", desc: "Layers of pasta, beef ragù, béchamel, mozzarella, parmesan", popular: true },
  ],
  Secondi: [
    { name: "Grilled Pork Chop", price: "₱580", desc: "Marinated bone-in pork chop, garlic mashed potatoes, vegetables", popular: true },
    { name: "Chicken Milanese", price: "₱480", desc: "Crispy breaded chicken breast, Marsala sauce, pasta", popular: true },
  ],
  Dolci: [
    { name: "Tiramisu", price: "₱320", desc: "Espresso-soaked savoiardi, mascarpone cream, cocoa", popular: true },
  ],
  Drinks: [
    { name: "House Wine (Red/White)", price: "₱280", desc: "Selected Italian wine, glass" },
  ],
};

const QUICK_ACTIONS = [
  { label: "Sales Dashboard", href: "/admin/sales", icon: BarChart3, color: "bg-amber-600" },
  { label: "Edit Menu", href: "/admin/menu", icon: UtensilsCrossed, color: "bg-blue-500" },
  { label: "Edit Hours", href: "/admin/hours", icon: Clock, color: "bg-emerald-500" },
  { label: "Edit Photos", href: "/admin/photos", icon: Camera, color: "bg-purple-500" },
  { label: "Settings", href: "/admin/settings", icon: Settings, color: "bg-stone-600" },
];

export default function AdminDashboard() {
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const m = localStorage.getItem("giuseppe_menu");
      if (m) setMenu(JSON.parse(m));
    } catch {}
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <UtensilsCrossed className="h-5 w-5 text-amber-600" />
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <UtensilsCrossed className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{totalCategories}</p>
          <p className="text-sm text-stone-500">Categories</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{popularItems}</p>
          <p className="text-sm text-stone-500">Popular Items</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Camera className="h-5 w-5 text-purple-600" />
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
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color} text-white`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-stone-900 group-hover:text-amber-700 transition">{action.label}</p>
                <p className="text-xs text-stone-500">Manage</p>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-amber-600 transition" />
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
              Photo Menu — giusseppe.vercel.app/menu
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
          <Link href="/admin/menu" className="text-sm font-medium text-amber-600 hover:text-amber-700">
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
                <span className="font-semibold text-amber-700">{item.price}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}