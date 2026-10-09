"use client";

import { useState, useEffect } from "react";
import { Award, Users, Gift, TrendingUp } from "lucide-react";

type LoyaltyCard = {
  id: string;
  phone: string;
  name: string | null;
  stamps: number;
  rewards: number;
  createdAt: string;
};

export default function AdminLoyaltyPage() {
  const [cards, setCards] = useState<LoyaltyCard[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/loyalty");
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        if (!cancelled) setCards(Array.isArray(json.data) ? json.data : []);
      } catch {
        if (!cancelled) {
          setCards([]);
          setError(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (cards === null) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const totalMembers = cards.length;
  const stampsDistributed = cards.reduce((sum, c) => sum + c.stamps, 0);
  const rewardsClaimed = cards.reduce((sum, c) => sum + c.rewards, 0);
  const avgStamps = totalMembers > 0 ? (stampsDistributed / totalMembers).toFixed(1) : "0";

  const stats = [
    { label: "Total Members", value: totalMembers, icon: Users, color: "bg-primary/10", iconColor: "text-primary" },
    { label: "Stamps Held", value: stampsDistributed, icon: Award, color: "bg-surface", iconColor: "text-primary" },
    { label: "Rewards Claimed", value: rewardsClaimed, icon: Gift, color: "bg-accent/25", iconColor: "text-stone-800" },
    { label: "Avg. Stamps/Member", value: avgStamps, icon: TrendingUp, color: "bg-stone-100", iconColor: "text-stone-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Loyalty Program</h1>
        <p className="mt-1 text-stone-500">Track your loyalty card members and rewards.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-center">
          <p className="text-sm font-medium text-stone-700">
            Couldn&apos;t reach the database — showing no cards. Try again later.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Members</h3>
        {cards.length === 0 ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <Users className="h-7 w-7 text-stone-400" />
            </div>
            <p className="mt-4 font-medium text-stone-900">No members yet</p>
            <p className="mt-1 text-sm text-stone-500">
              Cards start when guests check in from the Perks section on the site.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-wide text-stone-400">
                  <th className="py-2 pr-4 font-medium">Member</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                  <th className="py-2 pr-4 font-medium">Stamps</th>
                  <th className="py-2 pr-4 font-medium">Rewards</th>
                  <th className="py-2 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {cards.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 pr-4 font-medium text-stone-900">{c.name || "—"}</td>
                    <td className="py-3 pr-4 text-stone-600">{c.phone}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-primary-light">
                        {c.stamps}/10
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-stone-600">{c.rewards}</td>
                    <td className="py-3 text-stone-500">
                      {new Date(c.createdAt).toLocaleDateString("en-PH", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
