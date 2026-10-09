# Giuseppe's photography

All real photos of the restaurant. The site references these by slot name, not filename order.

## Slots (how the site uses them)

| Slot | File | Used for |
|---|---|---|
| Hero | `hero.jpg` | Full-bleed homepage hero band |
| Story | `3.jpg` | "Our story" section (guests dining) |
| Visit | `interior-2.jpg` | Visit section (dining room) |
| Highlights | `1.jpg`, `dish-rosemary-flatbread.jpg`, `dish-steak-plate.jpg` | Menu highlight cards on homepage |
| Gallery | see `PHOTOS` in `src/lib/data.ts` | Photo grid + lightbox |
| Menu banner | `interior-1.jpg` | Top band on `/menu` |

## Rules for new photos

1. Drop files here as `.jpg`, landscape preferred for hero/bands, square-ish for gallery.
2. Add them to `PHOTOS` in `src/lib/data.ts` (gallery) or the matching slot above.
3. Real photos only — no stock. If a slot has no good photo yet, leave it empty rather than filling it.
4. If the owner shoots a proper set: replace `hero.jpg` first (biggest impact), then story/visit, then dishes.

## Legacy files

`1.jpg`–`6.jpg` are the original uploads (`1 = 2 = 6` duplicates). Keep them: admin/database rows may reference these paths.

## Admin uploads

Photos added via `/admin/photos` go through `/api/upload` (Vercel Blob) and override the static set when the database is reachable; the static `PHOTOS` list is the fallback.
