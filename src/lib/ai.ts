import { MENU } from "@/lib/data";

const ALLERGIES: Record<string, string[]> = {
  gluten: ["Focaccia", "Bruschetta al Pomodoro", "Spaghetti Puttanesca", "Lasagna", "Ravioli", "Spaghetti al Salsiccia", "Cacio e Pepe", "Chicken Milanese"],
  dairy: ["Margherita", "Quattro Formaggi", "Lasagna", "Ravioli", "Risotto ai Funghi", "Cacio e Pepe", "Panna Cotta", "Tiramisu"],
  seafood: ["Calamari Fritti", "Baked Scallops", "Spaghetti Puttanesca", "Grilled Salmon"],
  nuts: [],
  vegetarian: ["Focaccia", "Bruschetta al Pomodoro", "Margherita", "Quattro Formaggi", "Capricciosa", "Ravioli", "Risotto ai Funghi", "Cacio e Pepe", "Melanzane alla Parmigiana", "Tiramisu", "Panna Cotta"],
};

const WINE_PAIRINGS: Record<string, string> = {
  "Margherita": "A light Chianti or Pinot Grigio pairs beautifully — the acidity cuts through the mozzarella.",
  "Prosciutto e Rucola": "Prosecco or a crisp Vermentino. The bubbles complement the salty prosciutto.",
  "Quattro Formaggi": "A bold Barolo or Amarone — you need tannins to stand up to four cheeses.",
  "Capricciosa": "Montepulciano d'Abruzzo — its earthiness matches the mushrooms and artichokes.",
  "Spaghetti Puttanesca": "A dry rosé or Nero d'Avola. The Mediterranean flavors love each other.",
  "Lasagna": "Chianti Classico or Sangiovese. The tomato ragù demands a Tuscan red.",
  "Ravioli": "A buttery Chardonnay or white Burgundy — matches the sage butter perfectly.",
  "Risotto ai Funghi": "Barbaresco or Nebbiolo. Earthy wine for earthy mushrooms.",
  "Cacio e Pepe": "Frascati or a light Lazio white. Keep it simple, keep it Roman.",
  "Grilled Pork Chop": "Ammontillado sherry or Primitivo — bold enough for the garlic mashed.",
  "Chicken Milanese": "Pinot Grigio or Soave. Clean and crisp against the crispy breading.",
  "Grilled Salmon": "Santa Margherita Pinot Grigio or a dry Riesling. Classic pairing.",
  "Ribeye Steak": "Brunello di Montalcino or Super Tuscan. This is a celebration wine moment.",
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
  "Focaccia": "The focaccia dough rises overnight, just like Giuseppe's father taught him in Genoa. He insists on hand-stretching every piece — \"机器 don't know dough,\" he says.",
  "Margherita": "Named after Queen Margherita of Italy in 1889. Giuseppe uses San Marzano tomatoes from Campania — the only tomato he'll accept.",
  "Ravioli": "Made fresh every morning. The ricotta-spinach filling is Giuseppe's mother's recipe, brought from Puglia when he first came to the Philippines.",
  "Cacio e Pepe": "The simplest Roman pasta, but the hardest to master. Giuseppe spent three years perfecting the technique — \"It's about patience, not ingredients.\"",
  "Lasagna": "Layers of handmade pasta, slow-cooked ragù, and béchamel. The ragù simmers for 6 hours — \"You can't rush love,\" Giuseppe says.",
  "Wine": "Giuseppe selects every wine himself. He visits Italy twice a year just to taste at vineyards. \"A good wine tells a story,\" he says. \"I only tell the best ones.\"",
  "restaurant": "Giuseppe opened in 2019 with his Tacloban-born wife. The name is his, the recipes are nonna's. Every dish carries a piece of Italy to the Philippines.",
};

function findBestMatch(input: string, items: string[]): string | null {
  const lower = input.toLowerCase();
  for (const item of items) {
    if (lower.includes(item.toLowerCase())) return item;
  }
  return null;
}

function getAllergyInfo(input: string): string {
  const lower = input.toLowerCase();
  const allergens = Object.keys(ALLERGIES).filter((a) => lower.includes(a));
  if (allergens.length === 0) {
    return "I can check for gluten, dairy, seafood, nuts, and vegetarian options. What allergen are you concerned about?";
  }
  const results: string[] = [];
  for (const allergen of allergens) {
    const items = ALLERGIES[allergen];
    if (items.length === 0) {
      results.push(`Great news — none of our current dishes contain **${allergen}**!`);
    } else {
      results.push(`**${allergen.charAt(0).toUpperCase() + allergen.slice(1)} alert:** Our ${items.slice(0, 4).join(", ")}${items.length > 4 ? ", and more" : ""} contain ${allergen}. I'd recommend the Antipasto Platter or Grilled Salmon instead!`);
    }
  }
  return results.join("\n\n");
}

function getWinePairing(input: string): string {
  const match = findBestMatch(input, Object.keys(WINE_PAIRINGS));
  if (match) {
    return `🍷 **${match}**\n\n${WINE_PAIRINGS[match]}`;
  }
  return "I'd love to help with wine pairings! Tell me what dish you're ordering, or ask about a specific wine. Our house wines (red and white) are ₱280 per glass — a great everyday choice.";
}

function getStory(input: string): string {
  const match = findBestMatch(input, Object.keys(STORIES));
  if (match) {
    return `📖 **The story of ${match}**\n\n${STORIES[match]}`;
  }
  return "Every dish at Giuseppe's has a story. Ask me about the tiramisu, focaccia, margherita, ravioli, cacio e pepe, lasagna, or our wine selection!";
}

function getMenuRecommendation(): string {
  const popular = Object.values(MENU)
    .flat()
    .filter((item) => item.popular);
  const picks = popular.sort(() => Math.random() - 0.5).slice(0, 3);
  return `🌟 **Giuseppe's top picks right now:**\n\n${picks.map((p) => `• **${p.name}** — ${p.desc} (${p.price})`).join("\n")}\n\nCome try them tonight!`;
}

export function getAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.match(/\b(hi|hello|hey|good\s*(morning|afternoon|evening)|kumusta)/)) {
    return "Buongiorno! 🇮🇹 I'm Giuseppe's AI sommelier. Ask me about wine pairings, allergy info, menu stories, or what to order tonight!";
  }

  if (lower.match(/\b(allerg|gluten|dairy|lactose|seafood|nut|vegetarian|vegan|diet)/)) {
    return getAllergyInfo(lower);
  }

  if (lower.match(/\b(wine|pairing|pair|drink|red\s*wine|white\s*wine|prosecco|chianti|barolo)/)) {
    return getWinePairing(lower);
  }

  if (lower.match(/\b(story|stories|history|about|origin|nonna|recipe|tradition|how\s*(did|was))/)) {
    return getStory(lower);
  }

  if (lower.match(/\b(recommend|suggest|what\s*should|best|popular|top|try|order|pick)/)) {
    return getMenuRecommendation();
  }

  if (lower.match(/\b(menu|price|how\s*much|cost)/)) {
    const categories = Object.keys(MENU);
    return `📋 **Our menu:**\n\n${categories.map((c) => `• **${c}** — ${MENU[c].length} dishes`).join("\n")}\n\nAsk me about any dish for details, prices, or pairing suggestions!`;
  }

  if (lower.match(/\b(hours|open|close|when|time)/)) {
    return "🕐 We're open daily:\n\n• Mon–Thu: 11AM–4PM, 5PM–9:30PM\n• Fri–Sat: 11AM–4PM, 5:30PM–10:30PM\n• Sunday: 11AM–4PM, 5PM–9:30PM\n\nWe're busiest on Friday and Saturday nights — reservations recommended!";
  }

  if (lower.match(/\b(reserve|reservation|book|table)/)) {
    return "📞 To reserve a table, call us at **0931 970 4073** or use the Book a Table section on our website. Friday and Saturday nights fill up fast — book early!";
  }

  if (lower.match(/\b(thank|salamat|grazie)/)) {
    return "Prego! 😊 Hope to see you at Giuseppe's soon. Buon appetito!";
  }

  if (lower.match(/\b(who|what|where|giuseppe)/)) {
    return "Giuseppe's is an authentic Italian-Filipino restaurant at **173 Avenida Veteranos, Tacloban City**. Open since 2019, founded by Giuseppe and his Tacloban-born wife. Rated 4.4★ with 328 reviews. We're known for wood-fired pizza, handmade pasta, and great cocktails. Dogs welcome outside! 🐕";
  }

  const menuMatch = findBestMatch(lower, Object.values(MENU).flat().map((m) => m.name));
  if (menuMatch) {
    const item = Object.values(MENU).flat().find((m) => m.name === menuMatch);
    if (item) {
      let response = `🍽️ **${item.name}** — ${item.price}\n\n${item.desc}`;
      if (WINE_PAIRINGS[menuMatch]) response += `\n\n🍷 **Wine pairing:** ${WINE_PAIRINGS[menuMatch]}`;
      if (STORIES[menuMatch]) response += `\n\n📖 **Story:** ${STORIES[menuMatch]}`;
      if (item.popular) response += "\n\n⭐ **Popular choice!**";
      return response;
    }
  }

  return "I can help with:\n\n• 🍷 **Wine pairings** — ask \"What wine goes with lasagna?\"\n• ⚠️ **Allergies** — ask \"Is there gluten in the menu?\"\n• 📖 **Stories** — ask \"Tell me about the tiramisu\"\n• 🌟 **Recommendations** — ask \"What should I order?\"\n• 📋 **Menu info** — ask about any dish\n• 🕐 **Hours & reservations**\n\nBuon appetito! 🇮🇹";
}
