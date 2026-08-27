"use client";

import { useState, useEffect } from "react";
import {
  Star, MapPin, Phone, Clock, Navigation, Share2, Bookmark, BookmarkCheck,
  Martini, Baby, Dog, ChevronRight, ChevronLeft, UtensilsCrossed, Wine,
  Calendar, Users, Award, Camera, X, Send, Heart, ExternalLink, Copy, Check
} from "lucide-react";

const RESTAURANT = {
  name: "Giuseppe's",
  tagline: "Authentic Italian Cucina",
  rating: 4.4,
  reviewCount: 328,
  priceRange: "₱500–2,000",
  pricePerPerson: 3,
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  phone: "0945 841 9400",
  phoneHref: "tel:+639458419400",
  mapsUrl: "https://maps.google.com/?q=173+Avenida+Veteranos+Tacloban+City+6500+Leyte",
};

const HOURS: Record<string, { open: string; close: string; open2?: string; close2?: string; closed?: boolean }> = {
  Monday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Tuesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Wednesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Thursday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Sunday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Friday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Saturday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
};

const POPULAR: Record<string, number[]> = {
  Monday: [10,15,35,55,70,60,45,30,25,35,60,75],
  Tuesday: [12,18,40,60,75,65,50,32,28,40,65,70],
  Wednesday: [15,20,38,58,68,62,48,35,30,38,58,68],
  Thursday: [14,22,42,62,72,66,52,36,32,42,62,72],
  Friday: [20,35,65,80,85,75,60,55,65,80,90,85],
  Saturday: [25,45,75,85,90,80,70,65,75,88,92,90],
  Sunday: [18,30,55,70,78,70,55,40,35,50,65,60],
};
const HOURS_LABELS = ["11AM","12PM","1PM","2PM","3PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];

const MENU = {
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

const REVIEWS = [
  { name: "Isabella M.", avatar: "IM", rating: 5, date: "2 weeks ago", text: "The best Italian outside of Rome. Cacio e pepe was transcendent — simple, perfect, and the cocktails are world-class. Service was warm and attentive.", likes: 12 },
  { name: "Marco D.", avatar: "MD", rating: 5, date: "a month ago", text: "Giuseppe's never disappoints. Tagliata di Manzo cooked exactly medium-rare, burrata was cloud-like. Loved that dogs are welcome on the terrace.", likes: 8 },
  { name: "Sarah & James", avatar: "SJ", rating: 4, date: "3 weeks ago", text: "Great for families — high chairs available and staff were lovely with our toddler. Bruschetta and gnocchi al tartufo were highlights. Will be back!", likes: 5 },
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c2edc7028ab?w=800&q=80",
  "https://images.unsplash.com/photo-1498579150354-977bec7ea0af?w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
];

export default function Home() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuCat, setMenuCat] = useState<keyof typeof MENU>("Antipasti");
  const [popDay, setPopDay] = useState("Friday");
  const [reviews, setReviews] = useState(REVIEWS);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });
  const [photoIdx, setPhotoIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const isOpen = () => {
    const h = now.getHours();
    // Simplified: 11-16 and 17-21:30 or 22:30 fri/sat
    if (h >= 11 && h < 16) return true;
    if (["Friday","Saturday"].includes(dayName)) return h >= 17 && h < 22.5;
    return h >= 17 && h < 21.5;
  };
  const open = isOpen();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? "Removed from saved" : "Saved to your list");
  };
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "Giuseppe's", url: window.location.href }); } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Link copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    setReviews([{ name: newReview.name, avatar: newReview.name.slice(0,2).toUpperCase(), rating: newReview.rating, date: "Just now", text: newReview.text, likes: 0 }, ...reviews]);
    setNewReview({ name: "", rating: 5, text: "" });
    setShowReview(false);
    showToast("Review posted — thank you!");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-zinc-900">
      {/* Top bar */}
      <nav className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 font-serif text-sm font-bold text-white">G</div>
            <span className="font-serif text-lg font-bold tracking-tight">Giuseppe's</span>
            <span className="hidden text-xs text-stone-500 sm:inline">· Tacloban</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={RESTAURANT.phoneHref} className="hidden items-center gap-1.5 rounded-full bg-amber-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-amber-700 sm:inline-flex">
              <Phone className="h-4 w-4" /> Call
            </a>
            <a href={RESTAURANT.mapsUrl} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium hover:bg-stone-50">
              <Navigation className="h-4 w-4" /> Directions
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pt-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-stone-900">
              <img src={PHOTOS[photoIdx]} alt="Giuseppe's" className="h-[360px] w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Giuseppe's</h1>
                <p className="mt-1 text-white/80">{RESTAURANT.tagline} · {RESTAURANT.priceRange} · Restaurant</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-zinc-900">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {RESTAURANT.rating} · {RESTAURANT.reviewCount} Google reviews
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${open ? "bg-emerald-500 text-white" : "bg-white/90 text-zinc-900"}`}>
                    <Clock className="h-4 w-4" /> {open ? "Open now" : "Closed"} · Opens 11 AM
                  </span>
                </div>
              </div>
              <div className="absolute right-3 top-3 flex gap-2">
                <button onClick={() => { setPhotoIdx((p)=> (p+1)%PHOTOS.length); }} className="rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"><ChevronRight className="h-5 w-5" /></button>
              </div>
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {PHOTOS.map((_, i) => (
                  <button key={i} onClick={()=>setPhotoIdx(i)} className={`h-1.5 rounded-full transition-all ${i===photoIdx ? "w-6 bg-white" : "w-1.5 bg-white/60"}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="overflow-hidden rounded-2xl"><img src={PHOTOS[1]} className="h-[172px] w-full object-cover" alt="" /></div>
            <div className="relative overflow-hidden rounded-2xl">
              <img src={PHOTOS[2]} className="h-[172px] w-full object-cover" alt="" />
              <button onClick={()=>setShowLightbox(true)} className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 text-sm font-medium text-white opacity-0 transition hover:opacity-100">
                <Camera className="h-4 w-4" /> See all photos
              </button>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Directions", icon: Navigation, href: RESTAURANT.mapsUrl },
            { label: "Call", icon: Phone, href: RESTAURANT.phoneHref },
            { label: "Menu", icon: UtensilsCrossed, action: () => setShowMenu(true) },
            { label: saved ? "Saved" : "Save", icon: saved ? BookmarkCheck : Bookmark, action: handleSave, active: saved },
            { label: copied ? "Copied" : "Share", icon: copied ? Check : Share2, action: handleShare },
          ].map((b) => (
            <a
              key={b.label}
              href={(b as any).href}
              target={(b as any).href?.startsWith("http") ? "_blank" : undefined}
              onClick={b.action ? (e) => { e.preventDefault(); (b as any).action(); } : undefined}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${ (b as any).active ? "border-amber-200 bg-amber-50 text-amber-700" : "border-stone-200 bg-white hover:bg-stone-50"}`}
            >
              <b.icon className="h-4 w-4" /> {b.label}
            </a>
          ))}
          <button onClick={()=>setShowReview(true)} className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
            <Star className="h-4 w-4" /> Write a review
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-serif text-xl font-semibold">About</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                A little corner of Italy on Avenida Veteranos. Wood-fired pizzas, handmade pasta, and a bar that takes its cocktails seriously. Giuseppe opened in 2019 with his Tacloban-born wife — the name is his, the recipes are nonna's.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Martini, label: "Great cocktails" },
                  { icon: Baby, label: "High chairs" },
                  { icon: Dog, label: "Dogs allowed outside" },
                  { icon: Wine, label: "Great wine list" },
                ].map((s) => (
                  <span key={s.label} className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">
                    <s.icon className="h-3.5 w-3.5" /> {s.label}
                  </span>
                ))}
              </div>
            </section>

            {/* Menu */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">Menu</h2>
                <button onClick={()=>setShowMenu(true)} className="text-sm font-medium text-amber-600 hover:text-amber-700">View full menu →</button>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {Object.keys(MENU).map((cat) => (
                  <button
                    key={cat}
                    onClick={()=>setMenuCat(cat as any)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${menuCat===cat ? "bg-zinc-900 text-white" : "bg-stone-100 hover:bg-stone-200"}`}
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
                        {(item as any).popular && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">Popular</span>}
                      </div>
                      <p className="mt-0.5 text-xs leading-5 text-stone-500">{item.desc}</p>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-stone-400">Price per person: {RESTAURANT.priceRange} · Reported by 23 people</p>
            </section>

            {/* Hours */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-serif text-xl font-semibold">Hours</h2>
              <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${open ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                <Clock className="h-3 w-3" /> {open ? "Open now" : "Closed"} · Opens 11 AM
              </p>
              <div className="mt-4 divide-y divide-stone-100 text-sm">
                {Object.entries(HOURS).map(([day, h]) => (
                  <div key={day} className={`flex justify-between py-2 ${day===dayName ? "font-semibold text-amber-700" : "text-stone-600"}`}>
                    <span>{day}</span>
                    <span className="tabular-nums">{h.open}–{h.close} · {h.open2}–{h.close2}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs italic text-stone-500">"Italian Restaurant Open Monday, Tuesday, Wednesday, Thursday, Sunday 11:00AM-4:00PM to 5:00PM-9:30PM Friday and Saturday 11:00 AM-4:00PM to 5:30PM-10:30PM"</p>
            </section>

            {/* Popular times */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-serif text-xl font-semibold">Popular times</h2>
              <div className="mt-3 flex gap-1.5 overflow-x-auto">
                {Object.keys(POPULAR).map((d) => (
                  <button key={d} onClick={()=>setPopDay(d)} className={`rounded-full px-3 py-1 text-xs font-medium ${popDay===d ? "bg-amber-600 text-white" : "bg-stone-100 hover:bg-stone-200"}`}>{d.slice(0,3)}</button>
                ))}
              </div>
              <div className="mt-4 flex items-end gap-1">
                {POPULAR[popDay].map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div className="w-full rounded-t bg-amber-600 transition-all" style={{ height: `${v/1.2}px`, opacity: 0.3 + v/150 }} />
                    <span className="text-[10px] text-stone-400">{HOURS_LABELS[i]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-stone-500">8 PM: <span className="font-medium text-amber-700">Usually a little busy</span> · No wait</p>
            </section>

            {/* Reviews */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">Reviews</h2>
                <span className="text-sm text-stone-500">{reviews.length} reviews</span>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-stone-50 p-4">
                <div className="text-3xl font-bold">{RESTAURANT.rating}</div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map((s)=> <Star key={s} className={`h-4 w-4 ${s <= Math.round(RESTAURANT.rating) ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} />)}</div>
                  <p className="text-xs text-stone-500">{RESTAURANT.reviewCount} Google reviews · 5/5 Facebook · 4 votes</p>
                </div>
                <button onClick={()=>setShowReview(true)} className="ml-auto rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-stone-50">Write a review</button>
              </div>
              <div className="mt-4 space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border-b border-stone-100 pb-4 last:border-0">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">{r.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{r.name}</span>
                          <span className="text-xs text-stone-400">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 py-1">{[1,2,3,4,5].map((s)=><Star key={s} className={`h-3 w-3 ${s<=r.rating?"fill-amber-400 text-amber-400":"text-stone-200"}`} />)}</div>
                        <p className="text-sm leading-6 text-stone-600">{r.text}</p>
                        <button onClick={()=>{const nr=[...reviews]; nr[i]={...r,likes:r.likes+1}; setReviews(nr);}} className="mt-2 inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-600"><Heart className="h-3 w-3" /> Helpful ({r.likes})</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column — sticky */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold">Contact</h3>
              <div className="mt-3 space-y-3 text-sm">
                <a href={RESTAURANT.mapsUrl} target="_blank" className="flex gap-3 hover:text-amber-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                  <span>{RESTAURANT.address}<br /><span className="text-amber-600">Get directions</span></span>
                </a>
                <a href={RESTAURANT.phoneHref} className="flex items-center gap-3 hover:text-amber-600">
                  <Phone className="h-4 w-4 text-stone-400" /> {RESTAURANT.phone}
                </a>
                <div className="flex items-center gap-3 text-stone-600">
                  <Clock className="h-4 w-4 text-stone-400" />
                  <span>{open ? "Open" : "Closed"} · Opens 11 AM</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={RESTAURANT.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2 text-sm font-medium text-white hover:bg-amber-700"><Phone className="h-4 w-4" /> Call</a>
                <a href={RESTAURANT.mapsUrl} target="_blank" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2 text-sm font-medium hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-500">Price · {RESTAURANT.priceRange} per person</span>
                <Award className="h-4 w-4 text-amber-500" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="p-4 pb-2">
                <h3 className="font-semibold">Location</h3>
                <p className="text-xs text-stone-500">173 Avenida Veteranos</p>
              </div>
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=173%20Avenida%20Veteranos%20Tacloban%20City&z=15&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
              />
              <div className="flex gap-2 p-3">
                <a href={RESTAURANT.mapsUrl} target="_blank" className="flex flex-1 items-center justify-center gap-1 rounded-full border border-stone-200 py-2 text-sm font-medium hover:bg-stone-50"><ExternalLink className="h-4 w-4" /> Open in Maps</a>
                <button onClick={handleShare} className="rounded-full border border-stone-200 p-2 hover:bg-stone-50"><Copy className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold">Add missing information</h3>
              <div className="mt-3 space-y-2">
                <button onClick={()=>showToast("Thanks — suggestion sent to owner")} className="flex w-full items-center justify-between rounded-xl border border-stone-200 p-3 text-left hover:bg-stone-50">
                  <span className="text-sm font-medium">Add website</span><ChevronRight className="h-4 w-4 text-stone-400" />
                </button>
                <button onClick={()=>showToast("Edit suggestion sent")} className="flex w-full items-center justify-between rounded-xl border border-stone-200 p-3 text-left hover:bg-stone-50">
                  <span className="text-sm font-medium">Suggest an edit</span><span className="text-xs text-stone-400">Own this business?</span>
                </button>
              </div>
              <p className="mt-3 text-xs text-stone-400">Help improve this listing</p>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6 text-white">
              <h3 className="font-serif text-lg font-semibold">Book a table</h3>
              <p className="mt-1 text-sm text-white/70">Reserve your spot — especially for Friday & Saturday nights.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/70"><Calendar className="h-3 w-3" /> Date</div>
                  <input type="date" defaultValue={new Date().toISOString().slice(0,10)} className="mt-1 w-full bg-transparent text-sm font-medium outline-none" />
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/70"><Users className="h-3 w-3" /> Guests</div>
                  <select className="mt-1 w-full bg-transparent text-sm font-medium outline-none">
                    <option className="text-zinc-900">2 people</option><option className="text-zinc-900">3 people</option><option className="text-zinc-900">4 people</option><option className="text-zinc-900">5+ people</option>
                  </select>
                </div>
              </div>
              <button onClick={()=>showToast("Table request sent — we'll call to confirm")} className="mt-3 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-zinc-900 hover:bg-stone-100">Request table</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Giuseppe's · 173 Avenida Veteranos, Tacloban City · Made with ❤️ for Tacloban
      </footer>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={()=>setShowLightbox(false)}>
          <button onClick={()=>setShowLightbox(false)} className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"><X className="h-5 w-5" /></button>
          <img src={PHOTOS[photoIdx]} alt="" className="max-h-[80vh] max-w-4xl rounded-2xl object-contain" onClick={e=>e.stopPropagation()} />
        </div>
      )}

      {/* Review modal */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={()=>setShowReview(false)}>
          <form onSubmit={handleReview} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Write a review</h3>
              <button type="button" onClick={()=>setShowReview(false)} className="rounded-full p-1 hover:bg-stone-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 space-y-3">
              <input value={newReview.name} onChange={e=>setNewReview({...newReview,name:e.target.value})} placeholder="Your name" required className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" />
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s=>(
                  <button type="button" key={s} onClick={()=>setNewReview({...newReview,rating:s})} className="p-1">
                    <Star className={`h-6 w-6 ${s<=newReview.rating ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} />
                  </button>
                ))}
              </div>
              <textarea value={newReview.text} onChange={e=>setNewReview({...newReview,text:e.target.value})} placeholder="Share your experience..." required rows={4} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" />
              <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-full bg-zinc-900 py-2.5 text-sm font-medium text-white hover:bg-black"><Send className="h-4 w-4" /> Post review</button>
            </div>
          </form>
        </div>
      )}

      {/* Full menu modal */}
      {showMenu && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white" onClick={()=>setShowMenu(false)}>
          <div className="sticky top-0 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
            <h2 className="font-serif text-xl font-bold">Menu</h2>
            <button onClick={()=>setShowMenu(false)} className="rounded-full bg-stone-100 p-2 hover:bg-stone-200"><X className="h-5 w-5" /></button>
          </div>
          <div className="mx-auto max-w-3xl p-6">
            <div className="flex gap-2 overflow-x-auto pb-4">
              {Object.keys(MENU).map(c=>(
                <button key={c} onClick={()=>setMenuCat(c as any)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${menuCat===c ? "bg-zinc-900 text-white" : "bg-stone-100"}`}>{c}</button>
              ))}
            </div>
            <div className="divide-y divide-stone-100">
              {MENU[menuCat].map(item=>(
                <div key={item.name} className="flex gap-4 py-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name} {(item as any).popular && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700">Popular</span>}</h3>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                  </div>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
