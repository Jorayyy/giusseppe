export const RESTAURANT = {
  name: "Giuseppe's",
  tagline: "Authentic Italian Cucina",
  rating: 4.4,
  reviewCount: 328,
  priceRange: "₱500–2,000",
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  phone: "0931 970 4073",
  phoneHref: "tel:+639319704073",
  mapsUrl: "https://maps.google.com/?q=173+Avenida+Veteranos+Tacloban+City+6500+Leyte",
  waOrderUrl: "https://wa.me/639319704073?text=Hi%20Giuseppe's!%20I'd%20like%20to%20order...",
  googleReviewUrl: "https://www.google.com/search?q=Giuseppe's+Tacloban+reviews",
  qrImg: "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://giusseppe.vercel.app",
} as const;

export const HOURS: Record<string, { open: string; close: string; open2?: string; close2?: string }> = {
  Monday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Tuesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Wednesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Thursday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Friday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Saturday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Sunday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
};

export const HOURS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export const POPULAR: Record<string, number[]> = {
  Monday: [10, 15, 35, 55, 70, 60, 45, 30, 25, 35, 60, 75],
  Tuesday: [12, 18, 40, 60, 75, 65, 50, 32, 28, 40, 65, 70],
  Wednesday: [15, 20, 38, 58, 68, 62, 48, 35, 30, 38, 58, 68],
  Thursday: [14, 22, 42, 62, 72, 66, 52, 36, 32, 42, 62, 72],
  Friday: [20, 35, 65, 80, 85, 75, 60, 55, 65, 80, 90, 85],
  Saturday: [25, 45, 75, 85, 90, 80, 70, 65, 75, 88, 92, 90],
  Sunday: [18, 30, 55, 70, 78, 70, 55, 40, 35, 50, 65, 60],
};

export const HOURS_LABELS = ["11AM", "12PM", "1PM", "2PM", "3PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

export type MenuItem = { name: string; price: string; desc: string; popular?: boolean };

export const MENU: Record<string, MenuItem[]> = {
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

export type Review = {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
};

export const DEFAULT_REVIEWS: Review[] = [
  { name: "Isabella M.", avatar: "IM", rating: 5, date: "2 weeks ago", text: "The best Italian outside of Rome. Cacio e pepe was transcendent — simple, perfect, and the cocktails are world-class. Service was warm and attentive.", likes: 12 },
  { name: "Marco D.", avatar: "MD", rating: 5, date: "a month ago", text: "Giuseppe's never disappoints. Tagliata di Manzo cooked exactly medium-rare, burrata was cloud-like. Loved that dogs are welcome on the terrace.", likes: 8 },
  { name: "Sarah & James", avatar: "SJ", rating: 4, date: "3 weeks ago", text: "Great for families — high chairs available and staff were lovely with our toddler. Bruschetta and gnocchi al tartufo were highlights. Will be back!", likes: 5 },
];

export const PHOTOS = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
  "/photos/6.jpg",
];

export function isOpen(now: Date): boolean {
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const h = now.getHours();
  const m = now.getMinutes();
  const time = h + m / 60;

  if (time >= 11 && time < 16) return true;

  const isLateNight = day === "Friday" || day === "Saturday";
  const closeTime = isLateNight ? 22.5 : 21.5;
  return time >= 17 && time < closeTime;
}
