"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  LogOut,
  UtensilsCrossed,
  Clock,
  Camera,
  Settings,
  Trash2,
  Plus,
  Eye,
  ExternalLink,
  Image,
  Star,
  Check,
} from "lucide-react";
import type { MenuData, HoursData, RestaurantSettings } from "@/lib/types";
import { DEFAULT_MENU, DEFAULT_HOURS, DEFAULT_PHOTOS, DEFAULT_SETTINGS, HOURS_ORDER } from "@/lib/data";

type Tab = "Menu" | "Hours" | "Photos" | "Settings";

const STORAGE_KEY = "giuseppe_admin";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function initAuth(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "1";
}

function initMenu(): MenuData {
  return load("giuseppe_menu", DEFAULT_MENU);
}

function initHours(): HoursData {
  return load("giuseppe_hours", DEFAULT_HOURS);
}

function initPhotos(): string[] {
  const p = load<string[]>("giuseppe_photos", DEFAULT_PHOTOS);
  return Array.isArray(p) && p.length > 0 ? p : DEFAULT_PHOTOS;
}

function initSettings(): RestaurantSettings {
  return { ...DEFAULT_SETTINGS, ...load("giuseppe_settings", {}) };
}

// Flatten menu into array for grid view
function flattenMenu(menu: MenuData): { category: string; index: number; name: string; price: string; desc: string; img: string; popular: boolean }[] {
  const items: { category: string; index: number; name: string; price: string; desc: string; img: string; popular: boolean }[] = [];
  Object.entries(menu).forEach(([cat, dishes]) => {
    dishes.forEach((dish, i) => {
      items.push({ category: cat, index: i, ...dish });
    });
  });
  return items;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(initAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Menu");
  const [toast, setToast] = useState<string | null>(null);
  const [editingImg, setEditingImg] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [catFilter, setCatFilter] = useState<string>("All");

  const [menu, setMenu] = useState<MenuData>(initMenu);
  const [hours, setHours] = useState<HoursData>(initHours);
  const [photos, setPhotos] = useState<string[]>(initPhotos);
  const [settings, setSettings] = useState<RestaurantSettings>(initSettings);

  const categories = ["All", ...Object.keys(menu)];
  const flatItems = flattenMenu(menu);
  const filteredItems = catFilter === "All" ? flatItems : flatItems.filter((i) => i.category === catFilter);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "giuseppe2025") {
      localStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
  };

  const updateDishImg = (category: string, index: number, newImg: string) => {
    const copy = { ...menu };
    copy[category] = [...copy[category]];
    copy[category][index] = { ...copy[category][index], img: newImg };
    setMenu(copy);
    setEditingImg(null);
  };

  const togglePopular = (category: string, index: number) => {
    const copy = { ...menu };
    copy[category] = [...copy[category]];
    copy[category][index] = { ...copy[category][index], popular: !copy[category][index].popular };
    setMenu(copy);
  };

  const deleteDish = (category: string, index: number) => {
    const copy = { ...menu };
    copy[category] = copy[category].filter((_, i) => i !== index);
    setMenu(copy);
  };

  const addDish = (category: string) => {
    const copy = { ...menu };
    copy[category] = [...copy[category], { name: "New Item", price: "₱0", desc: "", img: "/photos/google/placejoys-1.jpg", popular: false }];
    setMenu(copy);
  };

  const saveMenu = () => { save("giuseppe_menu", menu); showToast("Menu saved"); };
  const saveHours = () => { save("giuseppe_hours", hours); showToast("Hours saved"); };
  const savePhotos = () => { save("giuseppe_photos", photos); showToast("Photos saved"); };
  const saveSettings = () => { save("giuseppe_settings", settings); showToast("Settings saved"); };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 font-serif text-lg font-bold text-white italic">G</div>
            <h1 className="mt-3 font-serif text-xl font-bold">Owner Login</h1>
            <p className="mt-1 text-center text-sm text-stone-500">Enter the owner password to access the dashboard.</p>
          </div>
          <div className="mt-6 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              autoFocus
            />
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center rounded-full bg-amber-600 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
              Enter
            </button>
            <Link href="/" className="flex items-center justify-center gap-1.5 pt-2 text-sm text-stone-500 hover:text-amber-600">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900">
      {/* Compact header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 font-serif text-xs font-bold text-white italic">G</div>
            <span className="font-serif text-sm font-bold">Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link href="/" className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium transition hover:bg-stone-50">
              <Eye className="h-3 w-3" /> View
            </Link>
            <button onClick={handleLogout} className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white transition hover:bg-black">
              <LogOut className="h-3 w-3" /> Out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs + Save */}
      <div className="sticky top-[41px] z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex gap-1">
            {(
              [
                { id: "Menu", icon: UtensilsCrossed },
                { id: "Hours", icon: Clock },
                { id: "Photos", icon: Camera },
                { id: "Settings", icon: Settings },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as Tab)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                  tab === t.id ? "bg-amber-600 text-white" : "text-stone-500 hover:bg-stone-100"
                }`}
              >
                <t.icon className="h-3 w-3" /> {t.id}
              </button>
            ))}
          </div>
          <button
            onClick={tab === "Menu" ? saveMenu : tab === "Hours" ? saveHours : tab === "Photos" ? savePhotos : saveSettings}
            className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
          >
            <Save className="h-3 w-3" /> Save {tab}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-4 pb-24">
        {/* MENU TAB — Grid view */}
        {tab === "Menu" && (
          <div>
            {/* Category filter */}
            <div className="mb-4 flex flex-wrap gap-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    catFilter === c ? "bg-zinc-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mb-4 flex items-center gap-4 text-xs text-stone-500">
              <span>{filteredItems.length} dishes</span>
              <span>{flatItems.filter((i) => i.popular).length} popular</span>
              <span>{flatItems.filter((i) => i.img.includes("placejoys") || i.img.includes("wanderlog")).length} need photos</span>
            </div>

            {/* Dish grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredItems.map((item) => (
                <div key={`${item.category}-${item.index}`} className="group rounded-2xl border border-stone-200 bg-white overflow-hidden transition hover:shadow-md">
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/photos/google/placejoys-1.jpg"; }}
                    />
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-1">
                      <button
                        onClick={() => { setEditingImg(`${item.category}-${item.index}`); setImgUrl(item.img); }}
                        className="rounded-full bg-white/90 p-1.5 text-zinc-900 hover:bg-white"
                      >
                        <Image className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => togglePopular(item.category, item.index)}
                        className={`rounded-full p-1.5 hover:bg-white ${item.popular ? "bg-amber-400 text-white" : "bg-white/90 text-zinc-900"}`}
                      >
                        <Star className="h-3 w-3" fill={item.popular ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => deleteDish(item.category, item.index)}
                        className="rounded-full bg-white/90 p-1.5 text-red-500 hover:bg-white"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    {/* Popular badge */}
                    {item.popular && (
                      <span className="absolute left-1.5 top-1.5 rounded bg-amber-500 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">Popular</span>
                    )}
                    {/* Category badge */}
                    <span className="absolute right-1.5 top-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[8px] font-medium text-white backdrop-blur-sm">{item.category}</span>
                  </div>

                  {/* Info */}
                  <div className="p-2.5">
                    <p className="text-xs font-semibold leading-tight line-clamp-1">{item.name}</p>
                    <p className="mt-0.5 text-[10px] text-stone-400 line-clamp-1">{item.desc}</p>
                    <p className="mt-1 text-xs font-bold text-amber-700">{item.price}</p>
                  </div>

                  {/* Inline image URL editor */}
                  {editingImg === `${item.category}-${item.index}` && (
                    <div className="border-t border-stone-100 p-2.5 space-y-1.5">
                      <p className="text-[10px] font-medium text-stone-500">Image URL</p>
                      <input
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[11px] outline-none focus:border-amber-400"
                        autoFocus
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateDishImg(item.category, item.index, imgUrl)}
                          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-amber-600 py-1 text-[10px] font-medium text-white hover:bg-amber-700"
                        >
                          <Check className="h-2.5 w-2.5" /> Apply
                        </button>
                        <button
                          onClick={() => setEditingImg(null)}
                          className="rounded-lg border border-stone-200 px-2 py-1 text-[10px] text-stone-500 hover:bg-stone-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add new dish */}
              {catFilter !== "All" && (
                <button
                  onClick={() => addDish(catFilter)}
                  className="flex h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 text-stone-400 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                >
                  <Plus className="h-5 w-5" />
                  <span className="mt-1 text-xs font-medium">Add dish</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* HOURS TAB */}
        {tab === "Hours" && (
          <div className="rounded-2xl border border-stone-200 bg-white p-4">
            <p className="mb-3 text-xs text-stone-500">Two service windows per day.</p>
            <div className="space-y-2">
              {HOURS_ORDER.map((day) => {
                const h = hours[day] ?? { open: "", close: "", open2: "", close2: "" };
                return (
                  <div key={day} className="grid grid-cols-[90px_1fr_1fr_1fr_1fr] gap-2 items-center rounded-xl bg-stone-50 p-2.5">
                    <span className="text-xs font-medium">{day}</span>
                    {[
                      { key: "open", label: "Open" },
                      { key: "close", label: "Close" },
                      { key: "open2", label: "Open 2" },
                      { key: "close2", label: "Close 2" },
                    ].map((f) => (
                      <input
                        key={f.key}
                        value={h[f.key as keyof typeof h] ?? ""}
                        onChange={(e) => {
                          setHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], [f.key]: e.target.value } as typeof prev[typeof day],
                          }));
                        }}
                        placeholder={f.label}
                        className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-amber-400"
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PHOTOS TAB */}
        {tab === "Photos" && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {photos.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p}
                  alt={`Photo ${i + 1}`}
                  className="h-32 w-full object-cover sm:h-40"
                  onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_PHOTOS[i % DEFAULT_PHOTOS.length]; }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 p-2">
                  <input
                    value={p?.startsWith("data:") ? "" : p || ""}
                    placeholder="Image URL"
                    onChange={(e) => {
                      setPhotos((prev) => {
                        const next = [...prev];
                        next[i] = e.target.value || DEFAULT_PHOTOS[i % DEFAULT_PHOTOS.length];
                        return next;
                      });
                    }}
                    className="w-full rounded-lg bg-white/90 px-2 py-1 text-[10px] outline-none"
                  />
                  <div className="flex gap-1">
                    <label className="cursor-pointer rounded-lg bg-white/90 px-2 py-1 text-[10px] font-medium text-zinc-900 hover:bg-white">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPhotos((prev) => { const next = [...prev]; next[i] = reader.result as string; return next; });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                      className="rounded-lg bg-red-500/90 px-2 py-1 text-[10px] font-medium text-white hover:bg-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setPhotos((prev) => [...prev, "/photos/google/placejoys-1.jpg"])}
              className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 text-stone-400 transition hover:border-amber-300 hover:text-amber-600 sm:h-40"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "Settings" && (
          <div className="rounded-2xl border border-stone-200 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500">Name</span>
                <input
                  value={settings.name}
                  onChange={(e) => setSettings((s) => ({ ...s, name: e.target.value }))}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500">Phone</span>
                <input
                  value={settings.phone}
                  onChange={(e) => setSettings((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-1 sm:col-span-2">
                <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500">Address</span>
                <input
                  value={settings.address}
                  onChange={(e) => setSettings((s) => ({ ...s, address: e.target.value }))}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500">Price range</span>
                <input
                  value={settings.price}
                  onChange={(e) => setSettings((s) => ({ ...s, price: e.target.value }))}
                  placeholder="₱500–2,000"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-wide text-stone-500">Rating</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={settings.rating}
                  onChange={(e) => setSettings((s) => ({ ...s, rating: parseFloat(e.target.value) || 0 }))}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
              </label>
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-xl">
          <span>{toast}</span>
          <Link href="/" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-900 hover:bg-stone-100">
            View <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
