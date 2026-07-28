# Images

Everything here right now is a **generated placeholder** (ornamental SVG in the
brand palette) so the site looks finished before real photography lands.
Regenerate them any time with:

```bash
node tools/make-placeholders.mjs
```

## Swapping in real photos

1. Drop your photo in this folder using the **same base name** as the
   placeholder it replaces, e.g. `bridal-01.jpg`.
2. In `index.html`, change that one `src` from `.svg` to `.jpg`.

That's it — the CSS crops with `object-fit: cover`, so photos of any aspect
ratio will sit correctly.

## What each slot is for

| File | Where it appears | Shoot it as |
| --- | --- | --- |
| `hero-portrait` | Top of the page, the first thing anyone sees | Tall portrait (3:4). Best single bridal look you have. |
| `story-01` | "The House of Prachi" section | Portrait. Interior of the store, or racks of lehengas. |
| `story-02` | "The House of Prachi", small square | Square. Close-up — jewellery, dupatta detail, embroidery. |
| `col-bridal`, `col-men`, `col-party`, `col-siders`, `col-jewellery` | Floating preview when hovering the collection names | Tall portrait (3:4). One hero look per category. |
| `bridal-01` … `bridal-06` | Lookbook grid | Portrait. |
| `men-01` … `men-04` | Lookbook grid | Portrait. |
| `party-01` … `party-04` | Lookbook grid | Portrait. |
| `siders-01` … `siders-03` | Lookbook grid | Portrait. |
| `jewellery-01` … `jewellery-03` | Lookbook grid | Portrait. |
| `rent-01` | "Rent or Buy" section | Landscape (4:3). |
| `groom-01` | "The Groom's Corner" banner | Wide landscape (16:9). Sherwani / safa / full groom look. |

## Photo tips for a fashion site

- **Shoot vertical.** Most visitors are on a phone; portrait fills the screen.
- **Plain wall behind the outfit.** A clean background makes the clothes the subject.
- Natural light near the shop door beats the ceiling tube-light every time.
- Full-length first, then one detail shot (embroidery, dupatta, jewellery).
- Keep files under ~400 KB each so the site stays fast on mobile data.
