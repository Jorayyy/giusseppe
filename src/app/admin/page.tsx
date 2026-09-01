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

const DEFAULT_MENU: Record<string, { name: string; price: string; desc: string; img?: string; popular?: boolean }[]> = {
  "Antipasto": [
    { name: "Antipasto Italiano", price: "₱480", desc: "Prosciutto, crostini, olives, cheese", img: "/photos/google/placejoys-5.jpg" },
    { name: "Baked Scallops", price: "₱380", desc: "Fresh Guiuan scallops, garlic butter, herbs", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Insalata di Mare", price: "₱420", desc: "Mixed seafood salad, lemon vinaigrette", img: "/photos/google/placejoys-8.jpg" },
    { name: "Garlic Bread", price: "₱120", desc: "Toasted sourdough, garlic butter, parsley", img: "/photos/google/placejoys-8.jpg" },
    { name: "Crostini Alla Livornese", price: "₱280", desc: "Tomato, olive, caper topping on crostini", img: "/photos/google/placejoys-5.jpg" },
  ],
  "Homemade Pasta": [
    { name: "Ravioli Alla Panna", price: "₱380", desc: "Cheese ravioli, cream sauce", img: "/photos/google/wanderlog-2.jpg" },
    { name: "Fettuccine Alfredo", price: "₱350", desc: "Fresh fettuccine, parmesan cream sauce", img: "/photos/google/wanderlog-2.jpg", popular: true },
    { name: "Fettuccine Puttanesca", price: "₱350", desc: "Tomato, olive, caper, anchovy sauce", img: "/photos/google/wanderlog-2.jpg" },
    { name: "Spaghetti Carbonara", price: "₱340", desc: "Egg, pancetta, pecorino, black pepper", img: "/photos/google/wanderlog-2.jpg" },
    { name: "Pasta Supreme w/ Salsiccia", price: "₱380", desc: "Mixed pasta, Italian sausage, tomato sauce", img: "/photos/google/wanderlog-2.jpg" },
  ],
  "Pizza": [
    { name: "Giuseppe's Special No. 1", price: "₱380", desc: "House specialty, wood-fired", img: "/photos/google/placejoys-3.jpg", popular: true },
    { name: "Pizza Margherita", price: "₱320", desc: "San Marzano tomato, mozzarella, basil", img: "/photos/google/wanderlog-3.jpg" },
    { name: "4 Cheese Pizza", price: "₱420", desc: "Mozzarella, parmesan, gorgonzola, fontina", img: "/photos/google/wanderlog-3.jpg" },
    { name: "Pizza w/ Salsiccia", price: "₱400", desc: "Italian sausage, tomato sauce, mozzarella", img: "/photos/google/wanderlog-3.jpg" },
    { name: "Hawaiian Pizza", price: "₱350", desc: "Ham, pineapple, cheese", img: "/photos/google/placejoys-7.jpg" },
  ],
  "Beef": [
    { name: "Tenderloin alla Sorrentino", price: "₱680", desc: "USDA Choice tenderloin, tomato, mozzarella, herbs", img: "/photos/google/placejoys-2.jpg", popular: true },
    { name: "Saltimbocca alla Romana", price: "₱620", desc: "Veal, prosciutto, sage, white wine", img: "/photos/google/placejoys-2.jpg" },
    { name: "Ossobuco", price: "₱720", desc: "Braised veal shank, gremolata, risotto", img: "/photos/google/placejoys-2.jpg" },
    { name: "Tenderloin w/ Marsala", price: "₱650", desc: "Mushroom marsala wine sauce", img: "/photos/google/placejoys-2.jpg" },
  ],
  "Seafood": [
    { name: "Grilled Prawns", price: "₱580", desc: "Jumbo prawns, garlic butter, lemon", img: "/photos/google/placejoys-8.jpg" },
    { name: "Lapu-Lapu Francese", price: "₱520", desc: "Fresh grouper, egg batter, lemon butter", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Seafood Platter", price: "₱880", desc: "Calamari, lapu-lapu, shrimp, sword fish", img: "/photos/google/placejoys-8.jpg" },
    { name: "Surf & Turf", price: "₱1,200", desc: "Sword fish, prawns, salsiccia, tenderloin (good for 2)", img: "/photos/google/placejoys-2.jpg" },
  ],
  "Pork": [
    { name: "Grilled Porkchop", price: "₱420", desc: "Monterey pork, herb marinade, grilled", img: "/photos/google/placejoys-2.jpg", popular: true },
    { name: "Porkchop Milanese", price: "₱450", desc: "Breaded pork chop, arugula, lemon", img: "/photos/google/placejoys-2.jpg" },
    { name: "Porkchop w/ Mushroom Sauce", price: "₱450", desc: "Cream of mushroom, pan-grilled", img: "/photos/google/placejoys-2.jpg" },
  ],
  "Chicken": [
    { name: "Chicken Milanese", price: "₱380", desc: "Breaded chicken breast, mushroom marsala", img: "/photos/google/placejoys-8.jpg" },
    { name: "Chicken Parmigiana", price: "₱380", desc: "Breaded chicken, tomato sauce, melted cheese", img: "/photos/google/placejoys-8.jpg" },
    { name: "Grilled Chicken Breast", price: "₱350", desc: "Herb-marinated, grilled, seasonal vegetables", img: "/photos/google/placejoys-8.jpg" },
  ],
  "Desserts": [
    { name: "Tiramisu", price: "₱280", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa", img: "/photos/google/placejoys-4.jpg", popular: true },
    { name: "Zabaglione w/ Ice Cream", price: "₱250", desc: "Marsala wine custard, vanilla gelato", img: "/photos/google/wanderlog-1.jpg" },
    { name: "Blueberry Cheesecake", price: "₱220", desc: "New York style, fresh blueberry compote", img: "/photos/google/wanderlog-1.jpg" },
    { name: "Peaches & Ice Cream", price: "₱180", desc: "Fresh peaches, vanilla gelato", img: "/photos/google/wanderlog-1.jpg" },
  ],
  "Drinks": [
    { name: "House Wine (Red/White)", price: "₱180/glass", desc: "Italian table wine, glass or carafe", img: "/photos/google/placejoys-1.jpg" },
    { name: "Espresso", price: "₱120", desc: "Double-shot Italian espresso", img: "/photos/google/placejoys-1.jpg" },
    { name: "Cappuccino", price: "₱150", desc: "Espresso, steamed milk, foam", img: "/photos/google/placejoys-1.jpg" },
    { name: "Fresh Lemonade", price: "₱120", desc: "House-made, refreshing", img: "/photos/google/placejoys-1.jpg" },
  ],
};

const DEFAULT_HOURS: Record<string, { open: string; close: string; open2?: string; close2?: string }> = {
  Monday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Tuesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Wednesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Thursday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Friday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Saturday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Sunday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
};

const HOURS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DEFAULT_PHOTOS = ["/photos/google/placejoys-1.jpg", "/photos/google/placejoys-10.jpg", "/photos/google/placejoys-3.jpg", "/photos/google/placejoys-2.jpg", "/photos/google/placejoys-4.jpg", "/photos/google/placejoys-5.jpg"];

const DEFAULT_SETTINGS = {
  name: "Giuseppe's",
  phone: "0945 841 9400",
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

  const [menu, setMenu] = useState<typeof DEFAULT_MENU>(DEFAULT_MENU);
  const [hours, setHours] = useState<typeof DEFAULT_HOURS>(DEFAULT_HOURS);
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [editingCat, setEditingCat] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("giuseppe_admin") === "1") setAuthed(true);
      const m = localStorage.getItem("giuseppe_menu");
      if (m) setMenu(JSON.parse(m));
      const h = localStorage.getItem("giuseppe_hours");
      if (h) setHours(JSON.parse(h));
      const p = localStorage.getItem("giuseppe_photos");
      if (p) {
        const parsed = JSON.parse(p);
        if (Array.isArray(parsed) && parsed.length >= 1) setPhotos(parsed);
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
    showToast("Menu saved");
  };
  const saveHours = () => {
    localStorage.setItem("giuseppe_hours", JSON.stringify(hours));
    showToast("Hours saved");
  };
  const savePhotos = () => {
    localStorage.setItem("giuseppe_photos", JSON.stringify(photos));
    showToast("Photos saved");
  };
  const saveSettings = () => {
    localStorage.setItem("giuseppe_settings", JSON.stringify(settings));
    showToast("Settings saved");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
      </div>
    );
  }

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
    <div className="min-h-screen bg-stone-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 font-serif text-sm font-bold text-white italic">G</div>
            <div>
              <h1 className="font-serif text-lg font-bold leading-none">Giuseppe&apos;s Dashboard</h1>
              <p className="text-xs text-stone-500">Manage menu, hours, photos & settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium transition hover:bg-stone-50">
              <Eye className="h-4 w-4" /> View site
            </a>
            <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-black">
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

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">
        {/* Menu tab */}
        {tab === "Menu" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Menu</h2>
              <button onClick={saveMenu} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
            {Object.entries(menu).map(([cat, items]) => (
              <div key={cat} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                <button onClick={() => setEditingCat(editingCat === cat ? null : cat)} className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-stone-50">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg font-semibold">{cat}</h3>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-500">{items.length} items</span>
                  </div>
                  <span className={`text-sm text-stone-400 transition ${editingCat === cat ? "rotate-180" : ""}`}>▾</span>
                </button>
                {editingCat === cat && (
                  <div className="border-t border-stone-100 px-6 py-4 space-y-3">
                    {items.map((item, idx) => (
                      <div key={idx} className="rounded-xl border border-stone-100 bg-stone-50/60 p-4">
                        <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                          <input
                            value={item.name}
                            onChange={(e) => {
                              const copy = { ...menu };
                              copy[cat] = [...copy[cat]];
                              copy[cat][idx] = { ...copy[cat][idx], name: e.target.value };
                              setMenu(copy);
                            }}
                            placeholder="Dish name"
                            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
                          />
                          <input
                            value={item.price}
                            onChange={(e) => {
                              const copy = { ...menu };
                              copy[cat] = [...copy[cat]];
                              copy[cat][idx] = { ...copy[cat][idx], price: e.target.value };
                              setMenu(copy);
                            }}
                            placeholder="₱0"
                            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
                          />
                        </div>
                        <input
                          value={item.desc}
                          onChange={(e) => {
                            const copy = { ...menu };
                            copy[cat] = [...copy[cat]];
                            copy[cat][idx] = { ...copy[cat][idx], desc: e.target.value };
                            setMenu(copy);
                          }}
                          placeholder="Description"
                          className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
                        />
                        <div className="mt-2 flex items-center justify-between">
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
                            Popular
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
                        copy[cat] = [...copy[cat], { name: "New Item", price: "₱0", desc: "", img: "/photos/real/food-1.jpg", popular: false }];
                        setMenu(copy);
                      }}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-stone-300 bg-white py-2.5 text-sm font-medium text-stone-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                    >
                      <Plus className="h-4 w-4" /> Add Item
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Hours tab */}
        {tab === "Hours" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Hours</h2>
              <button onClick={saveHours} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save
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
                            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
                          />
                        </label>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Photos tab */}
        {tab === "Photos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Photos</h2>
              <button onClick={savePhotos} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((p, i) => (
                <div key={i} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="overflow-hidden rounded-xl bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p}
                      alt={`Photo ${i + 1}`}
                      className="h-40 w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_PHOTOS[i % DEFAULT_PHOTOS.length];
                      }}
                    />
                  </div>
                  <div className="mt-3 space-y-2">
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
                        className="mt-1 block w-full cursor-pointer rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-amber-600 file:px-3 file:py-1 file:text-xs file:font-medium file:text-white hover:file:bg-amber-700"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-medium text-stone-500">Or image URL</span>
                      <input
                        value={p?.startsWith("data:") ? "" : p || ""}
                        placeholder="https://..."
                        onChange={(e) => {
                          setPhotos((prev) => {
                            const next = [...prev];
                            next[i] = e.target.value || DEFAULT_PHOTOS[i % DEFAULT_PHOTOS.length];
                            return next;
                          });
                        }}
                        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-400"
                      />
                    </label>
                    <button
                      onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                      className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPhotos((prev) => [...prev, "/photos/real/food-1.jpg"])}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
            >
              <Plus className="h-4 w-4" /> Add Photo
            </button>
          </div>
        )}

        {/* Settings tab */}
        {tab === "Settings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Settings</h2>
              <button onClick={saveSettings} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                <Save className="h-4 w-4" /> Save
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
