import { prisma } from "@/lib/prisma";
import { RESTAURANT, HOURS, HOURS_ORDER } from "@/lib/data";

type Hours = typeof HOURS;

export type Restaurant = {
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  address: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  googleReviewUrl: string;
  qrImg: string;
};

export async function getRestaurant(): Promise<Restaurant> {
  try {
    const rows = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    for (const r of rows) s[r.key] = r.value;
    const phone = s.phone || RESTAURANT.phone;
    return {
      ...RESTAURANT,
      name: s.name || RESTAURANT.name,
      tagline: s.tagline || RESTAURANT.tagline,
      priceRange: s.priceRange || RESTAURANT.priceRange,
      address: s.address || RESTAURANT.address,
      phone,
      phoneHref: `tel:${phone.replace(/[^0-9+]/g, "")}`,
      mapsUrl: s.mapsUrl || RESTAURANT.mapsUrl,
      googleReviewUrl: s.googleReviewUrl || RESTAURANT.googleReviewUrl,
    };
  } catch {
    return RESTAURANT;
  }
}

export async function getHours(): Promise<Hours> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: "hours" } });
    if (!row) return HOURS;
    const parsed = JSON.parse(row.value) as Hours;
    for (const day of HOURS_ORDER) {
      if (!parsed[day] || typeof parsed[day] !== "object") return HOURS;
    }
    return parsed;
  } catch {
    return HOURS;
  }
}
