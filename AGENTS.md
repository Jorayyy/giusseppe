# Giuseppe's Restaurant Website

## Project Overview
Next.js 16 restaurant website for Giuseppe's Italian-Filipino in Tacloban City. Currently live at giusseppe.vercel.app.

## Tech Stack
- Next.js 16.3.3 (App Router, Turbopack)
- React 19.2.8
- Tailwind CSS v4 (no tailwind.config.js — uses `@import "tailwindcss"` and `@theme inline` in globals.css)
- TypeScript 5
- Lucide React for icons

## Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```
No test suite. No single-test runner.

## Project Structure
```
src/
├── app/
│   ├── page.tsx           # Homepage (server component, renders RestaurantPage)
│   ├── layout.tsx         # Root layout with fonts
│   ├── globals.css        # Tailwind v4 imports + theme
│   ├── menu/page.tsx      # Photo menu page with Unsplash images
│   ├── admin/             # Owner dashboard (sidebar layout)
│   │   ├── layout.tsx     # Auth gate + sidebar nav
│   │   ├── page.tsx       # Dashboard overview with stats
│   │   ├── menu/page.tsx  # Menu editor
│   │   ├── hours/page.tsx # Hours editor
│   │   ├── photos/page.tsx# Photos editor
│   │   └── settings/page.tsx # Settings editor
│   └── qr/page.tsx        # QR code page
├── components/
│   ├── restaurant-page.tsx # Client orchestrator (main page)
│   ├── roadmap.tsx        # Coming soon features (currently hidden)
│   └── ... (hero, menu-section, contact-card, etc.)
└── lib/
    └── data.ts            # Menu, hours, restaurant data + types
```

## Key Conventions
- Server components by default; `"use client"` only when needed (interactive UI)
- All data hardcoded in `src/lib/data.ts` — no database
- Admin auth via localStorage (`giuseppe_admin`), password: `giuseppe2025`
- Admin edits save to localStorage, not backend
- Images from `images.unsplash.com` configured in next.config.ts
- Philippine locale (en-PH) for formatting
- Amber/stone color palette for restaurant branding

## Next.js 16 Specifics
- Breaking changes from earlier versions — check `node_modules/next/dist/docs/` before writing code
- Turbopack is the default bundler
- App Router with file-based routing

## Deployment
- GitHub repo: https://github.com/Jorayyy/giusseppe
- Vercel auto-deploys from main branch
- No environment variables needed (all data is client-side localStorage)

## Hidden Features (Roadmap)
The `roadmap.tsx` component is currently commented out in `restaurant-page.tsx`. Features listed:
- **Tier 2**: Online Ordering, Loyalty Card, Instagram Feed, Waitlist & Reminders, Sales Dashboard
- **Tier 3**: Ask Giuseppe AI, 360° Tour, Gift Vouchers

## Gotchas
- Tailwind v4: No `tailwind.config.js` — use `@theme inline` in CSS
- Admin dashboard uses localStorage only — no backend persistence
- Password visible in source code (`giuseppe2025`)
- No API routes — purely static site with client-side state