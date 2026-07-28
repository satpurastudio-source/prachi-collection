# Images

All artwork lives in **`catalog/`** — one folder, so the outfit photos are
easy to manage. This README stays out here as the guide.

Most of `catalog/` is still **generated placeholders** (ornamental SVG in the
brand palette) so the site looks finished before real photography lands.
Regenerate them any time with:

```bash
node tools/make-placeholders.mjs
```

## Swapping in real photos

1. Drop your photo in **`catalog/`** using the **same base name** as the
   placeholder it replaces, e.g. `men-01.jpg`.
2. Point the site at it. Which file you edit depends on the slot:
   - **Lookbook photos** (`bridal-*`, `men-*`, `party-*`, `siders-*`,
     `jewellery-*`) — in `js/main.js`, find the `LOOKS` list and change that
     one entry from `"men-01.svg"` to `"men-01.jpg"`.
   - **Everything else** (`hero-portrait`, `story-*`, `col-*`, `rent-01`,
     `groom-01`) — in `index.html`, change that one `src` from `.svg` to `.jpg`.

You can mix `.jpg` and `.svg` freely, so photos can go in one at a time as you
shoot them. The CSS crops with `object-fit: cover`, so any aspect ratio sits
correctly — but see the table for what crops best.

## Photos already in place

| File | Slot |
| --- | --- |
| `col-men.jpg` | Men's Wear collection card (home page) |
| `men-01.jpg` | "Sherwani" — lookbook + home page teaser rail |
| `men-02.jpg` | "Ivory & Gold Sherwani" — lookbook |
| `groom-01.jpg` | Groom's Corner background |

Everything else is still a placeholder.

## What each slot is for

| File | Where it appears | Shoot it as |
| --- | --- | --- |
| `hero-portrait` | Top of the home page, the first thing anyone sees | Tall portrait (3:4). Best single bridal look you have. |
| `story-01` | "The House" section | Portrait. Interior of the store, or racks of lehengas. |
| `story-02` | "The House", small square | Square. Close-up — jewellery, dupatta detail, embroidery. |
| `col-bridal`, `col-men`, `col-party`, `col-siders`, `col-jewellery` | The five swipeable **collection cards** on the home page — high visibility | Tall portrait (3:4). One hero look per category. |
| `bridal-01` … `bridal-06` | Lookbook grid | Portrait. |
| `men-01` … `men-04` | Lookbook grid | Portrait. |
| `party-01` … `party-04` | Lookbook grid | Portrait. |
| `siders-01` … `siders-03` | Lookbook grid | Portrait. |
| `jewellery-01` … `jewellery-03` | Lookbook grid | Portrait. |
| `rent-01` | "Rent or Buy" section | Landscape (4:3). |
| `groom-01` | "The Groom's Corner" background | Wide landscape (16:9). Sits **behind text under a dark overlay**, so use a spare shot, not a good one. |

The first six entries of `LOOKS` also appear in the home page teaser rail, so
those six get seen far more than the rest. Reorder the list to promote a photo.

## Photo tips for a fashion site

- **Shoot vertical.** Most visitors are on a phone; portrait fills the screen.
- **Plain wall behind the outfit.** A clean background makes the clothes the subject.
- Natural light near the shop door beats the ceiling tube-light every time.
- Full-length first, then one detail shot (embroidery, dupatta, jewellery).
- Keep files under ~400 KB each so the site stays fast on mobile data.
