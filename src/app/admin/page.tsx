"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Clock,
  Camera,
  Settings,
  Copy,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Star,
} from "lucide-react";
import { MENU } from "@/lib/data";
import { PageHeader, Stat } from "@/components/admin/ui";

const QUICK_ACTIONS = [
  { label: "Sales Dashboard", href: "/admin/sales", icon: BarChart3 },
  { label: "Edit Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Edit Hours", href: "/admin/hours", icon: Clock },
  { label: "Edit Photos", href: "/admin/photos", icon: Camera },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminDashboard() {
  const [menu, setMenu] = useState(MENU);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        if (!json.data || Object.keys(json.data).length === 0) throw new Error("empty");
        if (!cancelled) setMenu(json.data);
        return;
      } catch {}
      try {
        const m = localStorage.getItem("giuseppe_menu");
        if (m && !cancelled) setMenu(JSON.parse(m));
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalItems = Object.values(menu).flat().length;
  const totalCategories = Object.keys(menu).length;
  const popularItems = Object.values(menu).flat().filter((i) => i.popular).length;

  const copyLink = () => {
    navigator.clipboard.writeText("https://giusseppe.vercel.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Admin / Overview"
        title="Dashboard"
        description="Welcome back. Here's an overview of your restaurant."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Menu Items" value={totalItems} icon={<UtensilsCrossed className="h-4 w-4" />} />
        <Stat label="Categories" value={totalCategories} icon={<BarChart3 className="h-4 w-4" />} />
        <Stat label="Popular Items" value={popularItems} icon={<Star className="h-4 w-4" />} />
        <Stat label="Google Rating" value="4.4" hint="328 reviews" icon={<Star className="h-4 w-4" />} />
      </div>

      <div>
        <p className="eyebrow mb-4 text-stone-400">Quick actions</p>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center justify-between gap-3 bg-white px-5 py-5 transition-colors hover:bg-surface"
            >
              <span className="flex items-center gap-3">
                <action.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-stone-300 transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="border border-line bg-white p-6">
          <p className="eyebrow text-stone-400">Website</p>
          <h3 className="mt-2 font-serif text-2xl text-foreground">Live and ready</h3>
          <div className="mt-5 space-y-2">
            <a
              href="https://giusseppe.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-line px-4 py-3 text-sm text-foreground transition-colors hover:border-primary"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-stone-400" />
                giusseppe.vercel.app
              </span>
              <ArrowRight className="h-4 w-4 text-stone-300" />
            </a>
            <a
              href="https://giusseppe.vercel.app/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-line px-4 py-3 text-sm text-foreground transition-colors hover:border-primary"
            >
              <span className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-stone-400" />
                Menu page
              </span>
              <ArrowRight className="h-4 w-4 text-stone-300" />
            </a>
          </div>
          <button
            onClick={copyLink}
            className="mt-3 flex w-full items-center justify-center gap-2 border border-line px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy website link
              </>
            )}
          </button>
        </div>

        <div className="border border-line bg-white p-6">
          <p className="eyebrow text-stone-400">QR Code</p>
          <h3 className="mt-2 font-serif text-2xl text-foreground">Scan the menu</h3>
          <div className="mt-5 flex justify-center border border-line bg-background p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://giusseppe.vercel.app/menu"
              alt="QR Code"
              className="h-40 w-40"
            />
          </div>
          <p className="eyebrow mt-4 text-center text-stone-400">Points to /menu</p>
        </div>
      </div>

      <div className="border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="font-serif text-xl text-foreground">Popular Items</h3>
          <Link href="/admin/menu" className="link-underline text-sm font-medium text-primary">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-line">
          {Object.entries(menu)
            .flatMap(([cat, items]) => items.filter((i) => i.popular).map((i) => ({ ...i, category: cat })))
            .slice(0, 5)
            .map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="eyebrow mt-1 text-stone-400">{item.category}</p>
                </div>
                <span className="font-mono text-sm text-primary">{item.price}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
