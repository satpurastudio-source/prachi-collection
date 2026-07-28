# Prachi Bridal Hub — website

Marketing site for **Prachi Bridal Hub** (Prachi Collection), Khandwa, M.P.
*Where Royalty Meets Elegance.*

Plain HTML, CSS and JavaScript. **No build step, no framework, no CDN
libraries** — deliberately, so it loads fast on mobile data and can be hosted
anywhere for free.

```
index.html          the whole site — one page
css/style.css       all styling
js/main.js          all behaviour (also holds the lookbook contents)
assets/images/      photography (currently generated placeholders)
assets/favicon.svg  browser tab icon
tools/              placeholder generator
```

## Run it locally

Any static server will do:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly by double-clicking also works.

## Publishing it

Because there's no build step, any static host works. The simplest options:

- **Netlify Drop** — drag this folder onto <https://app.netlify.com/drop>. Live in seconds.
- **GitHub Pages** — push to GitHub, then Settings → Pages → deploy from `main`, folder `/`.
- **Cloudflare Pages** — connect the repo, leave the build command empty.

All three are free at this traffic level. A custom domain (e.g.
`prachibridalhub.com`) can be pointed at any of them.

---

## Editing the site

### The photos

Everything in `assets/images/` is a **placeholder** right now. See
[`assets/images/README.md`](assets/images/README.md) for exactly which photo
goes in which slot, and shooting tips.

Short version: drop `bridal-01.jpg` into `assets/images/`, then change that
one `src` in `index.html` from `.svg` to `.jpg`.

### The lookbook gallery

The gallery is driven by one list at the top of [`js/main.js`](js/main.js) —
look for `const LOOKS`. Each entry is:

```js
{ img: "bridal-01", cat: "bridal", name: "Bridal Lehenga", tag: "Bridal" },
```

- `img` — filename in `assets/images/`, without the extension
- `cat` — one of `bridal`, `men`, `party`, `siders`, `jewellery` (drives the filter buttons)
- `name` / `tag` — the caption shown on hover and in the lightbox

Add or remove entries and the grid, the filters and the lightbox all update
automatically. Nothing else needs changing.

### Opening hours

Set in **two** places, and both must agree:

1. `js/main.js` → `const HOURS` — drives the live "Open now / Closed" badge.
   Times are minutes past midnight (`13 * 60` is 1:00 PM), Sunday is day `0`.
2. `index.html` → the `<table class="hours">` in the Visit section, and the
   `openingHoursSpecification` block in the JSON-LD `<script>` near the top
   (that one is what Google reads).

The badge always reads the clock in **Asia/Kolkata**, so it shows the right
thing even for someone browsing from abroad.

### Phone numbers and address

Search `index.html` for `8989423736` — the numbers appear in the nav, the
mobile menu, the Visit section, the footer, the WhatsApp links and the JSON-LD
block. The address and map link are in the Visit section and the footer.

---

## Notes for whoever maintains this

- **`?shot=1`** — add it to the URL (`index.html?shot=1`) to freeze the page in
  its final state: no loader, no entrance animations, all images loaded. Useful
  for screenshots and for checking layout without waiting for scroll animations.
- **Accessibility** — text contrast was checked against WCAG AA. If you change
  a colour, re-check it; gold on the cream background is the easy trap (it only
  reaches ~2.2:1, which is why section numerals use oxblood on light sections).
- **Reduced motion** — visitors with "reduce motion" enabled get the full site
  with animations disabled. Don't add motion that isn't behind that check.
- **No JavaScript** — the page still renders and reads correctly; only the
  gallery grid, the filters and the live hours badge need JS.
- The placeholder art can be regenerated with `node tools/make-placeholders.mjs`.

## Still to come

- Real photography (the single biggest upgrade available)
- Customer reviews — deliberately left out rather than invented; a testimonials
  section can be added once there are real ones to quote
