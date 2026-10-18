"use client";

import { useState, useEffect } from "react";
import { BarChart3, PhilippinePeso, ShoppingBag, Crown, RefreshCw, Download, Clock, Calendar } from "lucide-react";
import { buildSalesData, formatPeso, type SalesData, type SalesRecord } from "@/lib/sales-data";
import { PageHeader, Stat, EmptyState, Spinner, btnPrimary, btnSecondary } from "@/components/admin/ui";

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

const CATEGORY_COLORS = ["bg-primary", "bg-accent", "bg-stone-500", "bg-stone-700", "bg-primary/60", "bg-accent/60"];
const PIE_COLORS = ["#B4522E", "#C9A96E", "#78716C", "#44403C", "#D9C08C", "#A8A29E"];

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

  if (!data) return <Spinner />;

  const hasData = data.totalOrders > 0;
  const maxHourlyOrders = Math.max(...data.hourlyData.map((h) => h.orders));
  const maxTopRevenue = Math.max(...data.topItems.slice(0, 5).map((i) => i.revenue));
  const maxCatRevenue = Math.max(...data.categoryData.map((c) => c.revenue));

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Admin / Sales"
        title="Sales Dashboard"
        description="Track revenue, orders, and performance."
        actions={
          <>
            <button onClick={() => setTick((t) => t + 1)} className={btnSecondary}>
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={exportCSV} className={btnPrimary}>
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(Object.keys(DATE_LABELS) as DateRange[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
              range === r
                ? "border-foreground bg-foreground text-background"
                : "border-line bg-white text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            {DATE_LABELS[r]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Revenue" value={formatPeso(data.totalRevenue)} icon={<PhilippinePeso className="h-4 w-4" />} />
        <Stat label="Total Orders" value={data.totalOrders.toLocaleString()} icon={<ShoppingBag className="h-4 w-4" />} />
        <Stat label="Avg Order Value" value={formatPeso(data.avgOrderValue)} icon={<BarChart3 className="h-4 w-4" />} />
        <Stat label="Top Item" value={data.topItem.name} hint={`${data.topItem.count} sold`} icon={<Crown className="h-4 w-4" />} />
      </div>

      {!hasData && (
        <div className="rounded-3xl border border-dashed border-line bg-white">
          <EmptyState
            title="No sales recorded yet"
            description="Sales records saved through the API will appear here. Try another date range, or add today's numbers."
          />
        </div>
      )}

      {hasData && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="font-serif text-xl text-foreground">Revenue Trend</h3>
              <p className="eyebrow mt-1 text-stone-400">
                {range === "today" ? "Today's" : range === "week" ? "This week's" : "This month's"} daily breakdown
              </p>
              <div className="mt-6 flex h-52 items-end gap-2">
                {data.revenueByDay.map((day) => {
                  const maxRev = Math.max(...data.revenueByDay.map((d) => d.revenue));
                  const height = pct(day.revenue, maxRev);
                  const isMax = maxRev > 0 && day.revenue === maxRev;
                  return (
                    <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                      <span className="font-mono text-[10px] text-stone-400">{formatPeso(day.revenue)}</span>
                      <div
                        className={`w-full transition-all ${isMax ? "bg-primary" : "bg-accent/50"}`}
                        style={{ height: `${height}%`, minHeight: day.revenue > 0 ? "8px" : "2px" }}
                      />
                      <span className="eyebrow text-stone-400">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="font-serif text-xl text-foreground">Top 5 Items</h3>
              <div className="mt-5 space-y-4">
                {data.topItems.slice(0, 5).map((item, idx) => {
                  const width = pct(item.revenue, maxTopRevenue);
                  return (
                    <div key={item.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-foreground">
                          <span className="font-mono text-xs text-stone-400">{String(idx + 1).padStart(2, "0")}</span>
                          {item.name}
                        </span>
                        <span className="font-mono text-sm text-primary">{formatPeso(item.revenue)}</span>
                      </div>
                      <div className="h-1.5 bg-surface">
                        <div className={`h-full ${idx === 0 ? "bg-primary" : "bg-accent"}`} style={{ width: `${width}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-muted">{item.count} orders</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="font-serif text-xl text-foreground">Category Performance</h3>
              <div className="mt-5 space-y-4">
                {data.categoryData.map((cat, idx) => {
                  const width = pct(cat.revenue, maxCatRevenue);
                  return (
                    <div key={cat.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-foreground">
                          <span className={`h-2.5 w-2.5 ${CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}`} />
                          {cat.name}
                        </span>
                        <span className="flex items-center gap-3 font-mono text-xs text-muted">
                          {cat.count} orders
                          <span className="text-primary">{formatPeso(cat.revenue)}</span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-surface">
                        <div className={`h-full ${CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}`} style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="flex items-center gap-2 font-serif text-xl text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Hourly Traffic Pattern
              </h3>
              <div className="mt-5 space-y-2">
                {data.hourlyData.map((hour) => {
                  const width = pct(hour.orders, maxHourlyOrders);
                  const isPeak = maxHourlyOrders > 0 && hour.orders >= maxHourlyOrders * 0.85;
                  return (
                    <div key={hour.hour} className="flex items-center gap-3">
                      <span className="w-12 text-right font-mono text-xs text-stone-400">{hour.hour}</span>
                      <div className="h-6 flex-1 bg-surface">
                        <div
                          className={`flex h-full items-center pl-2 ${isPeak ? "bg-primary" : "bg-accent/60"}`}
                          style={{ width: `${width}%` }}
                        >
                          {width > 25 && (
                            <span className="font-mono text-[10px] text-background">{hour.orders} orders</span>
                          )}
                        </div>
                      </div>
                      <span className="w-20 text-right font-mono text-xs text-muted">{formatPeso(hour.revenue)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6">
            <h3 className="font-serif text-xl text-foreground">Sales by Category</h3>
            <div className="mt-5 flex flex-col items-center gap-8 sm:flex-row">
              <div className="relative h-48 w-48 shrink-0">
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background: (() => {
                      let accumulated = 0;
                      const stops: string[] = [];
                      for (let i = 0; i < data.categoryData.length; i++) {
                        const start = accumulated;
                        accumulated += data.categoryData[i].percentage;
                        stops.push(`${PIE_COLORS[i % PIE_COLORS.length]} ${start}% ${accumulated}%`);
                      }
                      return `conic-gradient(${stops.join(", ")})`;
                    })(),
                  }}
                />
                <div className="absolute inset-5 flex items-center justify-center rounded-full bg-white">
                  <div className="text-center">
                    <p className="font-serif text-xl text-foreground">{formatPeso(data.totalRevenue)}</p>
                    <p className="eyebrow mt-1 text-stone-400">Total</p>
                  </div>
                </div>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-3">
                {data.categoryData.map((cat, idx) => (
                  <div key={cat.name} className="flex items-center gap-2 border border-line px-3 py-2">
                    <span className={`h-2.5 w-2.5 ${CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted">
                        {cat.percentage}% — {cat.count} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
