"use client";

import { useState, useEffect } from "react";
import {
  Star, MapPin, Phone, Clock, Navigation, Share2, Bookmark, BookmarkCheck,
  Martini, Baby, Dog, ChevronRight, ChevronLeft, UtensilsCrossed, Wine,
  Calendar, Users, Award, Camera, X, Send, Heart, ExternalLink, Copy, Check,
  MessageCircle, QrCode, PartyPopper, Building2, Sparkles, ShoppingBag, CreditCard,
  Bell, BarChart3, Bot, Eye, Gift, Ticket, Clock3
} from "lucide-react";

const RESTAURANT = {
  name: "Giuseppe's",
  tagline: "Authentic Italian Cucina",
  rating: 4.4,
  reviewCount: 328,
  priceRange: "₱500–2,000",
  pricePerPerson: 3,
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  phone: "0931 970 4073",
  phoneHref: "tel:+639319704073",
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
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
  "/photos/6.jpg",
];

// --- Tier 1 constants ---
const WA_ORDER_URL = "https://wa.me/639319704073?text=Hi%20Giuseppe's!%20I'd%20like%20to%20order...";
const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=Giuseppe's+Tacloban+reviews";
const QR_IMG = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://giusseppe.vercel.app";

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
  // Tier 1 states
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0,10));
  const [bookingGuests, setBookingGuests] = useState("2 people");
  const [eventForm, setEventForm] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "10",
    type: "Birthday",
    message: "",
  });
  const [menuData, setMenuData] = useState(MENU);
  const [hoursData, setHoursData] = useState(HOURS);
  const [photosData, setPhotosData] = useState(PHOTOS);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    try {
      const m = localStorage.getItem("giuseppe_menu");
      if (m) setMenuData(JSON.parse(m));
      const h = localStorage.getItem("giuseppe_hours");
      if (h) setHoursData(JSON.parse(h));
      const p = localStorage.getItem("giuseppe_photos");
      if (p) {
        const arr = JSON.parse(p);
        if (Array.isArray(arr) && arr.length) setPhotosData(arr.filter(Boolean));
      }
    } catch {}
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
    setShowGooglePrompt(true);
    showToast("Review posted — thank you!");
  };

  const waReserveUrl = `https://wa.me/639319704073?text=${encodeURIComponent(`Hi Giuseppe's! Table for ${bookingGuests} on ${bookingDate} ... Please confirm availability.`)}`;
  const waOrderUrlWithContext = WA_ORDER_URL;

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.name || !eventForm.phone) {
      showToast("Please enter name and phone");
      return;
    }
    const msg = `Hi Giuseppe's! Private Dining inquiry:%0AName: ${eventForm.name}%0APhone: ${eventForm.phone}%0ADate: ${eventForm.date || "Flexible"}%0AGuests: ${eventForm.guests}%0AEvent Type: ${eventForm.type}%0AMessage: ${eventForm.message || "-"}`;
    // encode already partially, but ensure proper:
    const waUrl = `https://wa.me/639319704073?text=${encodeURIComponent(`Hi Giuseppe's! Private Dining inquiry:\nName: ${eventForm.name}\nPhone: ${eventForm.phone}\nDate: ${eventForm.date || "Flexible"}\nGuests: ${eventForm.guests}\nEvent Type: ${eventForm.type}\nMessage: ${eventForm.message || "-"}`)}`;
    window.open(waUrl, "_blank");
    showToast("Inquiry sent — we'll call to confirm");
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
            <a
              href={WA_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp to order"
              className="hidden items-center justify-center rounded-full bg-[#25D366] p-2 text-white hover:bg-[#20bd5a] sm:inline-flex"
              title="WhatsApp to order"
            >
              <MessageCircle className="h-4 w-4" />
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
              <img src={photosData[photoIdx] || PHOTOS[photoIdx]} alt="Giuseppe's" className="h-[360px] w-full object-cover opacity-90" onError={(e)=>{(e.target as HTMLImageElement).src = photosData[0] || PHOTOS[0]}} />
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
                {photosData.map((_, i) => (
                  <button key={i} onClick={()=>setPhotoIdx(i)} className={`h-1.5 rounded-full transition-all ${i===photoIdx ? "w-6 bg-white" : "w-1.5 bg-white/60"}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="overflow-hidden rounded-2xl"><img src={photosData[1] || PHOTOS[1]} className="h-[172px] w-full object-cover" alt="" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} /></div>
            <div className="relative overflow-hidden rounded-2xl">
              <img src={photosData[2] || PHOTOS[2]} className="h-[172px] w-full object-cover" alt="" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
              <button onClick={()=>setShowLightbox(true)} className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 text-sm font-medium text-white opacity-0 transition hover:opacity-100">
                <Camera className="h-4 w-4" /> See all photos
              </button>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
          >
            <Navigation className="h-4 w-4" /> Directions
          </a>
          <a
            href={RESTAURANT.phoneHref}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={WA_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
            title="WhatsApp to order"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button
            onClick={() => setShowMenu(true)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
          >
            <UtensilsCrossed className="h-4 w-4" /> Menu
          </button>
          <button
            onClick={handleSave}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${saved ? "border-amber-200 bg-amber-50 text-amber-700" : "border-stone-200 bg-white hover:bg-stone-50"}`}
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />} {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={handleShare}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />} {copied ? "Copied" : "Share"}
          </button>
          <button onClick={()=>setShowReview(true)} className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
            <Star className="h-4 w-4" /> Write a review
          </button>
        </div>

        {/* QR Table Menu teaser */}
        <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="shrink-0 rounded-xl bg-white p-2 shadow-sm">
              <img src={QR_IMG} alt="QR Menu" className="h-[72px] w-[72px] rounded-lg object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-amber-900">Dine-in? Scan the QR on your table</h3>
              </div>
              <p className="mt-1 max-w-md text-xs leading-5 text-amber-800/70">Instant menu, no waiting. Point your camera at the table QR to browse & order. Works offline-friendly.</p>
              <div className="mt-2 flex gap-2">
                <a href="/qr" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800">
                  Open QR menu <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-xs text-amber-600/60">·</span>
                <span className="text-xs text-amber-700/70">Table QR • No app needed</span>
              </div>
            </div>
          </div>
          <a href="/qr" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-black">
            <QrCode className="h-4 w-4" /> View QR Menu
          </a>
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
              {/* QR hint inside menu */}
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-amber-200 bg-amber-50/50 px-3 py-2 text-xs text-amber-800">
                <QrCode className="h-3.5 w-3.5" />
                <span>At the restaurant? <a href="/qr" className="font-semibold underline decoration-amber-300 underline-offset-2 hover:text-amber-900">Scan table QR</a> for the live menu</span>
                <a href="/qr" className="ml-auto hidden items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium shadow-sm sm:inline-flex">Open QR <ExternalLink className="h-3 w-3" /></a>
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
              {/* Google prompt after local review */}
              {showGooglePrompt && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <div className="text-sm">
                    <p className="font-medium text-amber-900">Thanks for the review! ✨</p>
                    <p className="text-xs text-amber-700/70">Want to also post on Google?</p>
                  </div>
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm hover:bg-amber-100"
                  >
                    Post on Google <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
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
              {/* Google Review Booster */}
              <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-base font-semibold text-zinc-900">Loved your meal? Help us grow</h3>
                    <p className="mt-1 text-sm leading-5 text-stone-600">Your Google review helps locals discover authentic Italian in Tacloban. Takes 30 seconds.</p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                      >
                        <Star className="h-4 w-4 fill-white" /> Leave a Google Review
                      </a>
                      <button
                        onClick={()=>setShowReview(true)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-stone-50"
                      >
                        <Send className="h-4 w-4" /> Share your experience
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-stone-400">
                      <span>Tap a star to start:</span>
                      <span className="flex gap-0.5">
                        {[1,2,3,4,5].map(s=>(
                          <button key={s} onClick={()=>{ setNewReview({...newReview, rating: s}); setShowReview(true);}} className="p-0.5 hover:scale-110 transition">
                            <Star className={`h-4 w-4 ${s<=5 ? "text-amber-300 hover:fill-amber-400 hover:text-amber-400" : "text-stone-200"}`} />
                          </button>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
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
                <a href={WA_ORDER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700">
                  <MessageCircle className="h-4 w-4" /> WhatsApp to order
                </a>
                <div className="flex items-center gap-3 text-stone-600">
                  <Clock className="h-4 w-4 text-stone-400" />
                  <span>{open ? "Open" : "Closed"} · Opens 11 AM</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={RESTAURANT.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2 text-sm font-medium text-white hover:bg-amber-700"><Phone className="h-4 w-4" /> Call</a>
                <a href={WA_ORDER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2 text-sm font-medium text-white hover:bg-[#20bd5a]"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
              <a href={RESTAURANT.mapsUrl} target="_blank" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2 text-sm font-medium hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
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

            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                <h3 className="font-serif font-semibold text-amber-900">Tacloban's Favourite Italian</h3>
              </div>
              <p className="mt-1 text-sm leading-6 text-amber-800/80">Voted Best Date Night 2024 · Featured in Philippine Tatler Dining Guide. Join 2,000+ locals who made Giuseppe's their tradition.</p>
              <div className="mt-4 flex gap-2">
                <a href="https://instagram.com" target="_blank" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-medium text-zinc-900 shadow-sm hover:bg-stone-50"><Camera className="h-4 w-4" /> Instagram</a>
                <a href="https://facebook.com" target="_blank" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:bg-black"><ExternalLink className="h-4 w-4" /> Facebook</a>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6 text-white">
              <h3 className="font-serif text-lg font-semibold">Book a table</h3>
              <p className="mt-1 text-sm text-white/70">Reserve your spot — especially for Friday & Saturday nights.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/70"><Calendar className="h-3 w-3" /> Date</div>
                  <input type="date" value={bookingDate} onChange={e=>setBookingDate(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-medium outline-none" />
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/70"><Users className="h-3 w-3" /> Guests</div>
                  <select value={bookingGuests} onChange={e=>setBookingGuests(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-medium outline-none">
                    <option className="text-zinc-900">2 people</option><option className="text-zinc-900">3 people</option><option className="text-zinc-900">4 people</option><option className="text-zinc-900">5+ people</option>
                    <option className="text-zinc-900">6 people</option><option className="text-zinc-900">8 people</option>
                  </select>
                </div>
              </div>
              <button onClick={()=>showToast("Table request sent — we'll call to confirm")} className="mt-3 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-zinc-900 hover:bg-stone-100">Request table</button>
              <a
                href={waReserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp to Reserve
              </a>
              <p className="mt-2 text-center text-[11px] text-white/50">Prefills: Table for {bookingGuests} on {bookingDate || "your date"}</p>
            </div>

            {/* Private Events / Catering Form */}
            <section id="events" className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <PartyPopper className="h-4 w-4" />
                </div>
                <h3 className="font-serif text-lg font-semibold">Private Dining & Catering</h3>
              </div>
              <p className="mt-1 text-sm text-stone-600">Birthdays, corporate, wine nights — our terrace seats 30</p>
              <form onSubmit={handleEventSubmit} className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700">Name</label>
                    <input
                      value={eventForm.name}
                      onChange={e=>setEventForm({...eventForm, name: e.target.value})}
                      placeholder="Juan Dela Cruz"
                      required
                      className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700">Phone</label>
                    <input
                      value={eventForm.phone}
                      onChange={e=>setEventForm({...eventForm, phone: e.target.value})}
                      placeholder="09xx xxx xxxx"
                      required
                      className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700">Date</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={e=>setEventForm({...eventForm, date: e.target.value})}
                      className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700">Guests</label>
                    <input
                      type="number"
                      min={1}
                      value={eventForm.guests}
                      onChange={e=>setEventForm({...eventForm, guests: e.target.value})}
                      placeholder="20"
                      className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700">Event Type</label>
                  <select
                    value={eventForm.type}
                    onChange={e=>setEventForm({...eventForm, type: e.target.value})}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    <option>Birthday</option>
                    <option>Corporate</option>
                    <option>Wine Night</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700">Message</label>
                  <textarea
                    value={eventForm.message}
                    onChange={e=>setEventForm({...eventForm, message: e.target.value})}
                    placeholder="Tell us about your event — birthday, grazing table, wine pairing..."
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
                  <Send className="h-4 w-4" /> Send inquiry via WhatsApp
                </button>
                <p className="text-center text-[11px] text-stone-400">Opens WhatsApp with pre-filled details · We reply within 2 hrs</p>
              </form>
            </section>
          </div>
        </div>

        {/* Tier 2/3 SOON section */}
        <section id="roadmap" className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Roadmap
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight">Coming Soon</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-stone-500">We're building more for our Tacloban family — from seamless ordering to AI sommeliers. Be first to know.</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Column 1 - Tier 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">Tier 2</span>
                <h3 className="text-sm font-semibold text-stone-700">Order & Delight</h3>
              </div>

              {/* Online Ordering */}
              <div className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Online Ordering</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">GCash / PayMongo, real-time tracking, pickup & delivery.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              </div>

              {/* Loyalty Card */}
              <div className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Loyalty Card</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">Earn stamps, unlock free tiramisu & wine nights. Digital, no plastic.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              </div>

              {/* Instagram Feed */}
              <div className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Camera className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Instagram Feed</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">Live #GiuseppesTacloban wall — your photos on our homepage.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Join waitlist
                </button>
              </div>
            </div>

            {/* Column 2 - Tier 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">Tier 2</span>
                <h3 className="text-sm font-semibold text-stone-700">Ops & Growth</h3>
              </div>

              {/* Waitlist & Reminders */}
              <div className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Clock3 className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Waitlist & Reminders</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">Join the waitlist from your phone, get SMS/WhatsApp when table is ready.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              </div>

              {/* Sales Dashboard */}
              <div className="rounded-2xl border border-stone-200 bg-[#FFFBF5] p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <BarChart3 className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="rounded-full bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Sales Dashboard</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">For owners: daily sales, bestsellers & peak hours at a glance.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-xs font-medium hover:bg-stone-50">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              </div>

              <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 p-4 text-center">
                <p className="text-xs font-medium text-stone-600">Tier 2 launches Q4 2026</p>
                <p className="mt-1 text-[11px] text-stone-400">Ordering, loyalty & ops — foundation for scale</p>
              </div>
            </div>

            {/* Column 3 - Tier 3 Wow */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Tier 3</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700"><Sparkles className="h-3 w-3" /> Wow</span>
                <h3 className="text-sm font-semibold text-stone-700">Magic</h3>
              </div>

              {/* Ask Giuseppe AI */}
              <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Bot className="h-5 w-5 text-violet-600" />
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">WOW · SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Ask Giuseppe AI</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">Chat with our AI sommelier — wine pairings, allergy checks, menu stories.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-zinc-900 py-2 text-xs font-medium text-white hover:bg-black">
                  <Sparkles className="h-3.5 w-3.5" /> Notify me — Wow
                </button>
              </div>

              {/* 360 Tour */}
              <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Eye className="h-5 w-5 text-violet-600" />
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">WOW · SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">360° Tour</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">Walk the terrace & wood-fire oven from your phone. VR-ready.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-white py-2 text-xs font-medium hover:bg-stone-50 border border-violet-200">
                  <Bell className="h-3.5 w-3.5" /> Notify me
                </button>
              </div>

              {/* Gift Vouchers */}
              <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Gift className="h-5 w-5 text-violet-600" />
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">WOW · SOON</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold">Gift Vouchers</h4>
                <p className="mt-1 text-xs leading-5 text-stone-500">Send a date-night gift — redeemable for dinner, deliverable via GCash.</p>
                <button onClick={()=>showToast("You're on the waitlist!")} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-white py-2 text-xs font-medium hover:bg-stone-50 border border-violet-200">
                  <Ticket className="h-3.5 w-3.5" /> Notify me
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-stone-100 pt-6 sm:flex-row">
            <p className="text-xs text-stone-400">Have an idea? We listen — WhatsApp us your wishlist.</p>
            <a href={WA_ORDER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium hover:bg-stone-50">
              <MessageCircle className="h-3.5 w-3.5 text-emerald-500" /> Share feedback on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Giuseppe's · 173 Avenida Veteranos, Tacloban City · Made with ❤️ for Tacloban
      </footer>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={()=>setShowLightbox(false)}>
          <button onClick={()=>setShowLightbox(false)} className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"><X className="h-5 w-5" /></button>
          <img src={PHOTOS[photoIdx]} alt="" className="max-h-[80vh] max-w-4xl rounded-2xl object-contain" onClick={e=>e.stopPropagation()} onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
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
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-100">
                <Star className="h-4 w-4" /> Also post on Google →
              </a>
              <p className="text-center text-[11px] text-stone-400">Posting here first — then copy to Google to help others find us</p>
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
