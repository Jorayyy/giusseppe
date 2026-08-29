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
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sales", label: "Sales", icon: BarChart3 },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/hours", label: "Hours", icon: Clock },
  { href: "/admin/photos", label: "Photos", icon: Camera },
  { href: "/admin/loyalty", label: "Loyalty", icon: Gift },
  { href: "/admin/vouchers", label: "Vouchers", icon: Ticket },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (localStorage.getItem("giuseppe_admin") === "1") setAuthed(true);
    } catch {}
    setChecking(false);
  }, []);

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
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5] p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-600 font-serif text-xl font-bold text-white">G</div>
            <h1 className="mt-4 font-serif text-2xl font-bold">Owner Login</h1>
            <p className="mt-1 text-center text-sm text-stone-500">Enter the owner password to access the dashboard.</p>
          </div>
          <div className="mt-6 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              autoFocus
            />
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">
              Sign In
            </button>
            <Link href="/" className="flex items-center justify-center gap-1.5 pt-2 text-sm text-stone-500 hover:text-amber-600">
              <ChevronLeft className="h-4 w-4" /> Back to site
            </Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center border-b border-stone-200 bg-white/90 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 font-serif text-sm font-bold text-white">G</div>
          <span className="font-serif text-lg font-semibold text-stone-900">Admin</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-stone-200 bg-white transition-transform lg:translate-x-0 lg:static lg:block ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-stone-200 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 font-serif text-lg font-bold text-white">G</div>
              <div>
                <h1 className="font-serif text-lg font-bold leading-none text-stone-900">Giuseppe&apos;s</h1>
                <p className="text-xs text-stone-500">Owner Dashboard</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 p-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-amber-50 text-amber-700"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? "text-amber-600" : "text-stone-400"}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="space-y-1 border-t border-stone-200 p-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition"
              >
                <Eye className="h-5 w-5 text-stone-400" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-red-50 hover:text-red-600 transition"
              >
                <LogOut className="h-5 w-5 text-stone-400" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}