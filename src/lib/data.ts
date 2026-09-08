import type { MenuData, HoursData, RestaurantSettings } from "./types";

export const DEFAULT_MENU: MenuData = {
  Antipasto: [
    { name: "Antipasto Italiano", price: "₱480", desc: "Prosciutto, crostini, olives, cheese", img: "/photos/google/placejoys-5.jpg", popular: false },
    { name: "Baked Scallops", price: "₱380", desc: "Fresh Guiuan scallops, garlic butter, herbs (10 pcs)", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Insalata di Mare", price: "₱420", desc: "Mixed seafood salad, lemon vinaigrette", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Tuna Sashimi", price: "₱350", desc: "Fresh tuna, wasabi, soy sauce", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Shrimp Cocktail", price: "₱380", desc: "Jumbo shrimp, house cocktail sauce", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Garlic Bread", price: "₱120", desc: "Toasted sourdough, garlic butter, parsley", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Crostini Alla Livornese", price: "₱280", desc: "Tomato, olive, caper topping on crostini", img: "/photos/google/placejoys-5.jpg", popular: false },
    { name: "Croquette", price: "₱220", desc: "Crispy breaded filling, house sauce", img: "/photos/google/placejoys-5.jpg", popular: false },
  ],
  "Homemade Pasta": [
    { name: "Ravioli Alla Panna", price: "₱380", desc: "Cheese ravioli, cream sauce", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Ravioli Ragu", price: "₱380", desc: "Cheese ravioli, slow-cooked meat ragu", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Ravioli Pepper Pesto", price: "₱380", desc: "Cheese ravioli, roasted pepper pesto", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Fettuccine Alfredo", price: "₱350", desc: "Fresh fettuccine, parmesan cream sauce", img: "/photos/google/wanderlog-2.jpg", popular: true },
    { name: "Fettuccine Puttanesca", price: "₱350", desc: "Tomato, olive, caper, anchovy sauce", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Spaghetti Carbonara", price: "₱340", desc: "Egg, pancetta, pecorino, black pepper", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Pasta Supreme w/ Salsiccia", price: "₱380", desc: "Mixed pasta, Italian sausage, tomato sauce", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Spaghetti w/ White Vodka Sauce", price: "₱360", desc: "Creamy vodka sauce, touch of tomato", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Vodka Supreme w/ Tenderloin", price: "₱480", desc: "Vodka sauce, USDA tenderloin strips", img: "/photos/google/wanderlog-2.jpg", popular: false },
  ],
  Pasta: [
    { name: "Spaghetti Meat Sauce", price: "₱320", desc: "Classic Bolognese, ground beef", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Spaghetti Olive Oil & Garlic", price: "₱280", desc: "Aglio olio, chili flakes", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Spaghetti Marinara w/ Shrimp", price: "₱380", desc: "Tomato sauce, fresh shrimp", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Lasagna", price: "₱380", desc: "Layered pasta, meat sauce, béchamel, cheese", img: "/photos/google/wanderlog-2.jpg", popular: true },
    { name: "Amatriciana", price: "₱340", desc: "Tomato, guanciale, pecorino, chili", img: "/photos/google/wanderlog-2.jpg", popular: false },
    { name: "Pandemonio", price: "₱360", desc: "Chef's special pasta creation", img: "/photos/google/wanderlog-2.jpg", popular: false },
  ],
  Pizza: [
    { name: "Giuseppe's Special No. 1", price: "₱380", desc: "House specialty, wood-fired", img: "/photos/google/placejoys-3.jpg", popular: true },
    { name: "Giuseppe's Special No. 2", price: "₱420", desc: "Second house specialty, wood-fired", img: "/photos/google/placejoys-3.jpg", popular: false },
    { name: "Pizza Margherita", price: "₱320", desc: "San Marzano tomato, mozzarella, basil", img: "/photos/google/wanderlog-3.jpg", popular: true },
    { name: "4 Cheese Pizza", price: "₱420", desc: "Mozzarella, parmesan, gorgonzola, fontina", img: "/photos/google/wanderlog-3.jpg", popular: true },
    { name: "Pizza w/ Salsiccia", price: "₱400", desc: "Italian sausage, tomato sauce, mozzarella", img: "/photos/google/wanderlog-3.jpg", popular: false },
    { name: "Hawaiian Pizza", price: "₱350", desc: "Ham, pineapple, cheese", img: "/photos/google/placejoys-7.jpg", popular: false },
    { name: "Pizza del Venerdi", price: "₱380", desc: "Friday special, seasonal toppings", img: "/photos/google/wanderlog-3.jpg", popular: false },
    { name: "Pizza Marinara", price: "₱300", desc: "Tomato, garlic, oregano, olive oil", img: "/photos/google/wanderlog-3.jpg", popular: false },
    { name: "Everything & Prosciutto Pizza", price: "₱450", desc: "Loaded pizza with prosciutto", img: "/photos/google/wanderlog-3.jpg", popular: false },
  ],
  Beef: [
    { name: "Tenderloin alla Sorrentino", price: "₱680", desc: "USDA Choice tenderloin, tomato, mozzarella, herbs", img: "/photos/google/placejoys-2.jpg", popular: true },
    { name: "Saltimbocca alla Romana", price: "₱620", desc: "Veal, prosciutto, sage, white wine", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Ossobuco", price: "₱720", desc: "Braised veal shank, gremolata, risotto", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Tenderloin w/ Marsala", price: "₱650", desc: "Mushroom marsala wine sauce", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Tenderloin w/ Cream Cognac & Mushroom", price: "₱680", desc: "Cream cognac sauce, sautéed mushrooms", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Tenderloin w/ Onions, Mushrooms & Wine", price: "₱650", desc: "Red wine reduction, caramelized onions", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Medaglioni alla Napoletana", price: "₱620", desc: "Veal medallions, tomato, mozzarella", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Roast Beef w/ Brown Gravy", price: "₱580", desc: "Slow-roasted, brown gravy, mashed potato", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Arrosto Misto", price: "₱1,400", desc: "Chicken breast, porkchop, tenderloin, baby back ribs (good for 2-3)", img: "/photos/google/placejoys-2.jpg", popular: false },
  ],
  Seafood: [
    { name: "Grilled Prawns", price: "₱580", desc: "Jumbo prawns, garlic butter, lemon", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Prawns in Garlic Sauce", price: "₱580", desc: "Jumbo prawns, roasted garlic butter", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Fried Calamari", price: "₱380", desc: "Crispy calamari, marinara dip", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Lapu-Lapu Francese", price: "₱520", desc: "Fresh grouper, egg batter, lemon butter", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Lapu-Lapu w/ Capers & Wine", price: "₱550", desc: "Fresh grouper, caper, white wine sauce", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Grilled Salmon", price: "₱580", desc: "Fresh salmon, herb crust, seasonal vegetables", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Shrimps ala Genovese", price: "₱520", desc: "Shrimp, basil pesto, linguine", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Seafood Platter", price: "₱880", desc: "Calamari, lapu-lapu, shrimp, sword fish (good for 3-4)", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Surf & Turf", price: "₱1,200", desc: "Sword fish, prawns, salsiccia, tenderloin (good for 2)", img: "/photos/google/placejoys-2.jpg", popular: false },
  ],
  Pork: [
    { name: "Grilled Porkchop", price: "₱420", desc: "Monterey pork, herb marinade, grilled", img: "/photos/google/placejoys-2.jpg", popular: true },
    { name: "Porkchop Milanese", price: "₱450", desc: "Breaded pork chop, arugula, lemon", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Porkchop w/ Mushroom Sauce", price: "₱450", desc: "Cream of mushroom, pan-grilled", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Porkchop w/ Sage & Potatoes", price: "₱480", desc: "Sage butter, roasted potatoes", img: "/photos/google/placejoys-2.jpg", popular: false },
    { name: "Beef Baby Back Ribs", price: "₱680", desc: "Slow-smoked, BBQ glaze, coleslaw", img: "/photos/google/placejoys-2.jpg", popular: false },
  ],
  Chicken: [
    { name: "Chicken Milanese", price: "₱380", desc: "Breaded chicken breast, mushroom marsala", img: "/photos/google/placejoys-8.jpg", popular: true },
    { name: "Chicken Parmigiana", price: "₱380", desc: "Breaded chicken, tomato sauce, melted cheese", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Grilled Chicken Breast", price: "₱350", desc: "Herb-marinated, grilled, seasonal vegetables", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Chicken Francese", price: "₱380", desc: "Egg-battered chicken, lemon butter sauce", img: "/photos/google/placejoys-8.jpg", popular: false },
    { name: "Chicken alla Atlanta", price: "₱400", desc: "Grilled chicken, mushroom cream sauce", img: "/photos/google/placejoys-8.jpg", popular: false },
  ],
  Sandwiches: [
    { name: "Club House Sandwich", price: "₱280", desc: "Triple-decker, bacon, lettuce, tomato", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Chicken Parmesan Sandwich", price: "₱280", desc: "Breaded chicken, marinara, mozzarella", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Tuna Melt", price: "₱260", desc: "Tuna salad, melted cheese, toasted bread", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Roast Beef Sandwich", price: "₱300", desc: "Sliced roast beef, horseradish, aioli", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Salsiccia Sandwich", price: "₱280", desc: "Italian sausage, peppers, onions", img: "/photos/google/placejoys-1.jpg", popular: false },
  ],
  Vegetables: [
    { name: "Fresh Lumpia", price: "₱220", desc: "Fresh spring rolls, peanut sauce", img: "/photos/google/placejoys-4.jpg", popular: false },
    { name: "Eggplant Parmigiana", price: "₱280", desc: "Breaded eggplant, tomato sauce, mozzarella", img: "/photos/google/placejoys-4.jpg", popular: false },
    { name: "Caesar's Salad", price: "₱250", desc: "Romaine, parmesan, croutons, Caesar dressing", img: "/photos/google/placejoys-4.jpg", popular: false },
  ],
  Desserts: [
    { name: "Tiramisu", price: "₱280", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa", img: "/photos/google/placejoys-4.jpg", popular: true },
    { name: "Zabaglione w/ Ice Cream", price: "₱250", desc: "Marsala wine custard, vanilla gelato", img: "/photos/google/wanderlog-1.jpg", popular: false },
    { name: "Blueberry Cheesecake", price: "₱220", desc: "New York style, fresh blueberry compote", img: "/photos/google/wanderlog-1.jpg", popular: false },
    { name: "Peaches & Ice Cream", price: "₱180", desc: "Fresh peaches, vanilla gelato", img: "/photos/google/wanderlog-1.jpg", popular: false },
    { name: "Cannoli", price: "₱220", desc: "Crispy shell, sweet ricotta, chocolate chips", img: "/photos/google/wanderlog-1.jpg", popular: false },
    { name: "Fried Banana w/ Ice Cream", price: "₱180", desc: "Crispy banana, vanilla gelato, caramel", img: "/photos/google/wanderlog-1.jpg", popular: false },
  ],
  Drinks: [
    { name: "House Wine (Red/White)", price: "₱180/glass", desc: "Italian table wine, glass or carafe", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Espresso", price: "₱120", desc: "Double-shot Italian espresso", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Cappuccino", price: "₱150", desc: "Espresso, steamed milk, foam", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Fresh Lemonade", price: "₱120", desc: "House-made, refreshing", img: "/photos/google/placejoys-1.jpg", popular: false },
    { name: "Amaretto Digestif", price: "Complimentary", desc: "Complimentary after-meal digestif", img: "/photos/google/placejoys-1.jpg", popular: true },
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
  reviews: 328,
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
  { name: "Sarah L.", rating: 5, text: "The complimentary Amaretto digestif after our meal was such a delightful surprise. Warm, cozy Italian ambiance that makes you feel right at home.", date: "Nov 2025", source: "TripAdvisor" },
  { name: "Marco P.", rating: 5, text: "Best pizza in the Philippines, hands down. The wood-fired brick oven gives it that authentic Neapolitan char. We come here every time we're in Tacloban.", date: "Dec 2025", source: "Google" },
];

export const AWARDS = [
  { platform: "Google", rating: 4.4, reviews: 328 },
  { platform: "TripAdvisor", rating: 4.2, reviews: 184, badge: "Travelers' Choice" },
  { platform: "Menuweb", rating: 4.3, reviews: 555 },
  { platform: "Restaurant Guru", rank: 2, total: 811 },
];

export const FEATURES = [
  { icon: "flame", title: "Wood-Fired Brick Oven", desc: "Authentic Neapolitan-style pizza, handmade fresh daily" },
  { icon: "wine", title: "Italian Wine List", desc: "Imported Italian wines, craft cocktails, and spirits" },
  { icon: "gift", title: "Complimentary Amaretto", desc: "Free digestif after your meal — our signature gesture" },
  { icon: "store", title: "Italian Deli & Shop", desc: "Imported olive oil, balsamic, cheeses, cold cuts, wines to-go" },
  { icon: "utensils", title: "Premium Ingredients", desc: "USDA Choice beef, Monterey pork, fresh never-frozen fish" },
  { icon: "users", title: "Private Dining & Events", desc: "2nd floor venue for 25-50 pax — parties, concerts, launches" },
  { icon: "wifi", title: "Free WiFi", desc: "Complimentary high-speed WiFi for all guests" },
  { icon: "car", title: "Free Parking", desc: "Free street parking available right outside" },
  { icon: "baby", title: "Family Friendly", desc: "Kids menu, high chairs, wheelchair accessible" },
];
