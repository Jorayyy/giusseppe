"use client";

import { Award, Users, Gift, TrendingUp } from "lucide-react";

const STATS = [
  {
    label: "Total Members",
    value: 47,
    icon: Users,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Stamps Distributed",
    value: 312,
    icon: Award,
    color: "bg-surface",
    iconColor: "text-primary",
  },
  {
    label: "Rewards Claimed",
    value: 18,
    icon: Gift,
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Avg. Visits/Member",
    value: "6.6",
    icon: TrendingUp,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const RECENT_ACTIVITY = [
  { name: "Maria S.", action: "Earned stamp #7", time: "2h ago" },
  { name: "Juan D.", action: "Claimed Free Tiramisu", time: "5h ago" },
  { name: "Ana L.", action: "Earned stamp #3", time: "1d ago" },
  { name: "Carlo M.", action: "Joined loyalty program", time: "2d ago" },
  { name: "Bea R.", action: "Earned stamp #5", time: "3d ago" },
];

export default function AdminLoyaltyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Loyalty Program</h1>
        <p className="mt-1 text-stone-500">Track your loyalty card members and rewards.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-sm text-stone-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {RECENT_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-sm font-bold text-primary-light">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-500">{item.action}</p>
                </div>
              </div>
              <span className="text-xs text-stone-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
