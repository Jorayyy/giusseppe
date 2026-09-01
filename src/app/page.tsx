"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Phone, Clock, Navigation, Share2, Bookmark, BookmarkCheck, UtensilsCrossed, ChevronRight, ChevronLeft, ExternalLink, Check, Wine, X, ArrowLeft } from "lucide-react";

const R = {
  name: "Giuseppe's",
  tagline: "Authentic Italian-Filipino Restaurant",
  since: "1992",
  rating: 4.4,
  reviews: 315,
  price: "₱500–2,000",
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  phone: "0945 841 9400",
  phoneHref: "tel:+639458419400",
  maps: "https://www.google.com/maps/place/?q=ChIJAQAAANB2CDMRQJ530mS0AI8",
  google: "https://www.google.com/maps/place/@11.241723,125.000744,17z/data=!4m10!3m9!1s0x330876d000000001:0x8f00b464d2779e40!5m2!4m1!1i2!8m2!3d11.241723!4d125.000744!9m1!1b1",
  facebook: "https://www.facebook.com/giuseppesresto",
  instagram: "https://www.instagram.com/giuseppestacloban/",
  website: "https://giuseppesresto.net",
};

const HOURS: Record<string, string> = {
  Monday: "11 AM – 4 PM, 5 – 9:30 PM", Tuesday: "11 AM – 4 PM, 5 – 9:30 PM", Wednesday: "11 AM – 4 PM, 5 – 9:30 PM",
  Thursday: "11 AM – 4 PM, 5 – 9:30 PM", Friday: "11 AM – 4 PM, 5 – 10:30 PM", Saturday: "11 AM – 4 PM, 5 – 10:30 PM", Sunday: "11 AM – 4 PM, 5 – 9:30 PM",
};

const MENU = {
  "Antipasto": [
    { name: "Antipasto Italiano", desc: "Prosciutto, crostini, olives, cheese", price: "₱480", img: "/photos/real/food-1.jpg" },
    { name: "Baked Scallops", desc: "Fresh Guiuan scallops, garlic butter, herbs", price: "₱380", img: "/photos/real/food-7.jpg", top: true },
    { name: "Insalata di Mare", desc: "Mixed seafood salad, lemon vinaigrette", price: "₱420", img: "/photos/real/food-2.jpg" },
    { name: "Garlic Bread", desc: "Toasted sourdough, garlic butter, parsley", price: "₱120", img: "/photos/real/food-3.jpg" },
    { name: "Crostini Alla Livornese", desc: "Tomato, olive, caper topping on crostini", price: "₱280", img: "/photos/real/food-1.jpg" },
  ],
  "Homemade Pasta": [
    { name: "Ravioli Alla Panna", desc: "Cheese ravioli, cream sauce", price: "₱380", img: "/photos/real/food-10.jpg" },
    { name: "Fettuccine Alfredo", desc: "Fresh fettuccine, parmesan cream sauce", price: "₱350", img: "/photos/real/food-11.jpg", top: true },
    { name: "Fettuccine Puttanesca", desc: "Tomato, olive, caper, anchovy sauce", price: "₱350", img: "/photos/real/food-11.jpg" },
    { name: "Spaghetti Carbonara", desc: "Egg, pancetta, pecorino, black pepper", price: "₱340", img: "/photos/real/food-11.jpg" },
    { name: "Pasta Supreme w/ Salsiccia", desc: "Mixed pasta, Italian sausage, tomato sauce", price: "₱380", img: "/photos/real/food-10.jpg" },
  ],
  "Pizza": [
    { name: "Giuseppe's Special No. 1", desc: "House specialty, wood-fired", price: "₱380", img: "/photos/real/food-12.jpg", top: true },
    { name: "Pizza Margherita", desc: "San Marzano tomato, mozzarella, basil", price: "₱320", img: "/photos/real/food-12.jpg" },
    { name: "4 Cheese Pizza", desc: "Mozzarella, parmesan, gorgonzola, fontina", price: "₱420", img: "/photos/real/food-12.jpg" },
    { name: "Pizza w/ Salsiccia", desc: "Italian sausage, tomato sauce, mozzarella", price: "₱400", img: "/photos/real/food-12.jpg" },
    { name: "Hawaiian Pizza", desc: "Ham, pineapple, cheese", price: "₱350", img: "/photos/real/food-12.jpg" },
  ],
  "Beef": [
    { name: "Tenderloin alla Sorrentino", desc: "USDA Choice tenderloin, tomato, mozzarella, herbs", price: "₱680", img: "/photos/real/food-4.jpg", top: true },
    { name: "Saltimbocca alla Romana", desc: "Veal, prosciutto, sage, white wine", price: "₱620", img: "/photos/real/food-5.jpg" },
    { name: "Ossobuco", desc: "Braised veal shank, gremolata, risotto", price: "₱720", img: "/photos/real/food-5.jpg" },
    { name: "Tenderloin w/ Marsala", desc: "Mushroom marsala wine sauce", price: "₱650", img: "/photos/real/food-4.jpg" },
  ],
  "Seafood": [
    { name: "Grilled Prawns", desc: "Jumbo prawns, garlic butter, lemon", price: "₱580", img: "/photos/real/food-6.jpg" },
    { name: "Lapu-Lapu Francese", desc: "Fresh grouper, egg batter, lemon butter", price: "₱520", img: "/photos/real/food-6.jpg", top: true },
    { name: "Seafood Platter", desc: "Calamari, lapu-lapu, shrimp, sword fish", price: "₱880", img: "/photos/real/food-9.jpg" },
    { name: "Surf & Turf", desc: "Sword fish, prawns, salsiccia, tenderloin (good for 2)", price: "₱1,200", img: "/photos/real/food-9.jpg" },
  ],
  "Pork": [
    { name: "Grilled Porkchop", desc: "Monterey pork, herb marinade, grilled", price: "₱420", img: "/photos/real/food-4.jpg", top: true },
    { name: "Porkchop Milanese", desc: "Breaded pork chop, arugula, lemon", price: "₱450", img: "/photos/real/food-5.jpg" },
    { name: "Porkchop w/ Mushroom Sauce", desc: "Cream of mushroom, pan-grilled", price: "₱450", img: "/photos/real/food-4.jpg" },
  ],
  "Chicken": [
    { name: "Chicken Milanese", desc: "Breaded chicken breast, mushroom marsala", price: "₱380", img: "/photos/real/food-8.jpg" },
    { name: "Chicken Parmigiana", desc: "Breaded chicken, tomato sauce, melted cheese", price: "₱380", img: "/photos/real/food-8.jpg" },
    { name: "Grilled Chicken Breast", desc: "Herb-marinated, grilled, seasonal vegetables", price: "₱350", img: "/photos/real/food-8.jpg" },
  ],
  "Desserts": [
    { name: "Tiramisu", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa", price: "₱280", img: "/photos/real/food-3.jpg", top: true },
    { name: "Zabaglione w/ Ice Cream", desc: "Marsala wine custard, vanilla gelato", price: "₱250", img: "/photos/real/food-3.jpg" },
    { name: "Blueberry Cheesecake", desc: "New York style, fresh blueberry compote", price: "₱220", img: "/photos/real/food-3.jpg" },
    { name: "Peaches & Ice Cream", desc: "Fresh peaches, vanilla gelato", price: "₱180", img: "/photos/real/food-3.jpg" },
  ],
  "Drinks": [
    { name: "House Wine (Red/White)", desc: "Italian table wine, glass or carafe", price: "₱180/glass", img: "/photos/real/food-1.jpg" },
    { name: "Espresso", desc: "Double-shot Italian espresso", price: "₱120", img: "/photos/real/food-1.jpg" },
    { name: "Cappuccino", desc: "Espresso, steamed milk, foam", price: "₱150", img: "/photos/real/food-1.jpg" },
    { name: "Fresh Lemonade", desc: "House-made, refreshing", price: "₱120", img: "/photos/real/food-1.jpg" },
  ],
};

const REVIEWS = [
  { name: "Ibizian I.", rating: 5, text: "Amazing baked lasagna! Great pork chop.. fantastic service. Just an absolutely perfect place to enjoy an excellent meal and then top it off with the 3rd best tiramisu I've ever had in the world!", date: "Sep 2025", source: "Google" },
  { name: "Mackie B.", rating: 5, text: "Everything was perfect. From the food to the service. We had some of their pizzas, pastas, and porkchop (all of which, we recommend). Staff were mindful of our needs and were eager to fulfill our requests.", date: "Oct 2025", source: "Google" },
  { name: "Rene T.", rating: 5, text: "This is really a hot top spot for first class fine dining. I did not expect a restaurant like this in Tacloban. Great!", date: "Jan 2026", source: "Google" },
  { name: "Jiah M.", rating: 5, text: "Nice authentic Italian-Filipino restaurant. Known to be an institution in Tacloban for some. Everything we had was delicious. Glad I was able to visit!", date: "Sep 2024", source: "Google" },
  { name: "Enrico M.", rating: 4, text: "Good food & service in the 3 times I've been here. The meat is already good — simple sauce will do.", date: "Sep 2025", source: "Google" },
];

const PHOTOS = ["/photos/real/food-1.jpg", "/photos/real/food-2.jpg", "/photos/real/food-3.jpg", "/photos/real/interior.jpg", "/photos/real/food-4.jpg", "/photos/real/food-5.jpg", "/photos/real/exterior.jpg", "/photos/real/food-6.jpg", "/photos/real/food-7.jpg", "/photos/real/food-8.jpg", "/photos/real/food-9.jpg", "/photos/real/food-10.jpg", "/photos/real/food-11.jpg", "/photos/real/food-12.jpg"];
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Home() {
  const [cat, setCat] = useState<keyof typeof MENU>("Antipasto");
  const [photo, setPhoto] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [selectedDish, setSelectedDish] = useState<{ name: string; desc: string; price: string; img: string } | null>(null);
  const [reviews] = useState(REVIEWS);

  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const h = new Date().getHours();
  const open = (h >= 11 && h < 16) || (h >= 17 && h < 21.5);

  const toast_ = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const share = async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); toast_("Link copied"); setTimeout(() => setCopied(false), 2000); };
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-stone-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <button onClick={() => scroll("hero")} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 font-serif text-sm font-bold text-white italic">G</div>
            <span className="font-serif text-lg font-bold tracking-tight italic">Giuseppe&apos;s</span>
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {["Menu", "Hours", "Reviews"].map((s) => (
              <button key={s} onClick={() => scroll(s.toLowerCase())} className="rounded-full px-3 py-1.5 text-sm font-medium text-stone-500 transition hover:text-amber-700">{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href={R.phoneHref} className="hidden items-center gap-1.5 rounded-full bg-amber-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700 sm:inline-flex"><Phone className="h-4 w-4" /> Call</a>
            <a href={R.maps} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium transition hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative h-[85vh] w-full overflow-hidden">
        <motion.div key={photo} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
          <img src={PHOTOS[photo]} alt="Giuseppe's Restaurant" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = PHOTOS[0]; }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-2">Est. {R.since}</p>
            <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-7xl italic">Giuseppe&apos;s</h1>
            <p className="mt-2 text-lg text-white/80">{R.tagline}</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {R.rating} · {R.reviews} reviews</span>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${open ? "bg-emerald-500" : "bg-white/20"}`}><Clock className="h-4 w-4" /> {open ? "Open now" : "Closed"}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={R.phoneHref} className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700">Call to Reserve</a>
              <button onClick={() => scroll("menu")} className="rounded-full border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View Menu</button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {PHOTOS.map((_, i) => (<button key={i} onClick={() => setPhoto(i)} className={`h-1.5 rounded-full transition-all ${i === photo ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />))}
        </div>
        <button onClick={() => setPhoto((p) => (p + 1) % PHOTOS.length)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"><ChevronRight className="h-5 w-5" /></button>
        <button onClick={() => setPhoto((p) => (p - 1 + PHOTOS.length) % PHOTOS.length)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"><ChevronLeft className="h-5 w-5" /></button>
      </section>

      {/* Actions */}
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex flex-wrap gap-2">
          <a href={R.maps} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
          <a href={R.phoneHref} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><Phone className="h-4 w-4" /> Call</a>
          <button onClick={() => setShowFullMenu(true)} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><UtensilsCrossed className="h-4 w-4" /> Full Menu</button>
          <button onClick={() => setSaved(!saved)} className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${saved ? "border-amber-200 bg-amber-50 text-amber-700" : "border-stone-200 hover:bg-stone-50"}`}>{saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />} {saved ? "Saved" : "Save"}</button>
          <button onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">{copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />} {copied ? "Copied" : "Share"}</button>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 pb-28">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold">About</h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                Giuseppe&apos;s is a husband-wife tandem of Italian-American Joseph Bonavitacola and Taclobanon Cathy Añover, opened in October 1992. Joseph inherited the Italian cooking tradition from Guardia Dei Lombardi, Avellino, Italy. We serve fresh, flavorful Italian dishes — USDA Choice beef, Monterey pork and chicken, fresh never frozen fish, and extra virgin olive oil imported from Southern Italy.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-stone-400"><Wine className="h-3.5 w-3.5" /> Wine list · Italian imports · Wood-fired oven</div>
            </motion.section>

            {/* Menu — Interactive Grid */}
            <motion.section id="menu" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Menu Highlights</h2>
                <button onClick={() => setShowFullMenu(true)} className="text-sm font-medium text-amber-600 hover:text-amber-700">Full menu →</button>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {Object.keys(MENU).map((c) => (
                  <button key={c} onClick={() => setCat(c as keyof typeof MENU)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-zinc-900 text-white" : "bg-stone-100 hover:bg-stone-200"}`}>{c}</button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {MENU[cat].map((item) => (
                  <button key={item.name} onClick={() => setSelectedDish(item)} className="group overflow-hidden rounded-2xl border border-stone-100 bg-white text-left transition hover:shadow-lg">
                    <div className="relative h-36 overflow-hidden">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = PHOTOS[0]; }} />
                      {"top" in item && item.top && <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow">Popular</span>}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold leading-tight">{item.name}</h3>
                      <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.desc}</p>
                      <p className="mt-2 text-sm font-bold text-amber-700">{item.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Hours */}
            <motion.section id="hours" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold">Hours</h2>
              <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${open ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}><Clock className="h-3 w-3" /> {open ? "Open now" : "Closed"} · Opens 11 AM</p>
              <div className="mt-4 divide-y divide-stone-100 text-sm">
                {Object.entries(HOURS).map(([day, hours]) => (
                  <div key={day} className={`flex justify-between py-2 ${day === dayName ? "font-semibold text-amber-700" : "text-stone-600"}`}><span>{day}</span><span className="tabular-nums">{hours}</span></div>
                ))}
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section id="reviews" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <a href={R.google} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-amber-600 hover:text-amber-700">See all on Google →</a>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-3xl font-bold">{R.rating}</span>
                <div>
                  <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-4 w-4 ${s <= Math.round(R.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />)}</div>
                  <p className="text-xs text-stone-500">{R.reviews} Google reviews</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-xl bg-stone-50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{r.name}</span>
                      <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />)}</div>
                      <span className="text-xs text-stone-400">{r.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{r.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <a href={R.google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> All Google Reviews</a>
                <a href={R.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">Facebook</a>
                <a href={R.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">Instagram</a>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl bg-zinc-900 p-6 text-white">
              <h3 className="text-lg font-bold">Reserve a table</h3>
              <p className="mt-1 text-sm text-white/60">Especially for Friday &amp; Saturday nights.</p>
              <a href={R.phoneHref} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"><Phone className="h-4 w-4" /> Call to Reserve</a>
              <p className="mt-2 text-center text-[11px] text-white/40">{R.phone}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold">Contact</h3>
              <div className="mt-3 space-y-3 text-sm">
                <a href={R.maps} target="_blank" className="flex gap-3 hover:text-amber-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" /><span>{R.address}<br /><span className="text-amber-600">Get directions</span></span></a>
                <a href={R.phoneHref} className="flex items-center gap-3 hover:text-amber-600"><Phone className="h-4 w-4 text-stone-400" /> {R.phone}</a>
                <div className="flex items-center gap-3 text-stone-600"><Clock className="h-4 w-4 text-stone-400" />{open ? "Open" : "Closed"} · Opens 11 AM</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={R.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2 text-sm font-medium text-white transition hover:bg-amber-700"><Phone className="h-4 w-4" /> Call</a>
                <a href={R.maps} target="_blank" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2 text-sm font-medium transition hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="overflow-hidden rounded-2xl border border-stone-200">
              <iframe title="map" src="https://maps.google.com/maps?q=173%20Avenida%20Veteranos%20Tacloban%20City&z=15&output=embed" className="h-64 w-full border-0" loading="lazy" />
              <a href={R.maps} target="_blank" className="flex items-center justify-center gap-1 border-t border-stone-200 py-3 text-sm font-medium transition hover:bg-stone-50"><ExternalLink className="h-4 w-4" /> Open in Maps</a>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-100 py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Giuseppe&apos;s Restaurant · Est. {R.since} · {R.address}
        <div className="mt-2 flex items-center justify-center gap-3">
          <a href={R.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">Facebook</a>
          <a href={R.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">Instagram</a>
          <a href={R.website} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">Website</a>
        </div>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-100 bg-white px-4 py-3 md:hidden">
        <div className="flex gap-2">
          <a href={R.phoneHref} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2.5 text-sm font-semibold text-white"><Phone className="h-4 w-4" /> Call</a>
          <a href={R.maps} target="_blank" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2.5 text-sm font-semibold"><Navigation className="h-4 w-4" /> Directions</a>
        </div>
      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={() => setSelectedDish(null)}>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-t-2xl bg-white sm:rounded-2xl">
              <div className="relative h-56">
                <img src={selectedDish.img} alt={selectedDish.name} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = PHOTOS[0]; }} />
                <button onClick={() => setSelectedDish(null)} className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">{selectedDish.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{selectedDish.desc}</p>
                <p className="mt-3 text-2xl font-bold text-amber-700">{selectedDish.price}</p>
                <div className="mt-4 flex gap-2">
                  <a href={R.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-600 py-3 text-sm font-semibold text-white transition hover:bg-amber-700">
                    <Phone className="h-4 w-4" /> Call to Order
                  </a>
                  <button onClick={() => setSelectedDish(null)} className="rounded-full border border-stone-200 px-4 py-3 text-sm font-medium transition hover:bg-stone-50">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Menu Modal */}
      {showFullMenu && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
            <button onClick={() => setShowFullMenu(false)} className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-amber-600"><ArrowLeft className="h-4 w-4" /> Back</button>
            <h2 className="text-lg font-bold">Full Menu</h2>
            <div className="w-16" />
          </div>
          <div className="mx-auto max-w-2xl p-4">
            <div className="flex gap-2 overflow-x-auto pb-4 sticky top-14 bg-white z-10 py-3">
              {Object.keys(MENU).map((c) => (<button key={c} onClick={() => setCat(c as keyof typeof MENU)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${cat === c ? "bg-zinc-900 text-white" : "bg-stone-100"}`}>{c}</button>))}
            </div>
            <div className="space-y-4">
              {MENU[cat].map((item) => (
                <button key={item.name} onClick={() => { setSelectedDish(item); setShowFullMenu(false); }} className="flex w-full gap-4 rounded-xl bg-stone-50 p-3 text-left transition hover:bg-stone-100">
                  <img src={item.img} alt={item.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = PHOTOS[0]; }} />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name} {"top" in item && item.top && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700">Popular</span>}</h3>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                    <p className="mt-1 text-sm font-bold text-amber-700">{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-stone-400">Prices may vary. Full menu available at the restaurant.</p>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg md:bottom-8">{toast}</div>}
    </div>
  );
}
