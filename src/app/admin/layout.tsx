"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Clock,
  Camera,
  Gift,
  Ticket,
  Settings,
  LogOut,
  Eye,
  ChevronLeft,
  Menu,
  X,
  BarChart3,
  MessageSquare,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sales", label: "Sales", icon: BarChart3 },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/hours", label: "Hours", icon: Clock },
  { href: "/admin/photos", label: "Photos", icon: Camera },
  { href: "/admin/loyalty", label: "Loyalty", icon: Gift },
  { href: "/admin/vouchers", label: "Vouchers", icon: Ticket },
  { href: "/admin/waitlist", label: "Waitlist", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (localStorage.getItem("giuseppe_admin") === "1") setAuthed(true);
    } catch {}
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!authed) return;
    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/messages?unread=true");
        const json = await res.json();
        setUnreadMessages(json.data?.length ?? 0);
      } catch {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "giuseppe2025") {
      localStorage.setItem("giuseppe_admin", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("giuseppe_admin");
    setAuthed(false);
    setPassword("");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary">
            <ChevronLeft className="h-4 w-4" /> Back to site
          </Link>
          <p className="eyebrow text-stone-400">Giuseppe&apos;s / Owner</p>
          <h1 className="mt-3 font-serif text-5xl text-foreground">Owner access</h1>
          <p className="mt-2 text-sm text-muted">Enter the owner password to open the dashboard.</p>

          <form onSubmit={handleLogin} className="mt-10 rounded-3xl border border-line bg-white/70 p-6">
            <label className="block">
              <span className="eyebrow text-stone-400">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-2 w-full rounded-full border border-line bg-white px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-stone-400 focus:border-primary"
                autoFocus
              />
            </label>
            {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
            <button type="submit" className="mt-4 w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-white">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center gap-2 border-b border-stone-800 bg-foreground px-4 py-3 lg:hidden">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-stone-300" aria-label="Toggle menu">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-serif text-lg text-background">
          Giuseppe<span className="text-accent">’s</span>
        </span>
        <span className="eyebrow ml-2 text-stone-500">Admin</span>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-foreground transition-transform lg:static lg:block lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-stone-800 px-6 py-6">
              <p className="font-serif text-2xl text-background">
                Giuseppe<span className="text-accent">’s</span>
              </p>
              <p className="eyebrow mt-1 text-stone-500">Owner Dashboard</p>
            </div>

            <nav className="flex-1 space-y-1 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const showBadge = item.href === "/admin/messages" && unreadMessages > 0;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`mx-3 flex items-center gap-3 rounded-full px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-stone-400 hover:bg-white/5 hover:text-background"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-stone-500"}`} />
                    {item.label}
                    {showBadge && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-foreground">
                        {unreadMessages}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-1 border-t border-stone-800 py-3">
              <Link
                href="/"
                target="_blank"
                className="mx-3 flex items-center gap-3 rounded-full px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-stone-400 transition-colors hover:bg-white/5 hover:text-background"
              >
                <Eye className="h-4 w-4 text-stone-500" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="mx-3 flex w-[calc(100%-1.5rem)] items-center gap-3 rounded-full px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-stone-400 transition-colors hover:bg-white/5 hover:text-red-400"
              >
                <LogOut className="h-4 w-4 text-stone-500" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1200px] px-5 py-8 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
