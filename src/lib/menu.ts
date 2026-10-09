import { prisma } from "@/lib/prisma";
import { MENU, type MenuItem } from "@/lib/data";

export async function getMenu(): Promise<Record<string, MenuItem[]>> {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    if (items.length === 0) return MENU;

    const grouped: Record<string, MenuItem[]> = {};
    for (const item of items) {
      (grouped[item.category] ??= []).push({
        name: item.name,
        price: item.price,
        desc: item.description,
        popular: item.popular,
        image: item.image ?? undefined,
      });
    }

    const knownOrder = Object.keys(MENU);
    const ordered: Record<string, MenuItem[]> = {};
    for (const key of knownOrder) {
      if (grouped[key]) ordered[key] = grouped[key];
    }
    for (const key of Object.keys(grouped)) {
      if (!ordered[key]) ordered[key] = grouped[key];
    }
    return ordered;
  } catch {
    return MENU;
  }
}
