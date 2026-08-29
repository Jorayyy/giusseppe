"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Crown,
  RefreshCw,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { generateSalesData, formatPeso, type SalesData } from "@/lib/sales-data";

export default function SalesDashboard() {
  const [data, setData] = useState<SalesData | null>(null);

  useEffect(() => {
    setData(generateSalesData());
  }, []);

  const refresh = () => setData(generateSalesData());

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const maxHourlyOrders = Math.max(...data.hourlyData.map((h) => h.orders));
  const maxCatRevenue = Math.max(...data.categoryData.map((c) => c.revenue));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">Today&apos;s Sales</h2>
          <p className="text-sm text-stone-500">Live overview of today&apos;s performance</p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3 w-3" /> +12%
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{formatPeso(data.totalRevenue)}</p>
          <p className="text-sm text-stone-500">Total Revenue</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3 w-3" /> +8%
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{data.totalOrders}</p>
          <p className="text-sm text-stone-500">Total Orders</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{formatPeso(data.avgOrderValue)}</p>
          <p className="text-sm text-stone-500">Avg Order Value</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Crown className="h-5 w-5 text-purple-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              <ArrowUpRight className="h-3 w-3" /> #1
            </span>
          </div>
          <p className="mt-3 text-lg font-bold text-stone-900 truncate">{data.topItem.name}</p>
          <p className="text-sm text-stone-500">{data.topItem.count} orders</p>
        </div>
      </div>

      {/* Revenue Chart + Peak Hours */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Bar Chart */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Revenue by Day</h3>
          <div className="flex items-end gap-2 h-48">
            {data.revenueByDay.map((day) => {
              const maxRev = Math.max(...data.revenueByDay.map((d) => d.revenue));
              const height = (day.revenue / maxRev) * 100;
              const isMax = day.revenue === maxRev;
              return (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-stone-500">{formatPeso(day.revenue)}</span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      isMax ? "bg-accent" : "bg-stone-200"
                    }`}
                    style={{ height: `${height}%`, minHeight: "8px" }}
                  />
                  <span className="text-xs font-medium text-stone-600">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Peak Hours
            </span>
          </h3>
          <div className="space-y-2">
            {data.hourlyData.map((hour) => {
              const width = (hour.orders / maxHourlyOrders) * 100;
              const isPeak = hour.orders >= maxHourlyOrders * 0.85;
              return (
                <div key={hour.hour} className="flex items-center gap-3">
                  <span className="w-12 text-xs font-medium text-stone-500 text-right">{hour.hour}</span>
                  <div className="flex-1 h-6 bg-stone-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full rounded-lg transition-all ${
                        isPeak ? "bg-accent" : "bg-stone-300"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs font-medium text-stone-600 text-right">{hour.orders}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bestsellers + Category Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bestsellers */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Bestsellers</h3>
          <div className="space-y-3">
            {data.topItems.slice(0, 8).map((item, idx) => (
              <div key={item.name} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                    idx === 0
                      ? "bg-surface text-primary-light"
                      : idx === 1
                      ? "bg-stone-200 text-stone-700"
                      : idx === 2
                      ? "bg-orange-100 text-orange-700"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{item.name}</p>
                  <p className="text-xs text-stone-500">{item.count} sold</p>
                </div>
                <span className="text-sm font-semibold text-primary-light">{formatPeso(item.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Category Breakdown</h3>
          <div className="flex items-center gap-8">
            {/* Pie chart */}
            <div className="relative h-40 w-40 shrink-0">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: (() => {
                    const colors = ["#d97706", "#78716c", "#ea580c", "#059669", "#7c3aed", "#dc2626"];
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
              <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-stone-900">{data.categoryData.length}</p>
                  <p className="text-[10px] text-stone-500">Categories</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-2">
              {data.categoryData.map((cat, idx) => {
                const colors = ["bg-surface0", "bg-stone-500", "bg-orange-500", "bg-emerald-500", "bg-purple-500", "bg-red-500"];
                return (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${colors[idx % colors.length]}`} />
                    <span className="flex-1 text-sm text-stone-700">{cat.name}</span>
                    <span className="text-xs font-medium text-stone-500">{cat.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="pb-3 text-left font-medium text-stone-500">Order</th>
                <th className="pb-3 text-left font-medium text-stone-500">Time</th>
                <th className="pb-3 text-left font-medium text-stone-500">Items</th>
                <th className="pb-3 text-right font-medium text-stone-500">Total</th>
                <th className="pb-3 text-right font-medium text-stone-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition">
                  <td className="py-3 font-medium text-stone-900">{order.id}</td>
                  <td className="py-3 text-stone-600">{order.time}</td>
                  <td className="py-3 text-stone-600 max-w-[200px] truncate">{order.items.join(", ")}</td>
                  <td className="py-3 text-right font-semibold text-primary-light">{formatPeso(order.total)}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.status === "In Progress"
                          ? "bg-surface text-primary-light"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
