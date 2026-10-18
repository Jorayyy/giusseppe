"use client";

import { useState, useEffect } from "react";
import { Award, Users, Gift, TrendingUp } from "lucide-react";
import { PageHeader, Stat, Spinner, EmptyState, Badge } from "@/components/admin/ui";

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

  if (cards === null) return <Spinner />;

  const totalMembers = cards.length;
  const stampsDistributed = cards.reduce((sum, c) => sum + c.stamps, 0);
  const rewardsClaimed = cards.reduce((sum, c) => sum + c.rewards, 0);
  const avgStamps = totalMembers > 0 ? (stampsDistributed / totalMembers).toFixed(1) : "0";

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Admin / Loyalty"
        title="Loyalty Program"
        description="Track your loyalty card members and rewards."
      />

      {error && (
        <div className="border border-dashed border-line bg-white px-6 py-4 text-center text-sm text-muted">
          Couldn&apos;t reach the database — showing no cards. Try again later.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Members" value={totalMembers} icon={<Users className="h-4 w-4" />} />
        <Stat label="Stamps Held" value={stampsDistributed} icon={<Award className="h-4 w-4" />} />
        <Stat label="Rewards Claimed" value={rewardsClaimed} icon={<Gift className="h-4 w-4" />} />
        <Stat label="Avg. Stamps/Member" value={avgStamps} icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <div className="border border-line bg-white">
        <div className="border-b border-line px-6 py-4">
          <h3 className="font-serif text-xl text-foreground">Members</h3>
        </div>
        {cards.length === 0 ? (
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title="No members yet"
            description="Cards start when guests check in from the Perks section on the site."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  {["Member", "Phone", "Stamps", "Rewards", "Joined"].map((h) => (
                    <th key={h} className="eyebrow px-6 py-3 font-medium text-stone-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {cards.map((c) => (
                  <tr key={c.id}>
                    <td className="px-6 py-3 font-medium text-foreground">{c.name || "—"}</td>
                    <td className="px-6 py-3 font-mono text-[13px] text-muted">{c.phone}</td>
                    <td className="px-6 py-3">
                      <Badge tone="primary">{c.stamps}/10</Badge>
                    </td>
                    <td className="px-6 py-3 text-muted">{c.rewards}</td>
                    <td className="px-6 py-3 text-muted">
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
