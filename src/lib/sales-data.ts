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

function parsePrice(price: string): number {
  return parseInt(price.replace(/[₱,]/g, ""), 10);
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const ORDER_STATUSES: OrderData["status"][] = ["Completed", "Completed", "Completed", "Completed", "In Progress", "Cancelled"];

export function generateSalesData(daysBack: number = 0): SalesData {
  const allItems: { name: string; category: string; price: number; popular: boolean }[] = [];

  for (const [category, items] of Object.entries(MENU)) {
    for (const item of items) {
      allItems.push({
        name: item.name,
        category,
        price: parsePrice(item.price),
        popular: item.popular ?? false,
      });
    }
  }

  const popularItems = allItems.filter((i) => i.popular);
  const totalOrders = rand(30, 80);

  const selectedItems: { name: string; category: string; price: number }[] = [];
  for (let i = 0; i < totalOrders; i++) {
    const usePopular = Math.random() < 0.7;
    const pool = usePopular ? popularItems : allItems;
    const item = pool[rand(0, pool.length - 1)];
    const extras = rand(0, 2);
    selectedItems.push({ name: item.name, category: item.category, price: item.price });
    for (let e = 0; e < extras; e++) {
      const extra = allItems[rand(0, allItems.length - 1)];
      selectedItems.push({ name: extra.name, category: extra.category, price: extra.price });
    }
  }

  const itemCounts: Record<string, { name: string; category: string; price: number; count: number; revenue: number }> = {};
  for (const item of selectedItems) {
    if (!itemCounts[item.name]) {
      itemCounts[item.name] = { ...item, count: 0, revenue: 0 };
    }
    itemCounts[item.name].count++;
    itemCounts[item.name].revenue += item.price;
  }

  const topItems = Object.values(itemCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const totalRevenue = topItems.reduce((sum, i) => sum + i.revenue, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  const hours = [
    "11AM", "12PM", "1PM", "2PM", "3PM", "5PM", "6PM", "7PM", "8PM", "9PM",
  ];
  const peakWeights = [30, 75, 80, 45, 30, 55, 85, 90, 70, 40];
  const hourlyData: HourlyData[] = hours.map((hour, idx) => {
    const weight = peakWeights[idx];
    const orderCount = Math.round((totalOrders * weight) / peakWeights.reduce((a, b) => a + b, 0));
    const hourRevenue = Math.round((totalRevenue * weight) / peakWeights.reduce((a, b) => a + b, 0));
    return { hour, orders: orderCount, revenue: hourRevenue };
  });

  const catCounts: Record<string, { count: number; revenue: number }> = {};
  for (const item of selectedItems) {
    if (!catCounts[item.category]) catCounts[item.category] = { count: 0, revenue: 0 };
    catCounts[item.category].count++;
    catCounts[item.category].revenue += item.price;
  }
  const categoryData: CategoryData[] = Object.entries(catCounts)
    .map(([name, data]) => ({ name, ...data, percentage: Math.round((data.revenue / totalRevenue) * 100) }))
    .sort((a, b) => b.revenue - a.revenue);

  const orderTimes = ["11:15 AM", "11:42 AM", "12:05 PM", "12:22 PM", "12:38 PM", "12:55 PM", "1:10 PM", "1:35 PM", "2:00 PM", "2:25 PM", "5:10 PM", "5:45 PM", "6:05 PM", "6:28 PM", "6:50 PM", "7:12 PM", "7:35 PM", "8:00 PM", "8:22 PM", "8:50 PM"];
  const recentOrders: OrderData[] = [];
  for (let i = 0; i < Math.min(15, totalOrders); i++) {
    const itemCount = rand(1, 4);
    const orderItems = pickRandom(Object.keys(itemCounts), itemCount);
    const orderTotal = orderItems.reduce((sum, name) => sum + (itemCounts[name]?.price ?? 300), 0);
    recentOrders.push({
      id: `#${String(1000 + i + daysBack * 1000).slice(1)}`,
      time: orderTimes[i % orderTimes.length],
      items: orderItems,
      total: orderTotal,
      status: ORDER_STATUSES[rand(0, ORDER_STATUSES.length - 1)],
    });
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayWeights = [60, 65, 70, 75, 95, 100, 80];
  const revenueByDay = days.map((day, idx) => {
    const w = dayWeights[idx];
    const dayRevenue = Math.round((totalRevenue * w) / 75 + rand(-2000, 2000));
    const dayOrders = Math.round((totalOrders * w) / 75 + rand(-5, 5));
    return { day, revenue: Math.max(10000, dayRevenue), orders: Math.max(20, dayOrders) };
  });

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    topItem: topItems[0],
    topItems,
    hourlyData,
    categoryData,
    recentOrders,
    revenueByDay,
  };
}

export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}
