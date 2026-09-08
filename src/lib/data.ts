import type { MenuData, HoursData, RestaurantSettings } from "./types";

export const DEFAULT_MENU: MenuData = {
  Antipasto: [
    { name: "Antipasto Italiano", price: "₱480", desc: "Prosciutto, crostini, olives, cheese", img: "https://images.pexels.com/photos/35074681/pexels-photo-35074681.jpeg", popular: false },
    { name: "Baked Scallops", price: "₱380", desc: "Fresh Guiuan scallops, garlic butter, herbs (10 pcs)", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", popular: true },
    { name: "Insalata di Mare", price: "₱420", desc: "Mixed seafood salad, lemon vinaigrette", img: "https://www.foodandwine.com/thmb/jI3F6HqXwyxYuVwrmPo2bSJDV6c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Insalata-di-Frutti-di-Mare-Italian-Seafood-Salad-FT-MAG-RECIPE-1225-f4975571eb9b4c97a16289a06b597067.jpg", popular: false },
    { name: "Tuna Sashimi", price: "₱350", desc: "Fresh tuna, wasabi, soy sauce", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800", popular: false },
    { name: "Shrimp Cocktail", price: "₱380", desc: "Jumbo shrimp, house cocktail sauce", img: "https://images.unsplash.com/photo-1691201659377-978b28daa417?w=800", popular: false },
    { name: "Garlic Bread", price: "₱120", desc: "Toasted sourdough, garlic butter, parsley", img: "https://images.unsplash.com/photo-1556008531-57e6eefc7be4?w=800", popular: false },
    { name: "Crostini Alla Livornese", price: "₱280", desc: "Tomato, olive, caper topping on crostini", img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800", popular: false },
    { name: "Croquette", price: "₱220", desc: "Crispy breaded filling, house sauce", img: "https://images.unsplash.com/photo-1559847844-b0915a3800c6?w=800", popular: false },
  ],
  "Homemade Pasta": [
    { name: "Ravioli Alla Panna", price: "₱380", desc: "Cheese ravioli, cream sauce", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800", popular: false },
    { name: "Ravioli Ragu", price: "₱380", desc: "Cheese ravioli, slow-cooked meat ragu", img: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800", popular: false },
    { name: "Ravioli Pepper Pesto", price: "₱380", desc: "Cheese ravioli, roasted pepper pesto", img: "https://images.unsplash.com/photo-1595231712325-9e23139e1496?w=800", popular: false },
    { name: "Fettuccine Alfredo", price: "₱350", desc: "Fresh fettuccine, parmesan cream sauce", img: "https://images.unsplash.com/photo-1768668053140-f589ed4bef31?w=800", popular: true },
    { name: "Fettuccine Puttanesca", price: "₱350", desc: "Tomato, olive, caper, anchovy sauce", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800", popular: false },
    { name: "Spaghetti Carbonara", price: "₱340", desc: "Egg, pancetta, pecorino, black pepper", img: "https://images.unsplash.com/photo-1755594461640-b800c6bafdfa?w=800", popular: false },
    { name: "Pasta Supreme w/ Salsiccia", price: "₱380", desc: "Mixed pasta, Italian sausage, tomato sauce", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800", popular: false },
    { name: "Spaghetti w/ White Vodka Sauce", price: "₱360", desc: "Creamy vodka sauce, touch of tomato", img: "https://images.unsplash.com/photo-1673442602484-5a1e68299e1b?w=800", popular: false },
    { name: "Vodka Supreme w/ Tenderloin", price: "₱480", desc: "Vodka sauce, USDA tenderloin strips", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800", popular: false },
  ],
  Pasta: [
    { name: "Spaghetti Meat Sauce", price: "₱320", desc: "Classic Bolognese, ground beef", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800", popular: false },
    { name: "Spaghetti Olive Oil & Garlic", price: "₱280", desc: "Aglio olio, chili flakes", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800", popular: false },
    { name: "Spaghetti Marinara w/ Shrimp", price: "₱380", desc: "Tomato sauce, fresh shrimp", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800", popular: false },
    { name: "Lasagna", price: "₱380", desc: "Layered pasta, meat sauce, béchamel, cheese", img: "https://images.unsplash.com/photo-1561841224-9719c8989db2?w=800", popular: true },
    { name: "Amatriciana", price: "₱340", desc: "Tomato, guanciale, pecorino, chili", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800", popular: false },
    { name: "Pandemonio", price: "₱360", desc: "Chef's special pasta creation", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800", popular: false },
  ],
  Pizza: [
    { name: "Giuseppe's Special No. 1", price: "₱380", desc: "House specialty, wood-fired", img: "https://images.unsplash.com/photo-1772494047889-4a7beb5dbad0?w=800", popular: true },
    { name: "Giuseppe's Special No. 2", price: "₱420", desc: "Second house specialty, wood-fired", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", popular: false },
    { name: "Pizza Margherita", price: "₱320", desc: "San Marzano tomato, mozzarella, basil", img: "https://images.unsplash.com/photo-1772494047889-4a7beb5dbad0?w=800", popular: true },
    { name: "4 Cheese Pizza", price: "₱420", desc: "Mozzarella, parmesan, gorgonzola, fontina", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", popular: true },
    { name: "Pizza w/ Salsiccia", price: "₱400", desc: "Italian sausage, tomato sauce, mozzarella", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800", popular: false },
    { name: "Hawaiian Pizza", price: "₱350", desc: "Ham, pineapple, cheese", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800", popular: false },
    { name: "Pizza del Venerdi", price: "₱380", desc: "Friday special, seasonal toppings", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", popular: false },
    { name: "Pizza Marinara", price: "₱300", desc: "Tomato, garlic, oregano, olive oil", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", popular: false },
    { name: "Everything & Prosciutto Pizza", price: "₱450", desc: "Loaded pizza with prosciutto", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", popular: false },
  ],
  Beef: [
    { name: "Tenderloin alla Sorrentino", price: "₱680", desc: "USDA Choice tenderloin, tomato, mozzarella, herbs", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800", popular: true },
    { name: "Saltimbocca alla Romana", price: "₱620", desc: "Veal, prosciutto, sage, white wine", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
    { name: "Ossobuco", price: "₱720", desc: "Braised veal shank, gremolata, risotto", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
    { name: "Tenderloin w/ Marsala", price: "₱650", desc: "Mushroom marsala wine sauce", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800", popular: false },
    { name: "Tenderloin w/ Cream Cognac & Mushroom", price: "₱680", desc: "Cream cognac sauce, sautéed mushrooms", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800", popular: false },
    { name: "Tenderloin w/ Onions, Mushrooms & Wine", price: "₱650", desc: "Red wine reduction, caramelized onions", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800", popular: false },
    { name: "Medaglioni alla Napoletana", price: "₱620", desc: "Veal medallions, tomato, mozzarella", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
    { name: "Roast Beef w/ Brown Gravy", price: "₱580", desc: "Slow-roasted, brown gravy, mashed potato", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
    { name: "Arrosto Misto", price: "₱1,400", desc: "Chicken breast, porkchop, tenderloin, baby back ribs (good for 2-3)", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800", popular: false },
  ],
  Seafood: [
    { name: "Grilled Prawns", price: "₱580", desc: "Jumbo prawns, garlic butter, lemon", img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800", popular: false },
    { name: "Prawns in Garlic Sauce", price: "₱580", desc: "Jumbo prawns, roasted garlic butter", img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800", popular: false },
    { name: "Fried Calamari", price: "₱380", desc: "Crispy calamari, marinara dip", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", popular: false },
    { name: "Lapu-Lapu Francese", price: "₱520", desc: "Fresh grouper, egg batter, lemon butter", img: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800", popular: true },
    { name: "Lapu-Lapu w/ Capers & Wine", price: "₱550", desc: "Fresh grouper, caper, white wine sauce", img: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800", popular: false },
    { name: "Grilled Salmon", price: "₱580", desc: "Fresh salmon, herb crust, seasonal vegetables", img: "https://images.unsplash.com/photo-1762098457195-aa2185a2330e?w=800", popular: true },
    { name: "Shrimps ala Genovese", price: "₱520", desc: "Shrimp, basil pesto, linguine", img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800", popular: false },
    { name: "Seafood Platter", price: "₱880", desc: "Calamari, lapu-lapu, shrimp, sword fish (good for 3-4)", img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800", popular: false },
    { name: "Surf & Turf", price: "₱1,200", desc: "Sword fish, prawns, salsiccia, tenderloin (good for 2)", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
  ],
  Pork: [
    { name: "Grilled Porkchop", price: "₱420", desc: "Monterey pork, herb marinade, grilled", img: "https://images.unsplash.com/photo-1762305193367-91e072e47c3f?w=800", popular: true },
    { name: "Porkchop Milanese", price: "₱450", desc: "Breaded pork chop, arugula, lemon", img: "https://images.unsplash.com/photo-1652378452875-5f80beafc549?w=800", popular: false },
    { name: "Porkchop w/ Mushroom Sauce", price: "₱450", desc: "Cream of mushroom, pan-grilled", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
    { name: "Porkchop w/ Sage & Potatoes", price: "₱480", desc: "Sage butter, roasted potatoes", img: "https://images.unsplash.com/photo-1762305193367-91e072e47c3f?w=800", popular: false },
    { name: "Beef Baby Back Ribs", price: "₱680", desc: "Slow-smoked, BBQ glaze, coleslaw", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", popular: false },
  ],
  Chicken: [
    { name: "Chicken Milanese", price: "₱380", desc: "Breaded chicken breast, mushroom marsala", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800", popular: true },
    { name: "Chicken Parmigiana", price: "₱380", desc: "Breaded chicken, tomato sauce, melted cheese", img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800", popular: false },
    { name: "Grilled Chicken Breast", price: "₱350", desc: "Herb-marinated, grilled, seasonal vegetables", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800", popular: false },
    { name: "Chicken Francese", price: "₱380", desc: "Egg-battered chicken, lemon butter sauce", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800", popular: false },
    { name: "Chicken alla Atlanta", price: "₱400", desc: "Grilled chicken, mushroom cream sauce", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800", popular: false },
  ],
  Sandwiches: [
    { name: "Club House Sandwich", price: "₱280", desc: "Triple-decker, bacon, lettuce, tomato", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", popular: false },
    { name: "Chicken Parmesan Sandwich", price: "₱280", desc: "Breaded chicken, marinara, mozzarella", img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800", popular: false },
    { name: "Tuna Melt", price: "₱260", desc: "Tuna salad, melted cheese, toasted bread", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", popular: false },
    { name: "Roast Beef Sandwich", price: "₱300", desc: "Sliced roast beef, horseradish, aioli", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", popular: false },
    { name: "Salsiccia Sandwich", price: "₱280", desc: "Italian sausage, peppers, onions", img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800", popular: false },
  ],
  Vegetables: [
    { name: "Fresh Lumpia", price: "₱220", desc: "Fresh spring rolls, peanut sauce", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800", popular: false },
    { name: "Eggplant Parmigiana", price: "₱280", desc: "Breaded eggplant, tomato sauce, mozzarella", img: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=800", popular: false },
    { name: "Caesar's Salad", price: "₱250", desc: "Romaine, parmesan, croutons, Caesar dressing", img: "https://images.unsplash.com/photo-1556386734-4227a180d19e?w=800", popular: false },
  ],
  Desserts: [
    { name: "Tiramisu", price: "₱280", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa", img: "https://images.unsplash.com/photo-1755602810510-decd1df5f64e?w=800", popular: true },
    { name: "Zabaglione w/ Ice Cream", price: "₱250", desc: "Marsala wine custard, vanilla gelato", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", popular: false },
    { name: "Blueberry Cheesecake", price: "₱220", desc: "New York style, fresh blueberry compote", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800", popular: false },
    { name: "Peaches & Ice Cream", price: "₱180", desc: "Fresh peaches, vanilla gelato", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", popular: false },
    { name: "Cannoli", price: "₱220", desc: "Crispy shell, sweet ricotta, chocolate chips", img: "https://images.unsplash.com/photo-1771995356608-37d1e34c3bfa?w=800", popular: false },
    { name: "Fried Banana w/ Ice Cream", price: "₱180", desc: "Crispy banana, vanilla gelato, caramel", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", popular: false },
  ],
  Drinks: [
    { name: "House Wine (Red/White)", price: "₱180/glass", desc: "Italian table wine, glass or carafe", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800", popular: false },
    { name: "Espresso", price: "₱120", desc: "Double-shot Italian espresso", img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800", popular: false },
    { name: "Cappuccino", price: "₱150", desc: "Espresso, steamed milk, foam", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800", popular: false },
    { name: "Fresh Lemonade", price: "₱120", desc: "House-made, refreshing", img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", popular: false },
    { name: "Amaretto Digestif", price: "Complimentary", desc: "Complimentary after-meal digestif", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", popular: true },
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
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800",
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
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
