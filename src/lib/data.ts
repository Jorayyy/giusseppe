import type { MenuData, HoursData, RestaurantSettings } from "./types";

export const DEFAULT_MENU: MenuData = {
  Antipasto: [
    { name: "Antipasto Italiano", price: "₱480", desc: "Prosciutto, crostini, olives, cheese", img: "/photos/google/placejoys-5.jpg", popular: false },
    { name: "Baked Scallops", price: "₱380", desc: "Fresh Guiuan scallops, garlic butter, herbs", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Insalata di Mare", price: "₱420", desc: "Mixed seafood salad, lemon vinaigrette", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Garlic Bread", price: "₱120", desc: "Toasted sourdough, garlic butter, parsley", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Crostini Alla Livornese", price: "₱280", desc: "Tomato, olive, caper topping on crostini", img: "/photos/google/placejoys-5.jpg", popular: false },
  ],
  "Homemade Pasta": [
    { name: "Ravioli Alla Panna", price: "₱380", desc: "Cheese ravioli, cream sauce", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Fettuccine Alfredo", price: "₱350", desc: "Fresh fettuccine, parmesan cream sauce", img: "/photos/google/wanderlog-2.jpg", popular: true },
    { name: "Fettuccine Puttanesca", price: "₱350", desc: "Tomato, olive, caper, anchovy sauce", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Spaghetti Carbonara", price: "₱340", desc: "Egg, pancetta, pecorino, black pepper", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Pasta Supreme w/ Salsiccia", price: "₱380", desc: "Mixed pasta, Italian sausage, tomato sauce", img: "/photos/google/wanderlog-2.jpg", popular: false },
  ],
  Pizza: [
    { name: "Giuseppe's Special No. 1", price: "₱380", desc: "House specialty, wood-fired", img: "/photos/google/placejoys-3.jpg", popular: true },
    { name: "Pizza Margherita", price: "₱320", desc: "San Marzano tomato, mozzarella, basil", img: "/photos/google/wanderlog-3.jpg", popular: false },
    { name: "4 Cheese Pizza", price: "₱420", desc: "Mozzarella, parmesan, gorgonzola, fontina", img: "/photos/google/wanderlog-3.jpg", popular: false },
    { name: "Pizza w/ Salsiccia", price: "₱400", desc: "Italian sausage, tomato sauce, mozzarella", img: "/photos/google/wanderlog-3.jpg", popular: false },
    { name: "Hawaiian Pizza", price: "₱350", desc: "Ham, pineapple, cheese", img: "/photos/google/placejoys-7.jpg", popular: false },
  ],
  Beef: [
    { name: "Tenderloin alla Sorrentino", price: "₱680", desc: "USDA Choice tenderloin, tomato, mozzarella, herbs", img: "/photos/google/placejoys-2.jpg", popular: true },
    { name: "Saltimbocca alla Romana", price: "₱620", desc: "Veal, prosciutto, sage, white wine", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Ossobuco", price: "₱720", desc: "Braised veal shank, gremolata, risotto", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Tenderloin w/ Marsala", price: "₱650", desc: "Mushroom marsala wine sauce", img: "/photos/google/placejoys-2.jpg", popular: false },
  ],
  Seafood: [
    { name: "Grilled Prawns", price: "₱580", desc: "Jumbo prawns, garlic butter, lemon", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Lapu-Lapu Francese", price: "₱520", desc: "Fresh grouper, egg batter, lemon butter", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Seafood Platter", price: "₱880", desc: "Calamari, lapu-lapu, shrimp, sword fish", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Surf & Turf", price: "₱1,200", desc: "Sword fish, prawns, salsiccia, tenderloin (good for 2)", img: "/photos/google/placejoys-2.jpg", popular: false },
  ],
  Pork: [
    { name: "Grilled Porkchop", price: "₱420", desc: "Monterey pork, herb marinade, grilled", img: "/photos/google/placejoys-2.jpg", popular: true },
    { name: "Porkchop Milanese", price: "₱450", desc: "Breaded pork chop, arugula, lemon", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Porkchop w/ Mushroom Sauce", price: "₱450", desc: "Cream of mushroom, pan-grilled", img: "/photos/google/placejoys-2.jpg", popular: false },
  ],
  Chicken: [
    { name: "Chicken Milanese", price: "₱380", desc: "Breaded chicken breast, mushroom marsala", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Chicken Parmigiana", price: "₱380", desc: "Breaded chicken, tomato sauce, melted cheese", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Grilled Chicken Breast", price: "₱350", desc: "Herb-marinated, grilled, seasonal vegetables", img: "/photos/google/placejoys-8.jpg", popular: false },
  ],
  Desserts: [
    { name: "Tiramisu", price: "₱280", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa", img: "/photos/google/placejoys-4.jpg", popular: true },
    { name: "Zabaglione w/ Ice Cream", price: "₱250", desc: "Marsala wine custard, vanilla gelato", img: "/photos/google/wanderlog-1.jpg", popular: false },
    { name: "Blueberry Cheesecake", price: "₱220", desc: "New York style, fresh blueberry compote", img: "/photos/google/wanderlog-1.jpg", popular: false },
    { name: "Peaches & Ice Cream", price: "₱180", desc: "Fresh peaches, vanilla gelato", img: "/photos/google/wanderlog-1.jpg", popular: false },
  ],
  Drinks: [
    { name: "House Wine (Red/White)", price: "₱180/glass", desc: "Italian table wine, glass or carafe", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Espresso", price: "₱120", desc: "Double-shot Italian espresso", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Cappuccino", price: "₱150", desc: "Espresso, steamed milk, foam", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Fresh Lemonade", price: "₱120", desc: "House-made, refreshing", img: "/photos/google/placejoys-1.jpg", popular: false },
  ],
};

export const DEFAULT_HOURS: HoursData = {
  Monday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Tuesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Wednesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Thursday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Friday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "10:30 PM" },
  Saturday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "10:30 PM" },
  Sunday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
};

export const DEFAULT_PHOTOS = [
  "/photos/google/placejoys-1.jpg",
  "/photos/google/placejoys-10.jpg",
  "/photos/google/placejoys-3.jpg",
  "/photos/google/placejoys-2.jpg",
  "/photos/google/placejoys-4.jpg",
  "/photos/google/placejoys-5.jpg",
  "/photos/google/placejoys-7.jpg",
  "/photos/google/placejoys-8.jpg",
  "/photos/google/wanderlog-1.jpg",
  "/photos/google/wanderlog-2.jpg",
];

export const DEFAULT_SETTINGS: RestaurantSettings = {
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

export const HOURS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export const REVIEWS = [
  { name: "Ibizian I.", rating: 5, text: "Amazing baked lasagna! Great pork chop.. fantastic service. Just an absolutely perfect place to enjoy an excellent meal and then top it off with the 3rd best tiramisu I've ever had in the world!", date: "Sep 2025", source: "Google" },
  { name: "Mackie B.", rating: 5, text: "Everything was perfect. From the food to the service. We had some of their pizzas, pastas, and porkchop (all of which, we recommend). Staff were mindful of our needs and were eager to fulfill our requests.", date: "Oct 2025", source: "Google" },
  { name: "Rene T.", rating: 5, text: "This is really a hot top spot for first class fine dining. I did not expect a restaurant like this in Tacloban. Great!", date: "Jan 2026", source: "Google" },
  { name: "Jiah M.", rating: 5, text: "Nice authentic Italian-Filipino restaurant. Known to be an institution in Tacloban for some. Everything we had was delicious. Glad I was able to visit!", date: "Sep 2024", source: "Google" },
  { name: "Enrico M.", rating: 4, text: "Good food & service in the 3 times I've been here. The meat is already good — simple sauce will do.", date: "Sep 2025", source: "Google" },
];
