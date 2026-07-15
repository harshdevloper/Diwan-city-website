# Diwan Associates — Diwan City, Shamli

A premium marketing site for **Diwan Associates**, built around the *Diwan City* brochure.
Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export of / — verify before deploying
npm start
```

---

## ⚠️ Read this before going live

The site is wired to real brochure facts, but four things are **deliberately unfinished**
because inventing them would have meant publishing something untrue. All of them live in
[`src/data/site.ts`](src/data/site.ts) — search the repo for `PLACEHOLDER`.

| # | What | Where | Why it's blocked on you |
|---|------|-------|--------------------------|
| 1 | **Testimonials are fake** | `testimonials` in `src/data/site.ts` | Written as samples to show the section. They are **not real customers**. Replace with genuine, consented quotes and real names — or delete the `<Testimonials />` line from `src/app/page.tsx`. Publishing invented reviews of a real business is a legal and ethical problem. |
| 2 | **Domain is a guess** | `site.url` in `src/data/site.ts` | Set to `https://diwanassociates.in`. It drives the canonical URL, `sitemap.xml`, Open Graph URLs and all JSON-LD `@id`s. Wrong domain = broken SEO. |
| 3 | **Map has no exact pin** | `mapQuery` in `src/components/LocationMap.tsx` | The brochure gives a description ("Goharni Chauraha se Saharanpur Road ki taraf Karnal Bypass"), not coordinates. The embed currently *searches* for the locality. Once you have the gate's lat/long, swap `q=<lat>,<lng>` and add `geo` to the `ApartmentComplex` block in `src/app/jsonld.tsx`. |
| 4 | **No prices anywhere** | `plotSizes` in `src/data/site.ts` | Intentional — the brochure lists none, and the site drives an "Enquire for price" call instead. If you want rates published, add a field per size band. |

### Image provenance — worth knowing

The villa render on the hero (`hero-villa.jpg`) came out of the brochure, but the **original
embedded file is watermarked by a third-party architecture practice** ("…ape …novations —
Architects·Urban Planners·Engineers") and carries a *"Sachdeva Villa"* nameplate. The brochure
covers both up; the version shipped here is the covered one.

It is very likely a stock/borrowed render rather than a Diwan City building. That's a
**licensing question for you, not a technical one** — please confirm you have the right to use
it commercially, or swap it for your own photography. The same caution applies to the interior
visuals, which are generic stock interiors.

`construction-progress.jpg` is the one image that is unambiguously a genuine photo of the
site — it's used prominently in About and the Gallery for exactly that reason.

---

## Content model

Everything the site says lives in **[`src/data/site.ts`](src/data/site.ts)**. Components read
from it; nothing is hardcoded in JSX. Edit that one file and the page, the JSON-LD and the
sitemap all stay in sync.

- `plotSizes` — transcribed from the approved layout plan (brochure p.2). Figures are in **gaj**
  (square yards; 1 gaj = 9 sq ft). `count` = how many plots on the plan carry that area.
- `amenities` — all 12 facilities from *कॉलोनी की सुविधाऐं* (brochure p.4), English + Hindi.
- `floorPlan` — the 2 BHK unit schedule (brochure p.3).
- `faqs` — answered from the brochure; the pricing and registry answers reflect the brochure's
  own note that **बैनामा (registry) expenses are borne by the buyer**.

## Where the images came from

Extracted from `PDF.pdf` and written to `public/images/`:

| File | Source | Notes |
|---|---|---|
| `hero-villa.jpg` | p.4 render | See provenance warning above |
| `gate-entrance.jpg` | p.1 render | Brochure artwork; carries the DC logo + APPROVED stamp |
| `construction-progress.jpg` | p.3 photo | **Genuine site photo**, native resolution |
| `floor-plan.jpg` | p.3 | 2 BHK plan |
| `layout-plan.jpg` | p.2 | Approved layout, vector-sharp |
| `interior-*.jpg` | p.3 insets | Small native crops — gallery tiles only |
| `logo.png` | p.1 | The DC mark |
| `og-image.jpg` | derived | 1200×630 social card |

The brochure's embedded images are low-resolution originals (the villa render is only
1113×727 natively), so these are delivered at honest sizes rather than upscaled to look big.

The favicon (`src/app/icon.png`) is a **drawn** gold-house mark, not the brochure logo — the
real logo has a baked-in grey box and turns to mush at 16px. The actual logo still appears in
the navbar and footer.

## Contact form

The form does **not** post to a server. It validates, then hands the enquiry to WhatsApp with
the message pre-filled, so leads land on the sales phone with no backend to babysit and nothing
lost to a silently failing endpoint. If you later want leads in a CRM, add a server action in
`src/components/Contact.tsx` that persists the lead *before* opening WhatsApp — don't replace
the handoff.

## SEO

- Server-rendered HTML (all copy is crawlable — verified in the built output).
- `metadata` in `src/app/layout.tsx`: canonical, Open Graph, Twitter card, geo hints.
- JSON-LD in `src/app/jsonld.tsx`: `RealEstateAgent`, `WebSite`, `ApartmentComplex` (with
  `amenityFeature` per facility) and `FAQPage`. Generated from `site.ts`, so it can't drift.
- `sitemap.xml` + `robots.txt` generated by `src/app/sitemap.ts` / `robots.ts`.
- Reveals are `opacity:0` until animated; a `<noscript>` block forces them visible so a JS
  failure can't blank the page.

## Accessibility

Skip link, focus-visible rings, `aria-expanded`/`aria-controls` on the nav and FAQ, labelled
form fields with `aria-invalid` + `aria-describedby` errors, keyboard-navigable lightbox
(Esc / ← / →), body-scroll locking on modals, and full `prefers-reduced-motion` support —
every parallax and reveal degrades to a plain fade.
