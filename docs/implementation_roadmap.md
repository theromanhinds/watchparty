# FindWatchParty — Implementation Roadmap

**Goal:** Site legit enough to drive traffic, collect venue signups, and sell featured listings before World Cup 2026 (June 11).
**Stack:** Next.js 15 App Router · Tailwind v3 · Netlify · Sanity (Phase 2) · Stripe Payment Links · Netlify Forms + Make

**Design reference:** See `docs/style_guide.md` for all colors, typography, spacing, components, and layout specs.

**Platform priority:** Mobile-first. Every component is designed for 375px phones first, then scales up. No map widget (link out to Google Maps instead).

---

## Phase 1 — Launch-Ready (target: before June 11)

Everything in this phase must be done before sending the site to anyone.

---

### 1.0 Site Scope Consolidation

**Goal:** Collapse the site from "all sports / all cities" to "World Cup + NYC/NJ only." Do not delete routes — just redirect and filter so expansion is easy later.

**Nav changes:**
- Remove `Cities` and `Sports` links from Header entirely
- New nav: Logo left · `[List Your Venue]` button right (secondary outlined pill button)
- No hamburger menu needed yet — two items fit on mobile

**Route redirects** — add these to `next.config.js`:
```js
async redirects() {
  return [
    { source: '/cities', destination: '/cities/new-york', permanent: false },
    { source: '/events', destination: '/events/fifa-world-cup-2026', permanent: false },
    { source: '/sports', destination: '/venues', permanent: false },
    { source: '/sports/:slug', destination: '/venues', permanent: false },
  ];
},
```

**Data filtering:**
- `cities.ts` — keep only NYC/NJ entries for now
- `events.ts` — keep only the FIFA World Cup 2026 event
- `sports.ts` — keep only soccer; this file may become unused in Phase 1

**Footer:**
Add a small line: "Expanding to LA, Dallas, Miami + more cities for World Cup 2026 →" (no link, just text). Signals the broader vision without needing empty pages.

---

### 1.1 Import Real Venue Data (JSON)

**Goal:** Replace the 6 placeholder venues with 161 real NYC/NJ venues from the CSV.

**Source file:** `../watchpartydata/venues_enriched.csv` (relative to the watchparty project root — go up one directory)

**Write a conversion script** (`scripts/csv_to_venues_ts.py` or `.js`) that:
1. Reads `venues_enriched.csv`
2. Maps columns to the `Venue` interface in `src/types/index.ts`:

| CSV column | Venue field | Notes |
|---|---|---|
| `venue_name` | `name` | Also generate `slug` via kebab-case, strip special chars |
| `address` | `address` | |
| `borough_or_city` | `city` | Display name |
| `borough_or_city` (normalized) | `citySlug` | `new-york` for all NYC boroughs, `new-jersey` for NJ |
| `neighborhood` | — | Store in `description` prefix or add `neighborhood` field to type |
| `website` | `website` | Many blank — leave as `undefined`, do not set empty string |
| `fanbases` | `fanbases[]` | Comma-split the CSV value |
| `cover_charge_type` | `coverCharge` | Map: `free`→`free`, `ticketed`→`ticketed`, `unknown`→`varies` |
| `cover_charge_amount` | `coverChargeAmount` | Only set if not blank |
| `reservation_required` | `reservationRequired` | `true`/`false` boolean |
| `booking_url` | `bookingUrl` | Only set if not blank |
| `is_outdoor` | `outdoorScreen` | boolean |
| `world_cup_event_confirmed` | `eventSlugs` | If `yes` or `inferred` → `['fifa-world-cup-2026']`, else `[]` |

**Safe defaults for fields with no CSV source:**
```
id: 'venue-{padded-index}'  (e.g. 'venue-001')
state: 'New York'  (or 'New Jersey' if NJ)
stateCode: 'NY' (or 'NJ')
zip: ''
soundOn: true
drinkSpecials: false
familyFriendly: false
verifiedWatchParty: false
featured: false
sports: ['soccer']
rating: undefined
phone: undefined
imageUrl: undefined
```

3. Output to `src/data/venues.ts` as `export const VENUES: Venue[] = [...]`

**Also update `cities.ts`** to include NYC and NJ entries with slugs `new-york` and `new-jersey` so venue city links don't 404.

**Validation:** `npm run build` must pass TypeScript clean. Check `/venues` shows full list.

**Note on data quality:** 92/161 venues are missing `website`. That's fine — venue detail pages still render, the "Visit Website" button just doesn't appear. Don't block on this.

---

### 1.2 Full UI Redesign (Airbnb Design Language)

**Reference:** `docs/style_guide.md` — read this fully before touching any component.

**Philosophy:** We borrow Airbnb's visual DNA (white canvas, one accent color, rounded-everything, photo-first cards, clean type) and apply it to a directory structure — not their booking/search UX flow.

**Do not copy Airbnb's layout.** FindWatchParty is a directory. Pages and navigation are purpose-built for venue discovery, not accommodation booking.

---

#### 1.2.1 Global Styles

In `src/index.css`:
- Set `body` background to `#F7F7F7` (page bg)
- Remove any global dark color overrides

In `tailwind.config.js`:
- Add custom shadow tokens: `shadow-card`, `shadow-card-hover`, `shadow-nav` (values in style guide)
- Deprecate `brand-*` colors — replace with Tailwind `sky-*` where needed

---

#### 1.2.2 Header / Navigation

Replace existing `Header.tsx` with:
- `sticky top-0 z-50 bg-white shadow-nav`
- Left: Logo ("⚽ FindWatchParty" or SVG) in `font-bold text-gray-900`
- Right: Single "List Your Venue" button — secondary outlined pill (`rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700`)
- Remove all nav links (Cities, Events, Sports, About, FAQ)
- Keep About/FAQ accessible from Footer only

---

#### 1.2.3 Homepage (`src/views/HomePage.tsx`)

Rebuild from scratch. Structure:

```
1. Hero section — white background (no gradient)
2. Filter pills — horizontal scroll
3. Venue grid — top 12 venues, featured first
4. CTA banner — list/feature your venue
```

**Hero section:**
- `bg-white py-12 px-4 text-center`
- Eyebrow (small gray): "FIFA World Cup 2026 · New York & New Jersey"
- H1: "Find your World Cup watch party in NYC" — `text-3xl font-bold text-gray-900`
- Subline: "161 venues across New York and New Jersey" — `text-sm text-gray-500 mt-2`
- Search bar below — `bg-white rounded-full shadow-card border border-gray-200 flex items-center px-4 py-3 mt-6 mx-auto max-w-md`
- Input takes full width; sky-500 circle search button on right

**Filter pills (immediately below hero, sticky on scroll):**
- `sticky top-[57px] z-40 bg-white border-b border-gray-100 px-4 py-3`
- `flex gap-2 overflow-x-auto scrollbar-hide`
- Pills: All · Fan Zones · Sports Bars · Free Entry · Sound On · Outdoor · Family Friendly
- Selected state: `bg-gray-900 text-white`, unselected: `bg-white border border-gray-200 text-gray-700`
- Each pill click filters the venue grid below

**Venue grid:**
- `grid grid-cols-2 gap-4 px-4 py-6` (mobile: 2 col)
- `sm:grid-cols-3` (tablet+)
- Show top 12 venues only; "Show all 161 venues →" link below

**CTA banner:**
- `bg-sky-50 mx-4 rounded-2xl px-6 py-8 text-center mt-4`
- Heading: "Own a watch party venue?"
- Subline: "Get a free listing or go featured for $99 for the full World Cup tournament"
- Two buttons side by side: [List Free] (secondary) · [Get Featured — $99] (primary sky)

---

#### 1.2.4 Venue Card (`src/components/venue/VenueCard.tsx`)

Rebuild the card component:

```
<article class="rounded-2xl bg-white shadow-card overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer">

  <!-- Photo area -->
  <div class="aspect-video w-full bg-gradient-to-br [neighborhood gradient]">
    <!-- Featured badge overlay -->
    {featured && <span class="absolute top-2 left-2 bg-amber-400 text-white text-xs font-semibold px-2 py-1 rounded-full">⭐ Featured</span>}
    <!-- Verified badge overlay -->
    {verifiedWatchParty && <span class="absolute top-2 right-2 bg-white text-emerald-600 text-xs font-semibold px-2 py-1 rounded-full border border-emerald-200">✓ Verified</span>}
  </div>

  <!-- Content -->
  <div class="px-3 py-3">
    <p class="text-xs text-gray-500">{neighborhood} · {borough}</p>
    <p class="text-sm font-semibold text-gray-900 mt-0.5 truncate">{venueName}</p>
    <p class="text-xs text-gray-500 mt-1">{coverChargeLabel} · {soundOn ? '🔊 Sound on' : '🔇 Silent'}</p>
  </div>

</article>
```

**Gradient mapping by borough/type** (in a helper function):
```ts
function getVenueGradient(venue: Venue): string {
  if (venue.eventSlugs.includes('fan-zone')) return 'from-amber-500 to-orange-700';
  switch (venue.citySlug) {
    case 'new-york':
      // use neighborhood to pick
      if (venue.city === 'Brooklyn') return 'from-emerald-600 to-teal-900';
      if (venue.city === 'Queens')   return 'from-purple-600 to-indigo-900';
      if (venue.city === 'Bronx')    return 'from-orange-600 to-red-900';
      return 'from-sky-600 to-sky-900'; // Manhattan / default NYC
    case 'new-jersey': return 'from-rose-600 to-pink-900';
    default: return 'from-slate-500 to-slate-800';
  }
}
```

---

#### 1.2.5 Venues Page (`src/views/VenuesPage.tsx`)

No sidebar. Filters live in the pill strip — same component as homepage. Mobile-first grid.

```
1. Page header: "Watch Party Venues in NYC" (h1 text-2xl font-bold) + result count gray
2. Filter pills (sticky) — same component as homepage pills
3. Venue grid: grid-cols-2 gap-4 (mobile) → sm:grid-cols-3 → lg:grid-cols-4
4. Empty state if no results
```

Remove the sidebar `VenueFilters` component from this page on mobile. On desktop (lg+) you may optionally keep a slim filter sidebar, but it should be secondary to the pills.

Sort order: Featured first, then alphabetical by name.

---

#### 1.2.6 Venue Detail Page (`src/views/VenueDetailPage.tsx`)

Mobile-first single column layout:

```
1. Full-width gradient image (no border radius — bleeds edge to edge on mobile)
   height: 56vw (aspect-video equivalent), max-height 320px on desktop
   
2. Scrollable content area (white bg, rounded-t-2xl, -mt-4 to overlap image slightly):
   - Neighborhood · Borough (text-xs text-gray-500)
   - Venue name (text-2xl font-bold text-gray-900)
   - Rating row (if rating exists)
   - Horizontal divider
   - Detail rows with icons (cover charge, sound, reservation, outdoor)
   - "Visit Website ↗" row (if website exists — links out, no map widget)
   - "Get Directions ↗" row (links to Google Maps URL for the address)
   - Horizontal divider
   - Fanbases section (flag chips)
   - Matches section (World Cup match dates if available)
   - "Is this your venue?" link (small, gray, text-xs)

3. Sticky bottom bar (fixed bottom-0):
   - Left: "Get Directions" — secondary outlined pill button
   - Right: "Book a Spot" — primary sky pill button (only if bookingUrl exists)
   - If no bookingUrl: right button = "Claim this listing" (secondary)
```

**Google Maps link** — generate from address:
```ts
const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${venue.name} ${venue.address} ${venue.city}`)}`;
```

No embedded map widget. Just a link.

---

#### 1.2.7 Remove Dead Code

- Delete `src/pages/` folder entirely — this is a leftover React Router duplicate of `src/views/`. Unused.
- Remove `SEOHead` component from all views (after `generateMetadata` is wired in 1.3)
- Remove `SEOHead.tsx` file from `src/components/shared/`

---

### 1.3 Fix Server-Side SEO (`generateMetadata`)

**Goal:** Google must see page-specific titles, descriptions, and canonical URLs in the HTML — not via JavaScript. Currently broken because all views are `'use client'`.

**Pattern for each `app/*/page.tsx`:**

The `app/` route files should NOT be `'use client'`. They export `generateMetadata` (server-side) and render the view component (which can be client-side).

```typescript
// app/venues/[slug]/page.tsx
import type { Metadata } from 'next';
import { VenueDetailPage } from '@/views/VenueDetailPage';
import { VENUES } from '@/data/venues';

type Props = { params: Promise<{ slug: string }> }; // Next.js 15: params is a Promise

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = VENUES.find((v) => v.slug === slug);
  if (!venue) return { title: 'Venue Not Found' };
  return {
    title: `${venue.name} — World Cup Watch Parties in ${venue.city} | FindWatchParty`,
    description: `Watch World Cup 2026 at ${venue.name} in ${venue.city}. ${venue.coverCharge === 'free' ? 'Free entry.' : ''} ${venue.reservationRequired ? 'Reservation required.' : ''}`.trim(),
    alternates: { canonical: `https://findwatchparty.com/venues/${venue.slug}` },
    openGraph: {
      title: `${venue.name} — Watch Party Venue`,
      description: `World Cup watch parties in ${venue.city}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <VenueDetailPage slug={slug} />;
}
```

**Important:** In Next.js 15, `params` is now a `Promise` — always `await params` before accessing properties.

**Pages to update (priority order):**
1. `app/venues/[slug]/page.tsx` — highest SEO value
2. `app/cities/[slug]/page.tsx` — "Watch parties in Brooklyn"
3. `app/events/[slug]/page.tsx` — "World Cup watch parties NYC"
4. `app/venues/page.tsx`
5. `app/cities/page.tsx`
6. `app/events/page.tsx`

**Pass slug/params to view components** — `VenueDetailPage` currently reads `useParams()` internally. After this change, pass `slug` as a prop instead so the component stays client-usable without needing params access at the top level.

---

### 1.4 Dynamic Sitemap

Create `src/app/sitemap.ts` (Next.js auto-serves this at `/sitemap.xml`):

```typescript
import type { MetadataRoute } from 'next';
import { VENUES } from '@/data/venues';
import { CITIES } from '@/data/cities';
import { EVENTS } from '@/data/events';

const BASE = 'https://findwatchparty.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/venues', '/about', '/faq', '/submit'].map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8,
  }));

  const venueRoutes = VENUES.map((v) => ({
    url: `${BASE}/venues/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const cityRoutes = CITIES.map((c) => ({
    url: `${BASE}/cities/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const eventRoutes = EVENTS.map((e) => ({
    url: `${BASE}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...venueRoutes, ...cityRoutes, ...eventRoutes];
}
```

Delete `public/sitemap.xml` after this is in place. Submit `/sitemap.xml` to Google Search Console.

---

### 1.5 Wire Submit Form — Netlify Forms + Make

**Goal:** Venue submissions email Roman and land in a Google Sheet.

**Step 1 — Netlify Forms:**
In `src/views/SubmitPage.tsx`, update the `<form>` tag:
```html
<form
  name="venue-submission"
  method="POST"
  data-netlify="true"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="venue-submission" />
  <!-- existing fields unchanged -->
</form>
```
Netlify detects `data-netlify="true"` at build time and intercepts all submissions.

**Step 2 — Make automation:**
1. Create a Make scenario
2. Trigger: Netlify webhook on new form submission (or "Watch Netlify form submissions")
3. Action 1: Google Sheets → "Add a Row" to the submissions sheet
   - Columns: `venue_name, address, city, phone, website, contact_name, contact_email, notes, submitted_at, status`
   - `status` starts blank (pending review)
4. Action 2: Email → send to roman.hinds17@gmail.com with all field values

**Step 3 — Update success state:**
Keep the existing component-swap success message. Optionally change copy to: "We'll review your listing and reach out within 24 hours. Want more visibility? [Get Featured — $99 →]" — turn the success screen into a soft upsell.

---

### 1.6 Claim Listing Flow (MVP)

**Goal:** Venue owners who find their listing can flag it as theirs.

**On each VenueCard** — small link at bottom of content area:
```
<Link href={`/submit?claim=true&venue=${venue.slug}`} class="text-xs text-gray-400 hover:text-gray-600 mt-2 block">
  Is this your venue? Claim it free →
</Link>
```

**On SubmitPage** — detect `?claim=true&venue=slug` in URL params:
- If present, show a "Claim Your Listing" form variant instead of the "Add New Venue" form
- Pre-fill venue name if slug resolves to a known venue
- Collect: your name, role (Owner / Manager / Events Coordinator), email, phone, "What would you like to update?" textarea
- Wire to a second Netlify form: `name="venue-claim"`
- Same Make automation → separate tab in the Google Sheet

---

### 1.7 Featured Listing CTAs (Stripe Payment Link)

**Pre-requisite:** Roman creates the Stripe Payment Link in the Stripe dashboard before this step.
- Product: "Featured Listing — World Cup 2026", $99 one-time
- Custom fields on checkout: Venue Name (required), Venue City (required), Contact Email (required)
- Copy the resulting `https://buy.stripe.com/xxxxx` URL

**Add CTAs in three places:**

1. **SubmitPage** — after the free submit form, add a "Want more visibility?" section:
```
⭐ Get Featured — $99 for the full World Cup
Top placement · Featured badge · Homepage spotlight
[Upgrade to Featured →]  ← links to Stripe Payment Link, target="_blank"
```

2. **VenueDetailPage** sidebar/bottom — below venue details, before the claim link:
```
[Get more visibility — $99 →]
```
(small, secondary outlined pill)

3. **VenuesPage** — a slim banner above the grid:
```
Own this venue? [List free] · [Go Featured for $99]
```

---

## Phase 2 — CMS + Quality (week 2)

---

### 2.1 Sanity Setup

```bash
cd watchparty
npm install next-sanity @sanity/image-url
npx sanity@latest init --env
```

Studio runs at `app/studio/[[...tool]]/page.tsx`. Accessible at `/studio` in dev and on the live domain.

**Schema documents:**
- `venue` — all Venue interface fields + `isVerified`, `isFeatured`, `claimedByEmail`, `neighborhoodGradient`
- `city` — City interface
- `event` — SportingEvent interface
- `siteConfig` (singleton) — spotlight event, announcement bar text

**Import:** Write a script that reads `src/data/venues.ts` and pushes all venues to Sanity via `@sanity/client`. Set `isPublished: true` on all. Mark `isFeatured: false`, `isVerified: false` on all initially.

**Connect Next.js:** Replace `import { VENUES } from '@/data/venues'` with GROQ queries via `next-sanity`. Add `export const revalidate = 3600` to detail pages.

**Webhook revalidation:**
- Sanity: Settings → API → Webhooks → `https://findwatchparty.com/api/revalidate?secret=YOUR_SECRET`
- Create `app/api/revalidate/route.ts` that calls `revalidatePath()`

---

### 2.2 Claim Approval in Sanity

When a venue claim comes in (Netlify Form → Google Sheet):
1. Roman reviews the claim in the Google Sheet
2. Opens venue document in Sanity Studio
3. Sets `isVerified: true`, adds `claimedByEmail`
4. Optionally updates any fields the owner requested
5. Saves → webhook → page revalidates → ✓ Verified badge appears on the card

No custom UI needed. This is pure Sanity Studio workflow.

---

### 2.3 Featured Upgrade Fulfillment

When Stripe payment comes in:
1. Stripe sends payment confirmation email to Roman
2. Roman finds the venue in Sanity Studio (search by name)
3. Sets `isFeatured: true`
4. Venue card immediately gets amber Featured badge and sorts to top of city results

---

### 2.4 World Cup Schedule Page

High SEO value: "World Cup 2026 schedule" / "what World Cup games are today"

Create `app/schedule/page.tsx`:
- H1: "FIFA World Cup 2026 — Full Match Schedule"
- List all 64 matches: date, time (ET), teams, host city
- Each match links to city page: "Find watch parties in NYC for this match →"
- JSON-LD `SportsEvent` schema per match
- This page can independently rank for team-specific queries ("USA vs England NYC watch party")

Match data: hardcode from the official FIFA schedule (public info).

---

## Phase 3 — Scale (post-tournament)

- Expand to LA, Dallas, Miami, Houston, Philadelphia, Seattle, Boston, Kansas City, SF, Atlanta
- Automate venue enrichment: Crawl4AI → scrape venue websites → fill cover charge, capacity, fanbase
- Tiered pricing: $49 city-level / $99 featured / $199 premier
- Recurring SaaS: $19–49/mo featured placement post-tournament
- Affiliate links: Resy/OpenTable booking for venues with reservation requirements
- Google Places API enrichment pass for missing websites and phone numbers

---

## Pre-Launch Checklist (things Roman must do before the coding agent can finish)

- [ ] **Create Stripe Payment Link** — $99 product, custom fields for venue name + city + email
- [ ] **Create Google Sheet** — "Venue Submissions" tab + "Venue Claims" tab, columns: `venue_name, address, city, phone, website, contact_name, contact_email, notes, submitted_at, status`
- [ ] **Set up Make account** — connect Netlify + Google Sheets + Email
- [ ] **Verify Netlify domain** — confirm `findwatchparty.com` DNS points to Netlify
- [ ] **Google Search Console** — submit `/sitemap.xml` after Phase 1 deploys
- [ ] **Sign up for Sanity** — sanity.io account before Phase 2 begins
