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
  qrImg: "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://giusseppe.vercel.app/menu",
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

export type MenuItem = { name: string; price: string; desc: string; popular?: boolean; image?: string };

export const MENU: Record<string, MenuItem[]> = {
  Antipasti: [
    { name: "Focaccia", price: "₱180", desc: "Warm house-baked flatbread, rosemary, olive oil", popular: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
    { name: "Bruschetta al Pomodoro", price: "₱320", desc: "Grilled sourdough, fresh tomatoes, basil, extra virgin olive oil", popular: true, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
    { name: "Calamari Fritti", price: "₱480", desc: "Lightly fried squid, lemon aioli, marinara", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
    { name: "Antipasto Platter", price: "₱680", desc: "Prosciutto, salami, olives, cheese, artichokes, grilled bread", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop" },
    { name: "Baked Scallops", price: "₱580", desc: "Fresh scallops, garlic butter, parmesan crust", image: "https://images.unsplash.com/photo-1635146037526-a164a3b84f9b?w=400&h=300&fit=crop" },
  ],
  "Wood-Fired Pizza": [
    { name: "Margherita", price: "₱420", desc: "San Marzano tomato, fresh mozzarella, basil", popular: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
    { name: "Prosciutto e Rucola", price: "₱520", desc: "Parma ham, wild arugula, parmesan shavings", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
    { name: "Hawaiian", price: "₱480", desc: "Ham, pineapple, mozzarella, tomato sauce", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop" },
    { name: "Quattro Formaggi", price: "₱520", desc: "Mozzarella, gorgonzola, parmesan, fontina", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
    { name: "Capricciosa", price: "₱520", desc: "Ham, mushrooms, artichokes, olives, mozzarella", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop" },
  ],
  Primi: [
    { name: "Spaghetti Puttanesca", price: "₱420", desc: "Tomato sauce, olives, capers, anchovies, garlic", popular: true, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop" },
    { name: "Lasagna", price: "₱480", desc: "Layers of pasta, beef ragù, béchamel, mozzarella, parmesan", popular: true, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop" },
    { name: "Ravioli", price: "₱520", desc: "House-made ricotta & spinach pasta, sage butter", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
    { name: "Spaghetti al Salsiccia", price: "₱450", desc: "Italian sausage, garlic, chili flakes, olive oil", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
    { name: "Risotto ai Funghi", price: "₱580", desc: "Creamy carnaroli rice, porcini, wild mushrooms, thyme", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop" },
    { name: "Cacio e Pepe", price: "₱420", desc: "Tonarelli, black pepper, Pecorino Romano DOP", image: "https://images.unsplash.com/photo-1677756119517-756a6a555c7f?w=400&h=300&fit=crop" },
  ],
  Secondi: [
    { name: "Grilled Pork Chop", price: "₱580", desc: "Marinated bone-in pork chop, garlic mashed potatoes, vegetables", popular: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
    { name: "Chicken Milanese", price: "₱480", desc: "Crispy breaded chicken breast, Marsala sauce, pasta", popular: true, image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop" },
    { name: "Grilled Salmon", price: "₱680", desc: "Fresh salmon fillet, lemon butter, seasonal vegetables", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop" },
    { name: "Ribeye Steak", price: "₱980", desc: "USDA ribeye, your choice of peppercorn or mushroom sauce", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop" },
    { name: "Pork Ribs", price: "₱780", desc: "Slow-cooked spare ribs, BBQ glaze, coleslaw", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
    { name: "Melanzane alla Parmigiana", price: "₱420", desc: "Baked eggplant, San Marzano tomato, mozzarella, basil", image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop" },
  ],
  Dolci: [
    { name: "Tiramisu", price: "₱320", desc: "Espresso-soaked savoiardi, mascarpone cream, cocoa", popular: true, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
    { name: "Panna Cotta", price: "₱280", desc: "Vanilla panna cotta, warm berry compote", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" },
  ],
  Drinks: [
    { name: "House Wine (Red/White)", price: "₱280", desc: "Selected Italian wine, glass", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop" },
    { name: "Negroni", price: "₱380", desc: "Campari, sweet vermouth, gin", image: "https://images.unsplash.com/photo-1514362545857-3bc16c1c57e7?w=400&h=300&fit=crop" },
    { name: "Amalfi Spritz", price: "₱350", desc: "Limoncello, prosecco, soda, basil", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop" },
    { name: "San Pellegrino", price: "₱120", desc: "Sparkling mineral water, 500ml", image: "https://images.unsplash.com/photo-1523362628745-0c100fc988a5?w=400&h=300&fit=crop" },
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

export async function fetchMenu(): Promise<Record<string, MenuItem[]>> {
  try {
    const res = await fetch("/api/menu", { next: { revalidate: 60 } });
    const data = await res.json();
    if (res.ok && data.data) {
      return data.data;
    }
  } catch {}
  return MENU;
}

export async function fetchPhotos(): Promise<string[]> {
  try {
    const res = await fetch("/api/photos", { next: { revalidate: 60 } });
    const data = await res.json();
    if (res.ok && data.data?.length) {
      return data.data.map((p: { url: string }) => p.url);
    }
  } catch {}
  return PHOTOS;
}

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
