"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Visit", href: "/#visit" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-stone-900">
          Giuseppe&apos;s
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#reserve"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light sm:inline-block"
          >
            Reserve a table
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-stone-700 hover:bg-stone-100 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200/70 bg-background px-6 pb-6 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-stone-200/60 py-3 text-sm font-medium text-stone-700"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#reserve"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-white"
          >
            Reserve a table
          </Link>
        </div>
      )}
    </nav>
  );
}
