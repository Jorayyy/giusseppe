"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

// ── defaults mirrored from src/app/page.tsx ──
const DEFAULT_MENU: Record<string, { name: string; price: string; desc: string; popular?: boolean }[]> = {
  Antipasti: [
    { name: "Bruschetta al Pomodoro", price: "₱320", desc: "Grilled sourdough, heirloom tomatoes, basil, extra virgin olive oil", popular: true },
    { name: "Burrata & Prosciutto", price: "₱580", desc: "Creamy burrata, 18-month prosciutto di Parma, arugula" },
    { name: "Calamari Fritti", price: "₱480", desc: "Lightly fried squid, lemon aioli, marinara" },
  ],
  Primi: [
    { name: "Cacio e Pepe", price: "₱620", desc: "Tonarelli, black pepper, Pecorino Romano DOP", popular: true },
    { name: "Gnocchi al Tartufo", price: "₱740", desc: "Hand-rolled gnocchi, black truffle, parmesan foam" },
    { name: "Risotto ai Funghi", price: "₱680", desc: "Carnaroli rice, porcini, wild mushrooms, thyme" },
  ],
  Secondi: [
    { name: "Branzino al Sale", price: "₱980", desc: "Mediterranean sea bass, lemon, herbs, sea salt crust" },
    { name: "Tagliata di Manzo", price: "₱1,250", desc: "Grass-fed ribeye, arugula, parmesan, balsamic", popular: true },
    { name: "Melanzane alla Parmigiana", price: "₱520", desc: "Eggplant, San Marzano tomato, mozzarella, basil" },
  ],
  Dolci: [
    { name: "Tiramisu Classico", price: "₱320", desc: "Espresso-soaked savoiardi, mascarpone, cocoa" },
    { name: "Panna Cotta ai Frutti di Bosco", price: "₱280", desc: "Vanilla panna cotta, warm berry compote" },
  ],
  Cocktails: [
    { name: "Negroni Sbagliato", price: "₱380", desc: "Campari, sweet vermouth, prosecco" },
    { name: "Amalfi Spritz", price: "₱350", desc: "Limoncello, prosecco, soda, basil" },
  ],
};

const DEFAULT_HOURS: Record<string, { open: string; close: string; open2?: string; close2?: string }> = {
  Monday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Tuesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Wednesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Thursday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Friday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Saturday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Sunday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
};

const HOURS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DEFAULT_PHOTOS = ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg", "/photos/4.jpg", "/photos/5.jpg", "/photos/6.jpg"];

const DEFAULT_SETTINGS = {
  name: "Giuseppe's",
  phone: "0931 970 4073",
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  priceRange: "₱500–2,000",
};

type Tab = "Menu" | "Hours" | "Photos" | "Settings";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Menu");
  const [toast, setToast] = useState<string | null>(null);

  // editable states
  const [menu, setMenu] = useState<typeof DEFAULT_MENU>(DEFAULT_MENU);
  const [hours, setHours] = useState<typeof DEFAULT_HOURS>(DEFAULT_HOURS);
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    // auto-login
    try {
      if (localStorage.getItem("giuseppe_admin") === "1") setAuthed(true);
      const m = localStorage.getItem("giuseppe_menu");
      if (m) setMenu(JSON.parse(m));
      const h = localStorage.getItem("giuseppe_hours");
      if (h) setHours(JSON.parse(h));
      const p = localStorage.getItem("giuseppe_photos");
      if (p) {
        const parsed = JSON.parse(p);
        if (Array.isArray(parsed) && parsed.length === 6) setPhotos(parsed);
      }
      const s = localStorage.getItem("giuseppe_settings");
      if (s) setSettings(JSON.parse(s));
    } catch {}
    setChecking(false);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "giuseppe2025") {
      localStorage.setItem("giuseppe_admin", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("giuseppe_admin");
    setAuthed(false);
    setPassword("");
  };

  const saveMenu = () => {
    localStorage.setItem("giuseppe_menu", JSON.stringify(menu));
    showToast("Saved — refresh homepage to see changes");
  };
  const saveHours = () => {
    localStorage.setItem("giuseppe_hours", JSON.stringify(hours));
    showToast("Saved — refresh homepage to see changes");
  };
  const savePhotos = () => {
    localStorage.setItem("giuseppe_photos", JSON.stringify(photos));
    showToast("Saved — refresh homepage to see changes");
  };
  const saveSettings = () => {
    localStorage.setItem("giuseppe_settings", JSON.stringify(settings));
    showToast("Saved — refresh homepage to see changes");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5] p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 font-serif text-lg font-bold text-white">G</div>
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
            <p className="text-xs text-stone-400">Hint: giuseppe2025</p>
            <button type="submit" className="flex w-full items-center justify-center rounded-full bg-amber-600 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
              Enter
            </button>
            <a href="/" className="flex items-center justify-center gap-1.5 pt-2 text-sm text-stone-500 hover:text-amber-600">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </a>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 font-serif text-sm font-bold text-white">G</div>
            <div>
              <h1 className="font-serif text-lg font-bold leading-none">Giuseppe&apos;s Owner Dashboard</h1>
              <p className="text-xs text-stone-500">Manage menu, hours, photos & settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium hover:bg-stone-50">
              <Eye className="h-4 w-4" /> View site
            </a>
            <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-black">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-wrap gap-2">
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
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition ${tab === t.id ? "bg-amber-600 text-white shadow-sm" : "border border-stone-200 bg-white hover:bg-stone-50"}`}
            >
              <t.icon className="h-4 w-4" /> {t.id}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Menu tab */}
        {tab === "Menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Menu</h2>
              <button onClick={saveMenu} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save menu
              </button>
            </div>
            {Object.entries(menu).map(([cat, items]) => (
              <div key={cat} className="rounded-2xl border border-stone-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold">{cat}</h3>
                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-500">{items.length} items</span>
                </div>
                <div className="mt-4 space-y-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-stone-100 bg-stone-50/60 p-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1">
                          <span className="text-xs font-medium text-stone-500">Name</span>
                          <input
                            value={item.name}
                            onChange={(e) => {
                              const copy = { ...menu };
                              copy[cat] = [...copy[cat]];
                              copy[cat][idx] = { ...copy[cat][idx], name: e.target.value };
                              setMenu(copy);
                            }}
                            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                          />
                        </label>
                        <label className="space-y-1">
                          <span className="text-xs font-medium text-stone-500">Price</span>
                          <input
                            value={item.price}
                            onChange={(e) => {
                              const copy = { ...menu };
                              copy[cat] = [...copy[cat]];
                              copy[cat][idx] = { ...copy[cat][idx], price: e.target.value };
                              setMenu(copy);
                            }}
                            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                          />
                        </label>
                      </div>
                      <label className="mt-3 block space-y-1">
                        <span className="text-xs font-medium text-stone-500">Description</span>
                        <input
                          value={item.desc}
                          onChange={(e) => {
                            const copy = { ...menu };
                            copy[cat] = [...copy[cat]];
                            copy[cat][idx] = { ...copy[cat][idx], desc: e.target.value };
                            setMenu(copy);
                          }}
                          className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        />
                      </label>
                      <div className="mt-3 flex items-center justify-between">
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={!!item.popular}
                            onChange={(e) => {
                              const copy = { ...menu };
                              copy[cat] = [...copy[cat]];
                              copy[cat][idx] = { ...copy[cat][idx], popular: e.target.checked };
                              setMenu(copy);
                            }}
                            className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="font-medium">Popular</span>
                          {item.popular && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">Popular</span>}
                        </label>
                        <button
                          onClick={() => {
                            const copy = { ...menu };
                            copy[cat] = copy[cat].filter((_, i) => i !== idx);
                            setMenu(copy);
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const copy = { ...menu };
                      copy[cat] = [...copy[cat], { name: "New Item", price: "₱0", desc: "", popular: false }];
                      setMenu(copy);
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-stone-300 bg-white py-2.5 text-sm font-medium text-stone-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Plus className="h-4 w-4" /> Add Item
                  </button>
                </div>
              </div>
            ))}
            <button onClick={saveMenu} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
              <Save className="h-4 w-4" /> Save menu
            </button>
          </div>
        )}

        {/* Hours tab */}
        {tab === "Hours" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Hours</h2>
              <button onClick={saveHours} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save hours
              </button>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-sm text-stone-500">Two service windows per day. Leave second window empty if closed.</p>
              <div className="mt-4 space-y-3">
                {HOURS_ORDER.map((day) => {
                  const h = hours[day] ?? { open: "", close: "", open2: "", close2: "" };
                  return (
                    <div key={day} className="grid gap-2 rounded-xl border border-stone-100 bg-stone-50/50 p-4 sm:grid-cols-[110px_1fr_1fr_1fr_1fr]">
                      <div className="flex items-center font-medium text-sm">{day}</div>
                      {[
                        { key: "open", label: "Open" },
                        { key: "close", label: "Close" },
                        { key: "open2", label: "Open 2" },
                        { key: "close2", label: "Close 2" },
                      ].map((f) => (
                        <label key={f.key} className="space-y-1">
                          <span className="text-[11px] font-medium uppercase tracking-wide text-stone-500">{f.label}</span>
                          <input
                            value={(h as any)[f.key] ?? ""}
                            onChange={(e) => {
                              setHours((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], [f.key]: e.target.value },
                              }));
                            }}
                            placeholder={f.label}
                            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                          />
                        </label>
                      ))}
                    </div>
                  );
                })}
              </div>
              <button onClick={saveHours} className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save hours
              </button>
            </div>
          </div>
        )}

        {/* Photos tab */}
        {tab === "Photos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Photos</h2>
              <button onClick={savePhotos} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save photos
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="overflow-hidden rounded-xl bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photos[i] || DEFAULT_PHOTOS[i]}
                      alt={`Slot ${i + 1}`}
                      className="h-40 w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_PHOTOS[i];
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-stone-500">Slot {i + 1}</p>
                  <div className="mt-2 space-y-2">
                    <label className="block">
                      <span className="text-xs font-medium text-stone-500">Upload image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            const dataUrl = reader.result as string;
                            setPhotos((prev) => {
                              const next = [...prev];
                              next[i] = dataUrl;
                              return next;
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="mt-1 block w-full cursor-pointer rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-amber-600 file:px-3 file:py-1 file:text-xs file:font-medium file:text-white hover:file:bg-amber-700"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-medium text-stone-500">Or image URL</span>
                      <input
                        value={photos[i]?.startsWith("data:") ? "" : photos[i] || ""}
                        placeholder={DEFAULT_PHOTOS[i]}
                        onChange={(e) => {
                          setPhotos((prev) => {
                            const next = [...prev];
                            next[i] = e.target.value || DEFAULT_PHOTOS[i];
                            return next;
                          });
                        }}
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={savePhotos} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
              <Save className="h-4 w-4" /> Save photos
            </button>
          </div>
        )}

        {/* Settings tab */}
        {tab === "Settings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Settings</h2>
              <button onClick={saveSettings} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save settings
              </button>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Restaurant name</span>
                  <input
                    value={settings.name}
                    onChange={(e) => setSettings((s) => ({ ...s, name: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Phone</span>
                  <input
                    value={settings.phone}
                    onChange={(e) => setSettings((s) => ({ ...s, phone: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
                <label className="space-y-1 sm:col-span-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Address</span>
                  <input
                    value={settings.address}
                    onChange={(e) => setSettings((s) => ({ ...s, address: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Price range</span>
                  <input
                    value={settings.priceRange}
                    onChange={(e) => setSettings((s) => ({ ...s, priceRange: e.target.value }))}
                    placeholder="₱500–2,000"
                    className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
              </div>
              <button onClick={saveSettings} className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save settings
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-xl">
          <span>{toast}</span>
          <a href="/" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-900 hover:bg-stone-100">
            View site <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}
