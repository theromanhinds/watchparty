# FindWatchParty — Feature Implementation Guide
**For handoff to coding agent | Last updated: June 2026**

---

## Stack

- **Next.js App Router** + TypeScript (strict)
- Tailwind CSS v3 (`brand` = sky blue `sky-*`, `accent` = amber `amber-*`)
- Lucide React for icons
- Static data in `src/data/` (no backend)
- Path alias: `@/` → `src/`
- Dev: `npm run dev` from the repo root

---

## Overview — Four feature areas, in priority order

1. **Neighborhood filtering** — data work DONE, needs wiring into UI
2. **Image optimization** — critical for load performance, do alongside #1
3. **Match schedule pages** — SEO play, medium effort
4. **Featured listing tiers** — monetization, tied to #1 and #3

---

## Feature 1: Neighborhood Filtering

### Status
**Data is done.** The file `watchpartydata/venues_with_neighborhoods.csv` (sibling directory to this repo) contains all 161 venues with a `neighborhood` column already populated (160/161 resolved; "The Joyce Public House" is the one `unknown` — no confirmed address). Import from that file, not from `venues_enriched.csv`.

### Step 1 — Add neighborhood to the Venue type

In `src/types/index.ts`, add:

```ts
neighborhood?: string; // e.g. "Astoria", "Williamsburg", "Downtown Hoboken"
```

Make it optional (`?`) so the one unknown venue doesn't break the type.

### Step 2 — Import neighborhood data

Update `src/data/venues.ts` to include the `neighborhood` value for each venue, sourced from `venues_with_neighborhoods.csv`. This is a copy-paste/import task — the column is already clean.

The neighborhood taxonomy in the data uses these values:

**Manhattan:** Midtown, Hell's Kitchen, Upper West Side, Upper East Side, Lower East Side, Greenwich Village, Chelsea, East Village, Harlem, Financial District, Tribeca, SoHo, Flatiron, Murray Hill, Gramercy, Washington Heights, Morningside Heights, Meatpacking District, Inwood

**Brooklyn:** Williamsburg, Park Slope, Bushwick, Bay Ridge, Crown Heights, DUMBO, Cobble Hill, Sunset Park, Greenpoint, Flatbush, Bed-Stuy, Carroll Gardens, Red Hook, Borough Park, Bensonhurst, Coney Island, Clinton Hill

**Queens:** Astoria, Jackson Heights, Long Island City, Flushing, Forest Hills, Ridgewood, Sunnyside, Woodside, Jamaica, Corona, Elmhurst, Rego Park, Glendale

**Bronx:** South Bronx, Fordham, Riverdale, Mott Haven, Pelham Bay

**Staten Island:** St. George, Stapleton

**New Jersey:** Downtown Hoboken, Uptown Hoboken, Waterfront Hoboken, Jersey City, Ironbound (Newark), Montclair, Harrison, Kearny, Secaucus, Bayonne, Paramus

### Step 3 — Add neighborhood to filter state

In `src/hooks/useVenues.ts`, add `neighborhood` to the filter interface and filtering logic alongside the existing filters (`soundOn`, `coverCharge`, `outdoorScreen`, `familyFriendly`).

```ts
// In filter interface
neighborhood?: string;

// In filter logic
if (filters.neighborhood) {
  venues = venues.filter(v => v.neighborhood === filters.neighborhood);
}
```

### Step 4 — Add neighborhood UI filter

In the search/filter component (`src/components/venue/VenueFilters.tsx`), add a neighborhood dropdown. Suggested UX:
- Group neighborhoods by borough using optgroup/section headers
- Single-select (not multi) to keep it simple
- Clear button resets to "All neighborhoods"
- On mobile, a full-width select or bottom sheet works better than a floating dropdown

### Step 5 — Persist in URL params

Add `neighborhood` to the URL query string (`?neighborhood=Astoria`) so filtered links are shareable and SEO-indexable. The existing filter pills/URL logic should be the pattern to follow.

### Step 6 — Display neighborhood on venue cards and detail pages

`VenueCard.tsx` line 57 and `VenueDetailPage.tsx` line 117 already render `venue.neighborhood` if it exists — this will work automatically once the data is populated. No UI changes needed here.

---

## Feature 2: Image Optimization

### Problem
There are 136 JPEGs in `/public/venue-photos/` totaling **77MB**. Several are 1–2MB raw files (e.g. `8th_street_tavern.jpg` is 1.9MB). The app uses plain `<img>` tags — no Next.js Image optimization, no WebP conversion, no responsive sizing. On mobile, venue cards are loading full-resolution JPEGs for thumbnail-sized images.

`next.config.js` currently has no `images` block at all.

### Step 1 — Compress existing photos to WebP

Run this script once from the repo root before making code changes:

```python
# compress_photos.py  (run once: python compress_photos.py)
from PIL import Image
import os

folder = "public/venue-photos"
for fname in os.listdir(folder):
    if fname.lower().endswith(".jpg") or fname.lower().endswith(".jpeg"):
        src = os.path.join(folder, fname)
        dst = os.path.join(folder, os.path.splitext(fname)[0] + ".webp")
        img = Image.open(src)
        img.save(dst, "WEBP", quality=82, optimize=True)
        old_size = os.path.getsize(src)
        new_size = os.path.getsize(dst)
        print(f"{fname}: {old_size//1024}KB → {new_size//1024}KB")
```

After running, update all `imageUrl` values in `src/data/venues.ts` to use `.webp` extensions instead of `.jpg`. Keep the original JPEGs in place until you've confirmed everything works.

### Step 2 — Add image config to next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/venue-photos/**' }],
  },
  async redirects() {
    return [
      { source: '/cities', destination: '/cities/new-york', permanent: false },
      { source: '/events', destination: '/events/fifa-world-cup-2026', permanent: false },
      { source: '/sports', destination: '/venues', permanent: false },
      { source: '/sports/:slug', destination: '/venues', permanent: false },
    ];
  },
};

module.exports = nextConfig;
```

### Step 3 — Replace `<img>` with Next.js `<Image>` in VenueCard

In `src/components/venue/VenueCard.tsx` lines 31–38, replace the bare `<img>` with:

```tsx
import Image from 'next/image';

// Replace this:
<img
  src={venue.imageUrl}
  alt={venue.name}
  className="absolute inset-0 h-full w-full object-cover"
  loading="lazy"
/>

// With this:
<Image
  src={venue.imageUrl}
  alt={venue.name}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
/>
```

The parent `<div>` already has `relative overflow-hidden` so `fill` mode will work correctly.

### Step 4 — Replace `<img>` with Next.js `<Image>` in VenueDetailPage

In `src/views/VenueDetailPage.tsx` lines 93–98, replace the hero `<img>`:

```tsx
import Image from 'next/image';

// Replace:
<img
  src={venue.imageUrl}
  alt={venue.name}
  className="absolute inset-0 h-full w-full object-cover"
/>

// With:
<Image
  src={venue.imageUrl}
  alt={venue.name}
  fill
  priority          // hero image — load eagerly, not lazy
  className="object-cover"
  sizes="100vw"
/>
```

Note `priority` on the detail page hero — it's above the fold so it should load eagerly, not lazy. Next.js `<Image>` lazy-loads by default; `priority` overrides that.

### Expected impact
Venue card images should drop from 1–2MB JPEGs to 30–80KB WebP thumbnails on mobile. The gradient fallback (CSS only, zero network requests) already works well for venues without photos — don't change that.

---

## Feature 3: Match Schedule Pages

### Goal
High-traffic SEO targets. "Where to watch USA vs England World Cup NYC" should land on a page showing match details + all NYC/NJ venues.

**Do NOT build venue-to-match cross-referencing yet** — that data doesn't exist. Match pages list all venues with a note that most venues show all matches.

### Pages to build

#### `/matches` — Match Schedule Index
- Lists all 64 World Cup 2026 matches as cards
- Each card: teams, date, time (ET), group/round, MetLife indicator if applicable
- Links to `/matches/[match-slug]`
- `<title>`: `World Cup 2026 Match Schedule | Watch Parties in NYC & NJ`
- Target keyword: "World Cup 2026 schedule"

#### `/matches/[match-slug]` — Individual Match Page
- Match details at top: teams, date/time, stadium, round
- Below: full venue directory (same component as the main venues list)
- `<title>`: `{Team A} vs {Team B} Watch Party NYC | World Cup 2026`
- Example slug: `usa-vs-england-june-22`

### Match data

Create `src/data/matches.ts` with this interface:

```ts
export interface Match {
  id: string;
  slug: string;           // "usa-vs-england-june-22"
  team1: string;          // "United States"
  team2: string;          // "England"
  date: string;           // "2026-06-22"
  timeET: string;         // "3:00 PM ET"
  group: string;          // "Group C" | "Round of 16" | "Quarterfinal" | "Semifinal" | "Final"
  stadium: string;        // "MetLife Stadium, East Rutherford, NJ"
  isLocalMatch: boolean;  // true for MetLife Stadium matches
}
```

Populate with the full 64-match FIFA World Cup 2026 schedule (publicly available). Mark `isLocalMatch: true` for MetLife Stadium matches — there are several group stage games plus potentially knockout rounds there.

### SEO requirements

- Pages must be server-rendered or statically generated (Next.js App Router default is RSC — this is fine)
- Each page needs unique `<title>` and `<meta name="description">` via `generateMetadata()`
- Add JSON-LD Event schema to each individual match page
- Internal links: match index → individual match pages; venue detail pages → link back to any upcoming match pages

---

## Feature 4: Featured Listing Tiers

### Goal
Revenue. Venue owners pay for premium placement. Three tiers tied to the filtering structure.

### Tier structure

| Tier | Price | Placement |
|------|-------|-----------|
| **City Featured** | $49 | Highlighted card + badge anywhere in NYC/NJ results |
| **Neighborhood Featured** | $99 | Top slot when neighborhood filter is active (1 per neighborhood) |
| **Match Featured** | $199 | Top slot on a specific match page (1 per match × 64 matches) |

### Data changes in `src/types/index.ts`

The `Venue` type already has a `featured` boolean. Extend it:

```ts
featuredTier?: 'city' | 'neighborhood' | 'match'; // undefined = not featured
featuredNeighborhood?: string;    // set when featuredTier = 'neighborhood'
featuredMatchSlugs?: string[];    // set when featuredTier = 'match'
```

Keep the existing `featured: boolean` field as a convenience shorthand (`featured = featuredTier !== undefined`). Update it wherever it's set.

### Sort logic in `src/hooks/useVenues.ts`

Update the sort so featured venues float to top:
1. Match-featured (if on a match page and the venue is featured for that match)
2. Neighborhood-featured (if neighborhood filter is active and venue is featured for that neighborhood)
3. City-featured (always)
4. All other venues (existing sort logic)

### UI changes

- `VenueCard.tsx` already renders a "⭐ Featured" badge when `venue.featured` is true — this will work automatically once the data is set
- On neighborhood-filtered results: change the badge label to `Top Pick in [Neighborhood]` for the neighborhood-tier venue
- On match pages: show `Top Pick for This Match` for the match-tier venue
- Add a "Get featured →" CTA link at the bottom of the venue results list pointing to the Stripe Payment Link for featured listings

### Payment flow

No payment integration needed yet. Use Stripe Payment Links (already referenced in `src/lib/constants.ts` as `STRIPE_FEATURED_URL`). After payment, manually update `featuredTier` in `src/data/venues.ts`.

---

## Venue Claiming Flow

### Status
A `/submit` page already exists (see `src/app/submit/page.tsx` and `src/views/SubmitPage.tsx`). The "Claim this listing" link on `VenueDetailPage.tsx` line 219 already links to `/submit?claim=true&venue={slug}`.

### What to verify/complete

1. Confirm the submit form captures: venue slug (from URL param), owner name, email, phone, and what they want to update
2. Confirm form submissions are going somewhere (email notification via Netlify Forms, Typeform, or similar)
3. Add "Interest in featured listing" checkbox to the form if not already present

Do not build a venue dashboard — manual CSV updates are sufficient until there's volume.

---

## Implementation Order

| # | Task | Status | Est. |
|---|------|--------|------|
| 1 | Import neighborhood data from `venues_with_neighborhoods.csv` into `venues.ts` | Ready to do | 2 hr |
| 2 | Add `neighborhood` to Venue type + `useVenues` filter + URL param | — | 2 hr |
| 3 | Neighborhood dropdown UI in VenueFilters | — | 2 hr |
| 4 | Compress photos to WebP (`compress_photos.py`) + update `imageUrl` extensions | — | 1 hr |
| 5 | Add `images` block to `next.config.js` | — | 15 min |
| 6 | Replace `<img>` with `<Image>` in VenueCard + VenueDetailPage | — | 1 hr |
| 7 | Create `src/data/matches.ts` with full match schedule | — | 3 hr |
| 8 | Build `/matches` index page | — | 2 hr |
| 9 | Build `/matches/[slug]` individual match pages | — | 2 hr |
| 10 | Featured tier data fields + sort logic | — | 2 hr |
| 11 | Featured badge label updates + "Get featured" CTA | — | 1 hr |
| 12 | Verify `/submit` claim form is wired up correctly | — | 30 min |

**Total estimate: ~19 hours.**
Items 1–6 are highest priority before June 11 (tournament start). Items 7–9 can ship mid-tournament and still capture SEO during the 39-day window.
