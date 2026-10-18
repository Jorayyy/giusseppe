"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Visit", href: "/#visit" },
  { label: "Private dining", href: "/#private-dining" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 rounded-full border border-white/60 bg-white/70 pl-5 pr-2 shadow-[0_18px_40px_-30px_rgba(15,43,38,0.55)] backdrop-blur-xl">
        <Link href="/" className="font-serif text-xl text-foreground sm:text-2xl">
          Giuseppe<span className="text-primary">’s</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#reserve"
            className="hidden items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary sm:inline-flex"
          >
            Reserve a table
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[1240px] rounded-3xl border border-white/60 bg-white/90 p-3 shadow-xl backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#reserve"
            onClick={() => setMobileOpen(false)}
            className="mt-1 block rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background"
          >
            Reserve a table
          </Link>
        </div>
      )}
    </nav>
  );
}
