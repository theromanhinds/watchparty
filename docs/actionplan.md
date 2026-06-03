# FindWatchParty — Action Plan

## Overview

Rebuilding on Next.js + Sanity to fix SEO fundamentals, enable content management without code changes, and scale venue/event data through web scraping.

---

## Phase 1 — Next.js Migration

### 1.1 Scaffold the New Project

```bash
npx create-next-app@latest findwatchparty --typescript --tailwind --app --src-dir --import-alias "@/*"
cd findwatchparty
```

Keep Vercel as the target host. ISR (Incremental Static Regeneration) works best there.

### 1.2 Rebuild Route Structure

Map current Vite routes → Next.js App Router file structure:

| Current Route | Next.js File |
|---------------|-------------|
| `/` | `app/page.tsx` |
| `/venues` | `app/venues/page.tsx` |
| `/venues/:slug` | `app/venues/[slug]/page.tsx` |
| `/events` | `app/events/page.tsx` |
| `/events/:slug` | `app/events/[slug]/page.tsx` |
| `/cities` | `app/cities/page.tsx` |
| `/cities/:slug` | `app/cities/[slug]/page.tsx` |
| `/sports` | `app/sports/page.tsx` |
| `/sports/:slug` | `app/sports/[slug]/page.tsx` |
| `/submit` | `app/submit/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/faq` | `app/faq/page.tsx` |

### 1.3 Migrate Components

Copy `src/components/` across. Most will work as-is with minor adjustments:
- Remove `react-router-dom` Link → use `next/link`
- Remove `SEOHead` component entirely (replaced by Next.js Metadata API)
- Replace any `useNavigate` → `useRouter` from `next/navigation`

### 1.4 Metadata & SEO (replaces SEOHead)

Each `page.tsx` exports a `generateMetadata` function. This runs server-side — crawlers and social bots get the tags in the HTML response, no JS required.

```typescript
// app/events/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.slug);
  return {
    title: `${event.name} Watch Parties Near You`,
    description: event.seoDescription,
    alternates: { canonical: `https://findwatchparty.com/events/${params.slug}` },
    openGraph: {
      title: event.name,
      description: event.seoDescription,
      images: [{ url: `/api/og?title=${event.name}` }],
    },
  };
}
```

### 1.5 OG Image Generation

Add a dynamic OG image route using Next.js built-in ImageResponse:

```
app/api/og/route.tsx
```

Accepts `?title=` and `?type=` query params. Generates branded social card images at build/request time. No manual image design needed per event.

### 1.6 Static Generation + ISR

For detail pages, use `generateStaticParams` to pre-render all known slugs at build time. Set ISR revalidation so pages stay fresh:

```typescript
export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const events = await getAllEventSlugs(); // from Sanity
  return events.map((slug) => ({ slug }));
}
```

### 1.7 Dynamic Sitemap

Replace the static `sitemap.xml` with a Next.js route:

```
app/sitemap.ts
```

This fetches all slugs from Sanity at request time and returns the full sitemap dynamically. Always accurate, never stale.

---

## Phase 2 — Sanity CMS Setup

### 2.1 Install Sanity in the Project

```bash
npm install next-sanity @sanity/image-url
npx sanity@latest init --env
```

This creates a `/sanity` folder with your schema definitions and a Studio you can open at `/studio` in development.

### 2.2 Content Schema Design

Define these document types in Sanity:

#### `event`
```
slug (unique, permanent URL key)
name
sport (reference → sport)
description (rich text)
seoDescription
annualDates (approximate month/week)
currentYearDate
currentYearLocation
isActive (boolean — show in homepage spotlight?)
featuredImage
```

#### `venue`
```
slug
name
city (reference → city)
address
phone
website
googlePlaceId
sports[] (references → sport)
events[] (references → event)
description
amenities[]
capacity
coverCharge
rating
photos[]
```

#### `city`
```
slug
name
state
stateCode
population
timezone
featuredVenueCount
seoDescription
```

#### `sport`
```
slug
name
league
season (start month / end month)
icon
color
```

#### `siteConfig` (singleton)
```
spotlightEvent (reference → event)
spotlightHeadline
spotlightSubtext
spotlightStartDate
spotlightEndDate
announcementBar (optional text)
```

### 2.3 Sanity Studio

Studio lives at `app/studio/[[...tool]]/page.tsx`. Only accessible to you (add auth if needed). This is where you manage all content — no code, no deploys.

### 2.4 Webhooks → ISR Revalidation

In Sanity: Settings → API → Webhooks → add a webhook pointing to:

```
https://findwatchparty.com/api/revalidate?secret=YOUR_SECRET
```

Create `app/api/revalidate/route.ts` that calls `revalidatePath()` on the affected pages. When you save content in Sanity, the live site updates within seconds.

### 2.5 Homepage Spotlight Workflow

Before each major event season:
1. Open Sanity Studio
2. Edit the `siteConfig` document
3. Change `spotlightEvent` → select the event (e.g., "NBA Finals")
4. Update headline and subtext
5. Set start/end dates
6. Hit publish → site updates automatically

---

## Phase 3 — Data Scraping & Population

The goal is to populate Sanity with real venues that actually show watch parties — not just bars that might. Prioritize the 8 highest-traffic events first, in the top 20 US cities by sports fandom.

### 3.1 Target Events (Priority Order)

1. Super Bowl
2. March Madness (Final Four + Championship)
3. NBA Finals
4. NFL Playoffs (Conference Championships)
5. NHL Stanley Cup Finals
6. College Football Playoff
7. World Series
8. FIFA World Cup (next cycle)

### 3.2 Target Cities (Start Here)

Tier 1 (build first):
- New York, Los Angeles, Chicago, Houston, Philadelphia, Dallas, Boston, Atlanta, Miami, Denver, Seattle, Las Vegas, New Orleans, Green Bay, Nashville

Tier 2 (expand after launch):
- Phoenix, San Francisco, Detroit, Pittsburgh, Kansas City, Charlotte, Baltimore, Minneapolis, Cleveland, Tampa

### 3.3 Data Sources to Scrape / Pull From

#### Primary Sources

| Source | What to Pull | Method |
|--------|-------------|--------|
| **Google Places API** | Bar/restaurant listings, hours, phone, rating, address | API (free tier: 1k calls/day) |
| **Yelp Fusion API** | Secondary venue data, reviews, categories | API (free tier) |
| **Reddit** (`r/nfl`, `r/nba`, etc.) | User-reported watch party locations by city thread | Scrape via Pushshift or Reddit API |
| **Facebook Events** | Public watch party events by location/keyword | Scrape (difficult, may need browser automation) |
| **Eventbrite** | Public watch party events | API + scrape |
| **Instagram** | Venue posts tagged #watchparty + city | Scrape (hashtag search) |
| **Timeout / Thrillist / Eater** | "Best sports bars in [city]" editorial lists | HTML scrape |

#### Scraping Strategy

**Step 1 — Bootstrap from editorial lists**

Start with Timeout, Thrillist, and Eater "best sports bars" articles for each target city. These are authoritative, human-curated, and easy to scrape (simple HTML). Gets you 10-30 quality venues per city fast.

```
Tools: Python + BeautifulSoup or Playwright for JS-rendered pages
Output: CSV with name, city, address
```

**Step 2 — Enrich via Google Places API**

Take each venue name + city from Step 1 and hit the Places Search API to get:
- Official name, address, phone
- Google Place ID (permanent ID — store this in Sanity for future enrichment)
- Rating + review count
- Hours
- Website URL
- Photo references

```
Tools: Python + googlemaps library
Cost: Free for first 1k/day; ~$17/1k additional
```

**Step 3 — Pull active events from Reddit/Eventbrite**

Before each major sporting event, run a targeted scrape:
- Reddit: search `r/nfl`, `r/nba`, `r/hockey` + city subreddits for "watch party" threads
- Eventbrite: search `watch party [city] [event name]`

These become the "events happening now" data layer — not permanent venue records, but time-sensitive event listings.

**Step 4 — User submissions (long-term)**

The `/submit` page in the current app already exists. Wire it to a Sanity submission queue. Venues submitted by users get flagged for review before publishing. Over time this becomes a passive data growth engine.

### 3.4 Scraping Scripts to Build

```
scripts/
  scrape-editorial.py       ← Timeout/Thrillist/Eater HTML scraper
  enrich-google-places.py   ← Places API enrichment
  scrape-eventbrite.py      ← Event listings scraper
  scrape-reddit.py          ← Reddit watch party thread parser
  import-to-sanity.py       ← Pushes enriched data into Sanity via API
```

### 3.5 Sanity Import

Sanity has a `@sanity/client` JS SDK and a Python HTTP API. After scraping + enriching, push records directly into Sanity as `venue` documents. Set `isPublished: false` on all imports initially — review a sample, then bulk publish.

---

## Phase 4 — SEO Content Layer

Once the tech stack is in place and data is loaded, the SEO work begins. This is what separates a directory site from one that actually ranks.

### 4.1 Event Page Content (per major event)

Each `/events/[slug]` page should have:
- H1 with primary keyword (e.g., "Super Bowl Watch Parties Near You")
- City filter / map showing venues
- "How to find a watch party" section
- FAQ block (targets long-tail questions people actually search)
- JSON-LD `SportsEvent` schema
- Updated each year with current year's date/location/matchup

### 4.2 City Page Content

Each `/cities/[slug]` page:
- H1: "Watch Party Venues in [City]"
- Intro paragraph mentioning the city's sports culture
- Filterable venue list
- JSON-LD `City` schema + `ItemList` of venues

### 4.3 FAQ Targets (high-value long-tail keywords)

- "where to watch super bowl in [city]"
- "sports bars showing nba finals [city]"
- "watch party near me [sport]"
- "best bar to watch [team] game [city]"

Add these as FAQ schema on the relevant event + city pages.

---

## Launch Sequence

```
Week 1-2   → Scaffold Next.js, migrate all existing pages + components
Week 3     → Sanity schema + Studio setup, wire to Next.js
Week 4     → Run editorial scrape for Tier 1 cities (Timeout/Thrillist)
Week 5     → Google Places enrichment, import to Sanity
Week 6     → ISR, sitemap, OG images, canonical tags — full SEO pass
Week 7     → QA, Vercel deploy, submit sitemap to Google Search Console
Week 8+    → Content layer (event page copy, FAQs), Reddit/Eventbrite scraping
```

---

## Key Decisions Already Made

- **Evergreen URLs** — `/events/super-bowl` not `/events/super-bowl-2026`
- **Sanity** for CMS (not Contentful, not Notion — Sanity has best Next.js integration)
- **Vercel** for hosting (ISR + OG image generation work seamlessly)
- **Google Places API** as the primary enrichment source (authoritative, structured data)
- **No thin pages** — only create event/sport pages with real content depth
