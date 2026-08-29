import { MENU } from "@/lib/data";

const ALLERGIES: Record<string, string[]> = {
  gluten: ["Focaccia", "Bruschetta al Pomodoro", "Spaghetti Puttanesca", "Lasagna", "Ravioli", "Spaghetti al Salsiccia", "Cacio e Pepe", "Chicken Milanese"],
  dairy: ["Margherita", "Quattro Formaggi", "Lasagna", "Ravioli", "Risotto ai Funghi", "Cacio e Pepe", "Panna Cotta", "Tiramisu"],
  seafood: ["Calamari Fritti", "Baked Scallops", "Spaghetti Puttanesca", "Grilled Salmon"],
  nuts: [],
  vegetarian: ["Focaccia", "Bruschetta al Pomodoro", "Margherita", "Quattro Formaggi", "Capricciosa", "Ravioli", "Risotto ai Funghi", "Cacio e Pepe", "Melanzane alla Parmigiana", "Tiramisu", "Panna Cotta"],
};

const WINE_PAIRINGS: Record<string, string> = {
  "Margherita": "A light Chianti or Pinot Grigio — the acidity cuts through the mozzarella.",
  "Prosciutto e Rucola": "Prosecco or a crisp Vermentino. Bubbles complement salty prosciutto.",
  "Quattro Formaggi": "A bold Barolo or Amarone — tannins stand up to four cheeses.",
  "Capricciosa": "Montepulciano d'Abruzzo — earthiness matches mushrooms and artichokes.",
  "Spaghetti Puttanesca": "A dry rosé or Nero d'Avola. Mediterranean flavors love each other.",
  "Lasagna": "Chianti Classico or Sangiovese. Tomato ragù demands a Tuscan red.",
  "Ravioli": "A buttery Chardonnay or white Burgundy — matches the sage butter.",
  "Risotto ai Funghi": "Barbaresco or Nebbiolo. Earthy wine for earthy mushrooms.",
  "Cacio e Pepe": "Frascati or a light Lazio white. Keep it simple, keep it Roman.",
  "Grilled Pork Chop": "Ammontillado sherry or Primitivo — bold for the garlic mashed.",
  "Chicken Milanese": "Pinot Grigio or Soave. Clean and crisp against the crispy breading.",
  "Grilled Salmon": "Santa Margherita Pinot Grigio or a dry Riesling. Classic pairing.",
  "Ribeye Steak": "Brunello di Montalcino or Super Tuscan. A celebration wine moment.",
  "Pork Ribs": "Montepulciano or a fruit-forward Primitivo. BBQ meets Italian sun.",
  "Calamari Fritti": "Prosecco or Verdicchio. Bubbles and fried seafood are best friends.",
  "Baked Scallops": "Falanghina or Fiano — southern Italian whites with mineral depth.",
  "Antipasto Platter": "Lambrusco or a light Valpolicella. Fun, versatile, crowd-pleaser.",
  "Tiramisu": "Vin Santo or Moscato d'Asti. Sweet wine, sweet ending.",
  "Panna Cotta": "Brachetto d'Acqui — a light, sweet red that whispers, not shouts.",
  "Melanzane alla Parmigiana": "Côtes du Rhône or Primitivo. Hearty wine for a hearty dish.",
};

const STORIES: Record<string, string> = {
  "Tiramisu": "Giuseppe's tiramisu follows his nonna's recipe from Treviso — the same one she made every Sunday. He once said, \"If the coffee isn't strong enough to wake the dead, it's not strong enough for tiramisu.\"",
  "Focaccia": "The focaccia dough rises overnight, just like Giuseppe's father taught him in Genoa. He insists on hand-stretching every piece — \"Machines don't know dough,\" he says.",
  "Margherita": "Named after Queen Margherita of Italy in 1889. Giuseppe uses San Marzano tomatoes from Campania — the only tomato he'll accept.",
  "Ravioli": "Made fresh every morning. The ricotta-spinach filling is Giuseppe's mother's recipe, brought from Puglia when he first came to the Philippines.",
  "Cacio e Pepe": "The simplest Roman pasta, but the hardest to master. Giuseppe spent three years perfecting the technique — \"It's about patience, not ingredients.\"",
  "Lasagna": "Layers of handmade pasta, slow-cooked ragù, and béchamel. The ragù simmers for 6 hours — \"You can't rush love,\" Giuseppe says.",
  "Wine": "Giuseppe selects every wine himself. He visits Italy twice a year just to taste at vineyards. \"A good wine tells a story,\" he says.",
  "restaurant": "Giuseppe opened in 2019 with his Tacloban-born wife. The name is his, the recipes are nonna's.",
};

const ALL_MENU_ITEMS = Object.values(MENU).flat();
const ALL_MENU_NAMES = ALL_MENU_ITEMS.map((m) => m.name);

function findBestMatch(input: string, items: string[]): string | null {
  const lower = input.toLowerCase();
  for (const item of items) {
    if (lower.includes(item.toLowerCase())) return item;
  }
  const words = lower.split(/\s+/);
  for (const word of words) {
    if (word.length < 3) continue;
    for (const item of items) {
      if (item.toLowerCase().includes(word) || word.includes(item.toLowerCase().slice(0, 4))) {
        return item;
      }
    }
  }
  return null;
}

function getAllergyInfo(input: string): string {
  const lower = input.toLowerCase();
  const allergens = Object.keys(ALLERGIES).filter((a) => lower.includes(a));
  if (allergens.length === 0) {
    return "I can check for gluten, dairy, seafood, nuts, and vegetarian options. What allergen are you concerned about?";
  }
  return allergens.map((allergen) => {
    const items = ALLERGIES[allergen];
    if (items.length === 0) {
      return `✅ Great news — none of our current dishes contain **${allergen}**!`;
    }
    return `⚠️ **${allergen.charAt(0).toUpperCase() + allergen.slice(1)}:** Found in ${items.slice(0, 3).join(", ")}${items.length > 3 ? ", and more" : ""}. Try our Antipasto Platter or Grilled Salmon instead!`;
  }).join("\n\n");
}

function getWinePairing(input: string): string {
  const match = findBestMatch(input, Object.keys(WINE_PAIRINGS));
  if (match) return `🍷 **${match}**\n\n${WINE_PAIRINGS[match]}`;
  return "I'd love to help with wine pairings! Tell me what dish you're ordering. Our house wines (red & white) are ₱280 per glass — a great everyday choice.";
}

function getStory(input: string): string {
  const match = findBestMatch(input, Object.keys(STORIES));
  if (match) return `📖 **The story of ${match}**\n\n${STORIES[match]}`;
  return "Every dish at Giuseppe's has a story. Ask me about the tiramisu, focaccia, margherita, ravioli, cacio e pepe, or lasagna!";
}

function getMenuRecommendation(): string {
  const popular = ALL_MENU_ITEMS.filter((item) => item.popular);
  const picks = popular.sort(() => Math.random() - 0.5).slice(0, 3);
  return `🌟 **Giuseppe's top picks:**\n\n${picks.map((p) => `• **${p.name}** — ${p.desc} (${p.price})`).join("\n")}\n\nCome try them tonight!`;
}

function fuzzyMatch(input: string): string | null {
  const lower = input.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const words = lower.split(/\s+/).filter((w) => w.length > 2);
  for (const word of words) {
    for (const item of ALL_MENU_ITEMS) {
      const itemName = item.name.toLowerCase();
      if (itemName.includes(word) || word.includes(itemName.slice(0, 4))) {
        return item.name;
      }
    }
  }
  return null;
}

export function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  if (lower.match(/^(hi|hello|hey|yo|sup|kumusta|good\s*(morning|afternoon|evening)|kamusta|musta)[\s!?.]*$/)) {
    return "Buongiorno! 🇮🇹 I'm Giuseppe's AI sommelier. What would you like to know?\n\n• 🍷 Wine pairings\n• ⚠️ Allergy info\n• 📖 Menu stories\n• 🌟 What to order\n• 📍 Location & hours";
  }

  if (lower.match(/\b(deliver|grab|foodpanda|takeout|take\s*away|pickup|to\s*go)/)) {
    return "We don't currently offer delivery through apps, but you can call us at **0931 970 4073** for takeout orders. Pick up fresh-from-the-oven pizza! 🍕";
  }

  if (lower.match(/\b(price|magkano|how\s*much|mahal|mura|budget|piso)/)) {
    return "💰 **Our price range:** ₱500–2,000 per person\n\n• Antipasti: ₱180–680\n• Pizza: ₱420–520\n• Pasta: ⱱ420–580\n• Mains: ₱420–980\n• Desserts: ⱱ280–320\n• Drinks: ⱱ120–380\n\nGreat value for authentic Italian! 🇮🇹";
  }

  if (lower.match(/\b(where|location|address|map|punta|ano.*address|saan)/)) {
    return "📍 **173 Avenida Veteranos, Tacloban City, 6500 Leyte**\n\nWe're near the city center. Search \"Giuseppe's Tacloban\" on Google Maps for directions. See you soon! 🚗";
  }

  if (lower.match(/\b(hours|open|close|orass|when|time|bukas|sarado)/)) {
    return "🕐 **Hours:**\n\n• Mon–Thu: 11AM–4PM, 5PM–9:30PM\n• Fri–Sat: 11AM–4PM, 5:30PM–10:30PM\n• Sunday: 11AM–4PM, 5PM–9:30PM\n\nFriday & Saturday nights are busiest — reserve early!";
  }

  if (lower.match(/\b(reserve|reservation|book|table|reservehan|upuan)/)) {
    return "📞 To reserve a table, call **0931 970 4073** or use the Book a Table section on our website. Friday & Saturday fill up fast!";
  }

  if (lower.match(/\b(dog|pet|doggo|aso|pusa|cat)/)) {
    return "🐕 Dogs are welcome on our terrace! We love our furry guests. Inside seating is for humans only, but the outdoor area is perfect for your pup.";
  }

  if (lower.match(/\b(parking|park|sasakyan|car)/)) {
    return "🅿️ Street parking is available along Avenida Veteranos. On busy nights, there's usually space nearby. We're also walkable from the city center.";
  }

  if (lower.match(/\b(allerg|gluten|dairy|lactose|seafood|nut|vegetarian|vegan|diet|bawal)/)) {
    return getAllergyInfo(lower);
  }

  if (lower.match(/\b(wine|pairing|pair|drink|red\s*wine|white\s*wine|prosecco|chianti|barolo|alak)/)) {
    return getWinePairing(lower);
  }

  if (lower.match(/\b(story|stories|history|origin|nonna|recipe|tradition|kwento|paano)/)) {
    return getStory(lower);
  }

  if (lower.match(/\b(recommend|suggest|what\s*should|best|popular|top|try|order|pick|ano\s*masarap|ano\s*best)/)) {
    return getMenuRecommendation();
  }

  if (lower.match(/\b(ingredient|what.*in|what.*made|what.*contain|recipe|rekado)/)) {
    const itemMatch = findBestMatch(lower, ALL_MENU_NAMES);
    if (itemMatch) {
      const item = ALL_MENU_ITEMS.find((m) => m.name === itemMatch);
      if (item) {
        let response = `🍽️ **${item.name}** — ${item.price}\n\n${item.desc}`;
        if (STORIES[itemMatch]) response += `\n\n📖 **Story:** ${STORIES[itemMatch]}`;
        return response;
      }
    }
    return "I can tell you about any dish! Which one are you curious about?";
  }

  if (lower.match(/\b(menu|food|eat|kanin|pizza|pasta)/)) {
    const itemMatch = findBestMatch(lower, ALL_MENU_NAMES);
    if (itemMatch) {
      const item = ALL_MENU_ITEMS.find((m) => m.name === itemMatch);
      if (item) {
        let response = `🍽️ **${item.name}** — ${item.price}\n\n${item.desc}`;
        if (WINE_PAIRINGS[itemMatch]) response += `\n\n🍷 **Wine pairing:** ${WINE_PAIRINGS[itemMatch]}`;
        if (STORIES[itemMatch]) response += `\n\n📖 **Story:** ${STORIES[itemMatch]}`;
        if (item.popular) response += "\n\n⭐ **Popular choice!**";
        return response;
      }
    }
  }

  if (lower.match(/\b(thank|salamat|grazie|ty|thanks)/)) {
    return "Prego! 😊 Hope to see you at Giuseppe's soon. Buon appetito!";
  }

  if (lower.match(/\b(who|what|where|giuseppe|about|about\s*you)/)) {
    return "Giuseppe's is an authentic Italian-Filipino restaurant at **173 Avenida Veteranos, Tacloban City**. Open since 2019, rated 4.4★. Wood-fired pizza, handmade pasta, great cocktails. Dogs welcome! 🐕";
  }

  if (lower.match(/\b(hello|hi|hey|kumusta|kamusta)/)) {
    return "Buongiorno! 🇮🇹 What would you like to know about Giuseppe's?";
  }

  const fuzzyItem = fuzzyMatch(lower);
  if (fuzzyItem) {
    const item = ALL_MENU_ITEMS.find((m) => m.name === fuzzyItem);
    if (item) {
      let response = `🍽️ **${item.name}** — ${item.price}\n\n${item.desc}`;
      if (WINE_PAIRINGS[fuzzyItem]) response += `\n\n🍷 **Wine pairing:** ${WINE_PAIRINGS[fuzzyItem]}`;
      if (item.popular) response += "\n\n⭐ **Popular choice!**";
      return response;
    }
  }

  if (lower.length < 5) {
    return "Hmm, I didn't quite catch that. Could you rephrase? I can help with menu items, wine pairings, allergies, hours, or reservations.";
  }

  const suggestions = ALL_MENU_ITEMS
    .filter((item) => {
      const words = lower.split(/\s+/);
      return words.some((w) => item.name.toLowerCase().includes(w) || item.desc.toLowerCase().includes(w));
    })
    .slice(0, 2);

  if (suggestions.length > 0) {
    return `Did you mean one of these?\n\n${suggestions.map((s) => `• **${s.name}** — ${s.desc} (${s.price})`).join("\n")}\n\nAsk me about any dish for details!`;
  }

  return "I'm not sure about that, but I can help with:\n\n• 🍷 **Wine** — \"What wine goes with lasagna?\"\n• ⚠️ **Allergies** — \"Is there gluten?\"\n• 📖 **Stories** — \"Tell me about the tiramisu\"\n• 🌟 **Recommendations** — \"What should I order?\"\n• 💰 **Prices** — \"How much is the pizza?\"\n• 📍 **Location** — \"Where are you?\"\n• 🕐 **Hours** — \"When are you open?\"\n\nBuon appetito! 🇮🇹";
}
