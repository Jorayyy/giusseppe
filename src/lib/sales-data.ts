import { MENU } from "./data";

export type SalesItem = {
  name: string;
  category: string;
  price: number;
  count: number;
  revenue: number;
};

export type HourlyData = {
  hour: string;
  orders: number;
  revenue: number;
};

export type CategoryData = {
  name: string;
  count: number;
  revenue: number;
  percentage: number;
};

export type OrderData = {
  id: string;
  time: string;
  items: string[];
  total: number;
  status: "Completed" | "In Progress" | "Cancelled";
};

export type SalesData = {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topItem: SalesItem;
  topItems: SalesItem[];
  hourlyData: HourlyData[];
  categoryData: CategoryData[];
  recentOrders: OrderData[];
  revenueByDay: { day: string; revenue: number; orders: number }[];
};

export type SalesRecord = {
  id: string;
  date: string;
  total: number;
  orders: number;
  items: unknown;
};

export const EMPTY_SALES: SalesData = {
  totalRevenue: 0,
  totalOrders: 0,
  avgOrderValue: 0,
  topItem: { name: "—", category: "", price: 0, count: 0, revenue: 0 },
  topItems: [],
  hourlyData: [],
  categoryData: [],
  recentOrders: [],
  revenueByDay: [],
};

const CATEGORY_BY_NAME: Record<string, string> = {};
for (const [category, items] of Object.entries(MENU)) {
  for (const item of items) CATEGORY_BY_NAME[item.name] = category;
}

const HOUR_BUCKETS = ["11AM", "12PM", "1PM", "2PM", "3PM", "5PM", "6PM", "7PM", "8PM", "9PM"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type LineItem = { name?: string; quantity?: number; price?: number };

export function buildSalesData(records: SalesRecord[]): SalesData {
  if (records.length === 0) return EMPTY_SALES;

  const itemAgg: Record<string, SalesItem> = {};
  const catAgg: Record<string, { count: number; revenue: number }> = {};
  const hourly: Record<string, HourlyData> = {};
  for (const h of HOUR_BUCKETS) hourly[h] = { hour: h, orders: 0, revenue: 0 };
  const byDay: Record<string, { revenue: number; orders: number }> = {};
  for (const d of DAYS) byDay[d] = { revenue: 0, orders: 0 };

  let totalRevenue = 0;
  let totalOrders = 0;

  for (const rec of records) {
    totalRevenue += rec.total;
    totalOrders += rec.orders;

    const date = new Date(rec.date);
    const dayIdx = (date.getDay() + 6) % 7;
    const day = DAYS[dayIdx];
    byDay[day].revenue += rec.total;
    byDay[day].orders += rec.orders;

    const h = date.getHours();
    const bucket =
      h === 11 ? "11AM" : h === 12 ? "12PM" : h >= 13 && h <= 15 ? `${h - 12}PM` : h >= 17 && h <= 21 ? `${h - 12}PM` : null;
    if (bucket && hourly[bucket]) {
      hourly[bucket].orders += rec.orders;
      hourly[bucket].revenue += rec.total;
    }

    const lines: LineItem[] = Array.isArray(rec.items) ? (rec.items as LineItem[]) : [];
    for (const line of lines) {
      if (!line?.name) continue;
      const qty = line.quantity ?? 1;
      const price = line.price ?? 0;
      const category = CATEGORY_BY_NAME[line.name] ?? "Other";
      if (!itemAgg[line.name]) {
        itemAgg[line.name] = { name: line.name, category, price, count: 0, revenue: 0 };
      }
      itemAgg[line.name].count += qty;
      itemAgg[line.name].revenue += price * qty;
      if (!catAgg[category]) catAgg[category] = { count: 0, revenue: 0 };
      catAgg[category].count += qty;
      catAgg[category].revenue += price * qty;
    }
  }

  const topItems = Object.values(itemAgg).sort((a, b) => b.count - a.count).slice(0, 10);
  const categoryData = Object.entries(catAgg)
    .map(([name, d]) => ({
      name,
      ...d,
      percentage: totalRevenue > 0 ? Math.round((d.revenue / totalRevenue) * 100) : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
    topItem: topItems[0] ?? EMPTY_SALES.topItem,
    topItems,
    hourlyData: HOUR_BUCKETS.map((h) => hourly[h]),
    categoryData,
    recentOrders: [],
    revenueByDay: DAYS.map((day) => ({ day, ...byDay[day] })),
  };
}

export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}
