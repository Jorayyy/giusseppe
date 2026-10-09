# Giuseppe's Restaurant Website

## Project Overview
Next.js 16 restaurant website for Giuseppe's Italian-Filipino in Tacloban City. Live at giusseppe.vercel.app. Editorial trattoria design (2026 redesign): full-bleed photography, typographic printed menu, terracotta accent.

## Tech Stack
- Next.js 16.3.3 (App Router, Turbopack)
- React 19.2.8
- Prisma 6 + PostgreSQL (Neon) — menu, photos, messages, vouchers, loyalty, waitlist, sales, settings
- Tailwind CSS v4 (no tailwind.config.js — uses `@import "tailwindcss"` and `@theme inline` in globals.css)
- TypeScript 5, Lucide React for icons

## Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check (~10 pre-existing react-hooks errors in admin pages — baseline, don't chase)
npx prisma db push  # Sync schema (needs DATABASE_URL reachable)
```
No test suite.

## Design System (globals.css)
- Palette: `--primary: #B4522E` terracotta, `--accent: #C9A96E` gold, `--background: #FFFBF5`, `--surface: #F7F1E8`, stone neutrals. No green/blue/purple.
- Type: `--text-display` / `--text-title` clamps; Playfair Display + Inter.
- Utilities: `.eyebrow` (11px uppercase 0.14em), `.link-underline` (animated), `.leader` (dot leader), `[data-reveal]` + `.is-in` reveal system (IntersectionObserver in `components/reveal-init.tsx`, `html.js` class set inline in layout).
- Buttons `rounded-md`, images `rounded-sm`, no card soup. Exactly one terracotta band per page.
- Section pattern: `components/section-header.tsx` (eyebrow + title + lede), underline inputs in `components/field.tsx`.

## Project Structure
```
src/
├── app/
│   ├── page.tsx           # Homepage composer (server, revalidate 60): Navbar, Hero, Story,
│   │                      #   MenuHighlights, Gallery, ReviewQuote, Visit, Reserve,
│   │                      #   PrivateDining, Perks, Footer
│   ├── menu/page.tsx      # Typographic printed menu (server, getMenu(), no photos)
│   ├── admin/             # Owner dashboard (sidebar): sales, menu, hours, photos,
│   │                      #   loyalty, vouchers, waitlist, messages, settings
│   ├── api/               # menu, photos, messages, vouchers(+redeem), loyalty,
│   │                      #   waitlist, sales, settings, upload (all [id] variants)
│   └── qr/page.tsx
├── components/            # navbar, hero, story, menu-highlights, gallery (lightbox),
│                          #   review-quote, visit, reserve, private-dining, perks,
│                          #   footer, section-header, field, open-pill, reveal-init,
│                          #   image-upload
└── lib/
    ├── data.ts            # Static fallbacks: RESTAURANT, HOURS, MENU, PHOTOS, reviews
    ├── menu.ts            # getMenu(): DB → fallback static MENU
    ├── prisma.ts          # Prisma client
    └── sales-data.ts      # Mock generator for sales dashboard (demo data)
```

## Key Conventions
- Server components by default; `"use client"` only when needed
- Server mutations via API routes (Prisma); admin pages fetch `/api/*` with localStorage fallback when DB unreachable
- Public pages: `getMenu()`/`fetchPhotos()` fall back to static `data.ts` so the site builds offline
- Admin auth via localStorage (`giuseppe_admin`), password: `giuseppe2025` (visible in source — known limitation)
- Booking/inquiry forms POST `/api/messages` with emoji-prefixed `content` (`📅 BOOKING REQUEST`, `🎉 PRIVATE DINING...`); admin messages page parses these
- Philippine locale (en-PH), PHP prices
- Photos: curated JPGs in `public/photos/` (see README.md for slots). Legacy `1.jpg`–`6.jpg` kept because DB rows may reference them.

## Deployment
- GitHub: https://github.com/Jorayyy/giusseppe — Vercel auto-deploys from main
- Env: `DATABASE_URL` (Neon) required on Vercel; local `.env` also has it
- Another AI session has force-pushed rewrites before — local main wins; backup branch `backup/remote-rewrite`

## Known Limitations
- Hours editor and Settings admin persist to DB/localStorage but the public site still reads static `data.ts` (not yet consumed publicly)
- Sales dashboard and Loyalty admin show demo/generated data (SalesRecord/LoyaltyCard APIs exist but no real data entry yet)
- Public waitlist removed (no honest "full" signal); admin waitlist page stays and is API-backed
- Roadmap, chat widget, and AI lib removed in the redesign
