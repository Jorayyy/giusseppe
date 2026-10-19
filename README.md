<div align="center">

# Giuseppe's

**Italian comfort food in the heart of Tacloban City.**

[**Live site**](https://giusseppe.vercel.app) · [Menu](https://giusseppe.vercel.app/menu) · [Reserve a table](https://giusseppe.vercel.app/#reserve)

[![Giuseppe's website](screenshots/preview.png)](https://giusseppe.vercel.app)

<sub>Next.js 16 · React 19 · Prisma · PostgreSQL · Tailwind CSS 4 · Vercel Blob</sub>
</div>

A warm, fast restaurant site paired with a real back office. Guests can see what's
cooking, check whether the kitchen is open right now, browse the full menu and join the
waitlist; the team can edit the menu, publish photos, run vouchers and loyalty, and work
the waitlist from the same app.

## Guest experience

- **Live open/closed pill** — computed from the restaurant's editable opening hours.
- **Menu** — homepage highlights plus a full `/menu` with categories, descriptions and
  prices, and a printable QR page for tables.
- **Gallery & story** — food and room photos, the Giuseppe's story, and a private-dining
  enquiry.
- **Waitlist / reservation form** — guest details, party size and preferred time, stored
  with a live position.
- **Find us** — address, map link, click-to-call, and a Google review prompt after the meal.

## Back office (`/admin`)

- **Dashboard & sales** — covers, revenue and best-selling dishes from recorded sales.
- **Menu editor** — create, price, reorder, feature and hide dishes; changes go live
  immediately.
- **Photos** — upload to Vercel Blob, then caption and reorder the gallery.
- **Waitlist** — seat, move or release parties and keep positions accurate.
- **Vouchers & loyalty** — issue codes, redeem them at the counter, and manage the loyalty
  programme.
- **Messages, hours & settings** — read enquiries and edit opening hours, phone, address
  and social links.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, route handlers) |
| UI | React 19, TypeScript, Tailwind CSS 4, lucide-react |
| Data | Prisma 6 + PostgreSQL (Neon) |
| Media | Vercel Blob uploads |
| Extras | `/qr` table-tent menu, JSON endpoints for menu, waitlist, vouchers and messages |

## Getting started

```bash
git clone https://github.com/Jorayyy/giusseppe.git
cd giusseppe
npm install
```

Create `.env.local`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

Then push the schema and start the dev server:

```bash
npx prisma db push
npm run dev
```

Open http://localhost:3000 for the site and `/admin` for the back office. When the
database is empty the site renders from the curated defaults in `src/lib/data.ts`, so it
looks complete on the very first run.

## Project layout

```
prisma/           schema (menu, photos, waitlist, messages, vouchers, sales, settings)
src/app/          marketing site, /admin dashboard, /api routes, /qr menu
src/components/   hero, menu highlights, gallery, reserve, visit, admin UI
src/lib/          Prisma client, site settings, menu and sales data helpers
```

## Deploy

Import the repo on Vercel, add a Neon/Postgres `DATABASE_URL` and a Blob token, run
`npx prisma db push` once against the production database, and deploy. The admin area is
password-gated and writes straight to Postgres, so content changes need no rebuild.
