"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  DollarSign,
  ShoppingBag,
  Crown,
  RefreshCw,
  Download,
  Clock,
  Calendar,
} from "lucide-react";
import { buildSalesData, formatPeso, type SalesData, type SalesRecord } from "@/lib/sales-data";

type DateRange = "today" | "week" | "month";

const DATE_LABELS: Record<DateRange, string> = {
  today: "Today",
  week: "This Week",
  month: "This Month",
};

function rangeDates(range: DateRange): { from: string; to: string } {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (range === "week") start.setDate(start.getDate() - 6);
  if (range === "month") start.setDate(start.getDate() - 29);
  return { from: start.toISOString(), to: end.toISOString() };
}

const pct = (value: number, max: number) => (max > 0 ? (value / max) * 100 : 0);

export default function AdminSalesPage() {
  const [data, setData] = useState<SalesData | null>(null);
  const [range, setRange] = useState<DateRange>("today");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { from, to } = rangeDates(range);
        const res = await fetch(`/api/sales?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        if (!cancelled) setData(buildSalesData((json.data ?? []) as SalesRecord[]));
      } catch {
        if (!cancelled) setData(buildSalesData([]));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [range, tick]);

  const exportCSV = () => {
    if (!data) return;
    const rows = [
      "Metric,Value",
      `Total Revenue,${data.totalRevenue}`,
      `Total Orders,${data.totalOrders}`,
      `Avg Order Value,${data.avgOrderValue}`,
      "",
      "Top Items,Count,Revenue",
      ...data.topItems.map((i) => `${i.name},${i.count},${i.revenue}`),
      "",
      "Category,Count,Revenue,Percentage",
      ...data.categoryData.map((c) => `${c.name},${c.count},${c.revenue},${c.percentage}%`),
      "",
      "Hour,Orders,Revenue",
      ...data.hourlyData.map((h) => `${h.hour},${h.orders},${h.revenue}`),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `giuseppes-sales-${range}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const hasData = data.totalOrders > 0;
  const maxHourlyOrders = Math.max(...data.hourlyData.map((h) => h.orders));
  const maxTopRevenue = Math.max(...data.topItems.slice(0, 5).map((i) => i.revenue));
  const maxCatRevenue = Math.max(...data.categoryData.map((c) => c.revenue));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Sales Dashboard</h1>
          <p className="mt-1 text-stone-500">Track revenue, orders, and performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTick((t) => t + 1)}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Date Range */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(DATE_LABELS) as DateRange[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              range === r
                ? "bg-primary text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            <Calendar className="h-4 w-4" />
            {DATE_LABELS[r]}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{formatPeso(data.totalRevenue)}</p>
          <p className="text-sm text-stone-500">Total Revenue</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{data.totalOrders.toLocaleString()}</p>
          <p className="text-sm text-stone-500">Total Orders</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100">
              <BarChart3 className="h-5 w-5 text-stone-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{formatPeso(data.avgOrderValue)}</p>
          <p className="text-sm text-stone-500">Avg Order Value</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/25">
              <Crown className="h-5 w-5 text-stone-800" />
            </div>
          </div>
          <p className="mt-3 text-lg font-bold text-stone-900 truncate">{data.topItem.name}</p>
          <p className="text-sm text-stone-500">Top Item — {data.topItem.count} sold</p>
        </div>
      </div>

      {!hasData && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="font-medium text-stone-900">No sales recorded yet</p>
          <p className="mt-1 text-sm text-stone-500">
            Sales records saved through the API will appear here. Try another date range, or add today&apos;s numbers.
          </p>
        </div>
      )}

      {hasData && (
        <>
          {/* Revenue Trend + Top 5 Items */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">Revenue Trend</h3>
              <p className="text-xs text-stone-500 mb-4">
                {range === "today" ? "Today's" : range === "week" ? "This week's" : "This month's"} daily breakdown
              </p>
              <div className="flex items-end gap-2 h-52">
                {data.revenueByDay.map((day) => {
                  const maxRev = Math.max(...data.revenueByDay.map((d) => d.revenue));
                  const height = pct(day.revenue, maxRev);
                  const isMax = maxRev > 0 && day.revenue === maxRev;
                  return (
                    <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-[10px] font-medium text-stone-500">{formatPeso(day.revenue)}</span>
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          isMax ? "bg-accent" : "bg-accent/40"
                        }`}
                        style={{ height: `${height}%`, minHeight: day.revenue > 0 ? "8px" : "2px" }}
                      />
                      <span className="text-xs font-medium text-stone-600">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Top 5 Items</h3>
              <div className="space-y-4">
                {data.topItems.slice(0, 5).map((item, idx) => {
                  const width = pct(item.revenue, maxTopRevenue);
                  return (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                              idx === 0
                                ? "bg-surface text-primary-light"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-sm font-medium text-stone-900">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-primary-light">{formatPeso(item.revenue)}</span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${idx === 0 ? "bg-accent" : "bg-accent/50"}`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{item.count} orders</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Performance + Hourly Traffic */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Category Performance</h3>
              <div className="space-y-4">
                {data.categoryData.map((cat, idx) => {
                  const width = pct(cat.revenue, maxCatRevenue);
                  const colors = ["bg-primary", "bg-accent", "bg-stone-500", "bg-orange-600", "bg-emerald-600", "bg-stone-800"];
                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${colors[idx % colors.length]}`} />
                          <span className="text-sm font-medium text-stone-900">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-stone-500">{cat.count} orders</span>
                          <span className="text-sm font-semibold text-primary-light">{formatPeso(cat.revenue)}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colors[idx % colors.length]}`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Hourly Traffic Pattern
                </span>
              </h3>
              <div className="space-y-2">
                {data.hourlyData.map((hour) => {
                  const width = pct(hour.orders, maxHourlyOrders);
                  const isPeak = maxHourlyOrders > 0 && hour.orders >= maxHourlyOrders * 0.85;
                  return (
                    <div key={hour.hour} className="flex items-center gap-3">
                      <span className="w-12 text-xs font-medium text-stone-500 text-right">{hour.hour}</span>
                      <div className="flex-1 h-7 bg-stone-100 rounded-lg overflow-hidden">
                        <div
                          className={`h-full rounded-lg transition-all flex items-center pl-2 ${
                            isPeak ? "bg-accent" : "bg-accent/50"
                          }`}
                          style={{ width: `${width}%` }}
                        >
                          {width > 25 && (
                            <span className="text-[10px] font-semibold text-white">{hour.orders} orders</span>
                          )}
                        </div>
                      </div>
                      <span className="w-20 text-xs font-medium text-stone-600 text-right">{formatPeso(hour.revenue)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Sales by Category</h3>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative h-48 w-48 shrink-0">
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background: (() => {
                      const colors = ["#B4522E", "#C9A96E", "#78716c", "#ea580c", "#059669", "#44403c"];
                      let accumulated = 0;
                      const stops: string[] = [];
                      for (let i = 0; i < data.categoryData.length; i++) {
                        const start = accumulated;
                        accumulated += data.categoryData[i].percentage;
                        stops.push(`${colors[i % colors.length]} ${start}% ${accumulated}%`);
                      }
                      return `conic-gradient(${stops.join(", ")})`;
                    })(),
                  }}
                />
                <div className="absolute inset-5 rounded-full bg-white flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold text-stone-900">{formatPeso(data.totalRevenue)}</p>
                    <p className="text-[10px] text-stone-500">Total</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3">
                {data.categoryData.map((cat, idx) => {
                  const colors = ["bg-primary", "bg-accent", "bg-stone-500", "bg-orange-600", "bg-emerald-600", "bg-stone-800"];
                  return (
                    <div key={cat.name} className="flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2">
                      <div className={`h-3 w-3 rounded-full ${colors[idx % colors.length]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{cat.name}</p>
                        <p className="text-xs text-stone-500">{cat.percentage}% — {cat.count} orders</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
