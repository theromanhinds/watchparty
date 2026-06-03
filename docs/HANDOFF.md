# FindWatchParty — Agent Handoff & Strategy Brief

> This document is the single source of truth for any agent, collaborator, or AI assistant helping build, grow, or monetize FindWatchParty. Read this before doing anything else.

---

## What Is This?

**FindWatchParty** (`findwatchparty.com`) is a sports watch party venue directory for the United States. Fans use it to find bars and venues hosting watch parties for major sporting events — filtered by city, sport, fanbase/nationality, price, and venue features. Venue owners submit free listings; premium featured placements are the primary revenue model.

**Current date context:** The FIFA World Cup 2026 runs June 11 – July 19, 2026, in 11 US cities. That is the primary traffic and monetization event the site is built around. The site is live and deployed.

---

## Tech Stack (for engineering agents)

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript (strict) |
| Build tool | Vite 8 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 — custom `brand` (sky blue) and `accent` (amber) colors |
| Icons | Lucide React |
| Data | Static files in `src/data/` — no backend yet |
| Planned backend | Firebase Firestore (region: us-east4) |
| Deployment target | Netlify |
| Repo | https://github.com/theromanhinds/watchparty |

**Key commands:**
```bash
# Start dev server (must run from watchparty/ directory)
cd watchparty && npm run dev
# OR use the bat file from parent:
C:\Users\silve\Documents\HERO-2026\watchparty\dev.bat

# Build
cd watchparty && npm run build
```

**Path alias:** `@/` → `src/`

---

## Site Structure

```
/ .......................... Homepage — hero, featured events, featured venues, city grid
/venues .................... All venues — filterable sidebar + grid
/venues/:slug .............. Venue detail — JSON-LD BarOrPub schema
/events .................... All sporting events — sport tab filter
/events/:slug .............. Event detail — host cities, linked venues, JSON-LD SportsEvent
/cities .................... City browser — host cities + major cities
/cities/:slug .............. City detail — venues + hosted events
/sports .................... Sport browser
/sports/:slug .............. Sport detail — venues by sport
/submit .................... Free venue submission form
/about ..................... About page
/faq ....................... FAQ
/sitemap ................... HTML sitemap
```

**Public assets:**
- `/public/robots.txt` — allow all crawlers
- `/public/sitemap.xml` — 40+ URLs with priorities
- `/public/llms.txt` — LLM-friendly site map

---

## Data Model

All types live in `src/types/index.ts`.

### Venue (key fields)
```typescript
{
  id: string
  slug: string
  name: string
  citySlug: string          // links to cities data
  state: string
  lat: number
  lng: number
  rating: number            // 1–5
  description: string
  soundOn: boolean          // do they turn the game audio on?
  coverCharge: 'free' | 'ticketed' | 'varies'
  coverChargeAmount?: string
  drinkSpecials: boolean
  familyFriendly: boolean
  outdoorScreen: boolean
  reservationRequired: boolean
  bookingUrl?: string
  featured: boolean         // paid featured placement
  sports: string[]          // e.g. ['soccer', 'basketball']
  fanbases: string[]        // e.g. ['usmnt', 'mexico', 'brazil']
  eventSlugs: string[]      // links to events data
}
```

### SportingEvent (key fields)
```typescript
{
  slug: string
  name: string
  sportSlug: string
  startDate: string         // ISO date
  endDate: string
  hostCities: string[]      // city slugs
  featured: boolean
}
```

### FilterState
```typescript
{
  city: string              // city slug or 'all'
  sport: string             // sport slug or 'all'
  fanbase: string           // fanbase slug or 'all'
  coverCharge: string       // 'all' | 'free' | 'ticketed' | 'varies'
  soundOn: boolean | null
  familyFriendly: boolean | null
  outdoorScreen: boolean | null
  drinkSpecials: boolean | null
  featured: boolean | null
  search: string
}
```

---

## Current Data State (as of build)

| Entity | Count | Notes |
|--------|-------|-------|
| Venues | 6 | Seed data only — needs major expansion |
| Cities | 21 | 11 World Cup host + 10 major markets |
| Events | 6 | World Cup 2026, NBA Finals, Stanley Cup, NFL, Super Bowl LXI, MLB WS |
| Sports | 7 | Soccer, basketball, football, hockey, boxing, baseball, motorsports |
| Fanbases | 17 | USMNT, Mexico, Brazil, Argentina, England, France, Germany, Spain, Portugal, Netherlands, Colombia, Italy, Canada, Morocco, Japan, South Korea, General |

**Critical gap: Only 6 venues.** The site needs 200+ to be useful. This is the #1 priority.

---

## Immediate Priorities (in order)

### 1. Populate Venue Data — CRITICAL
The site is functionally empty without venues. Target:
- **50 venues minimum** before any marketing (one World Cup tournament window)
- **200 venues** for a credible launch
- **500+ venues** by end of tournament

**Data sourcing approach:**
1. Google Maps search: "sports bar watch party [city]" for each of the 11 host cities
2. Yelp search: "watch party" + "sports bar" in each city
3. Tool: [Outscraper](https://outscraper.com) — Google Maps bulk scraper ($10–30 for a full run)
4. Tool: [Apify Google Maps Scraper](https://apify.com/compass/crawler-google-places) — alternative
5. Manual enrichment of key fields: soundOn, fanbases, coverCharge, reservationRequired

**Priority cities (World Cup hosts):**
New York → Los Angeles → Miami → Dallas → Houston → Atlanta → Boston → Philadelphia → Seattle → San Francisco → Kansas City

**Data fields to prioritize for scraping:**
- Name, address, phone, website (all available from Maps)
- Google rating + review count (from Maps)
- soundOn, coverCharge, fanbases (manual enrichment or AI extraction from website/reviews)

**Adding venues to the codebase:**
Edit `src/data/venues.ts` and follow the `Venue` interface exactly. Each venue needs a unique `id`, a `slug` (kebab-case name), and at minimum: `name`, `address`, `city`, `citySlug`, `state`, `stateCode`, `zip`, `sports[]`, `fanbases[]`, `eventSlugs[]`.

### 2. Backend Migration (Firebase)
Static data in TypeScript files won't scale. When venue count exceeds ~50:
- Set up Firebase project in **us-east4** region
- Create Firestore collection: `venues`, `events`, `cities`, `sports`
- Write migration script to seed Firestore from existing `src/data/` files
- Update hooks (`useVenues.ts`, etc.) to query Firestore instead of static arrays
- Add Firebase Admin SDK to Cloud Functions for server-side operations

### 3. Featured Listing Sales Pipeline
Primary revenue. Process:
1. Identify top 200 sports bars in the 11 host cities
2. Find owner/manager contact (Google Maps "owner" profile, LinkedIn, venue website contact form)
3. Email template: "We're building the #1 watch party directory for the World Cup. Featured listing = $99. Your venue appears first when [Brazil/Mexico/USMNT] fans search in [city]."
4. Implement Stripe payment link (simple `stripe.com/pay` link — no custom backend needed initially)
5. Once paid: manually set `featured: true` in venue data, or build admin toggle

### 4. Marketing Launch
No SEO value yet — traffic must come from:
- Reddit: r/soccer, r/WorldCup, r/nyc, r/LosAngeles, r/Miami, r/Dallas, r/Houston, r/Atlanta, r/Seattle, r/sanfrancisco, r/KansasCity, r/boston, r/philadelphia + national team subreddits (r/usmnt, r/brazil, r/mexico, etc.)
- Facebook Groups: "Soccer in New York City", "Brazilian Soccer Fans USA", supporter club groups
- Instagram/TikTok: "Best World Cup watch party spots in [city]" short videos
- Twitter/X: Tag @USMNT, @MLS, local sports journalists

---

## Future Features to Think Through

### Quick Wins (can be done in the current static architecture)

**"Happening Tonight" / Live Events Filter**
- Add an `isToday` flag or compute from match schedule
- Show a "Tonight" badge on venue cards during active match days
- Would dramatically increase daily traffic during the tournament

**World Cup Match Schedule Page**
- Static page with full group stage + knockout bracket
- Links from each match to "Find a watch party" for that game
- High-value SEO: "watch USA vs Mexico near me" is a massive search query

**Supporter Club Directory**
- Separate from venues — list official supporter clubs by city and nationality
- USMNT, Mexico, and Brazil all have formal supporter club networks
- Each supporter club has preferred venues → cross-links to venue pages
- These clubs will share the listing to their members (organic traffic)

**"Near Me" Geolocation**
- Browser `navigator.geolocation` → sort by distance
- Single biggest UX improvement for mobile users

### Medium Complexity

**User Accounts + Reviews**
- Firebase Auth (Google OAuth — 1 button)
- Let fans leave a star rating + text review
- Reviews dramatically improve SEO (fresh content, long-tail queries)
- "Great vibe for Mexico fans" type reviews are exactly what Google indexes

**Venue Claim Flow**
- "Is this your venue? Claim it for free"
- Firebase Auth for venue owners
- Claimed venues can update info, add photos, respond to reviews
- Claimed venues are more trustworthy → better conversion for featured upgrades

**Match Schedule Integration**
- FIFA published the full 2026 schedule
- Map each match to the relevant cities
- On tournament days: show "Today's matches" banner on homepage
- Push email/notification to users who saved venues in those cities

**Interactive Map View**
- Mapbox or Google Maps API
- Pin all venues in a city on a map
- Critical for "near stadium" use cases (fans walking from MetLife Stadium → need a bar nearby)

### High Value / High Complexity

**Ticketed Watch Party Platform**
- Venues post ticketed events with capacity, price, and Stripe payment
- We take 5–10% platform fee
- This transforms us from directory → marketplace
- High complexity but 10x revenue potential

**Corporate Group Bookings**
- Companies buying out sections of bars for employee watch parties
- B2B sales, high ticket size ($500–5,000 per booking)
- Requires sales team or at minimum a "request quote" form

**Mobile App (Capacitor)**
- The codebase already uses Capacitor config (`capacitor.config.ts` exists in the repo)
- Wrap the existing React app
- Push notifications: "Your match starts in 1 hour — here's a venue near you"
- iOS/Android = credibility + distribution

---

## Monetization Model (Full Picture)

| Revenue Stream | When | Est. Revenue |
|---------------|------|-------------|
| Featured listings ($99/venue) | Now | $5k–15k (World Cup) |
| Tiered featured ($49/$99/$199) | Week 2 | $10k–30k |
| Booking affiliate (OpenTable/Resy) | Month 2 | $500–2k/mo |
| Monthly recurring listings ($19–49/mo) | Month 3 | $1k–5k/mo |
| Display ads (AdSense → Ezoic) | Month 4 | $200–1k/mo |
| Sports betting affiliate | Month 6 | $2k–10k/mo |
| Ticketed watch party fees (5–10%) | Year 2 | Variable |

**Year 1 realistic range:** $20k–60k  
**Year 2 with recurring + marketplace:** $100k–250k

---

## SEO Long-Game (Post World Cup)

The World Cup ends July 19, 2026. The site doesn't die — it pivots:

**Target queries that stay valuable year-round:**
- "[sport] watch party [city]" — perpetual search volume
- "best sports bars in [city]" — local SEO with consistent volume
- "where to watch [team] game [city]" — repeats every game week
- "[event] watch party near me" — Super Bowl, NBA Finals, etc.

**Content strategy to build domain authority:**
- City guides: "10 Best Sports Bars in Miami for the World Cup (and Beyond)"
- Fanbase guides: "Where Brazil Fans Watch Soccer in New York"
- Event guides: "Complete Guide to NBA Finals Watch Parties 2026"
- These pages = backlink targets + long-tail SEO

**Expansion:**
- Add Canadian cities (Toronto, Vancouver, Calgary) — Canada is a 2026 co-host
- Add Mexican cities (Guadalajara, Mexico City, Monterrey) — Mexico is a co-host
- Long-term: UK, Australia, Germany (massive football/soccer markets with similar need)

---

## Key Files for Context

| File | Purpose |
|------|---------|
| `src/data/venues.ts` | Add new venues here |
| `src/data/events.ts` | Add new sporting events here |
| `src/data/cities.ts` | City definitions (21 cities) |
| `src/data/sports.ts` | Sport definitions (7 sports) |
| `src/types/index.ts` | All TypeScript interfaces |
| `src/lib/constants.ts` | FANBASES list, SITE_NAME, etc. |
| `src/hooks/useVenues.ts` | Filter/sort logic — update when adding new filter dimensions |
| `docs/PRODUCT.md` | Full product vision document |

---

## Open Questions to Think Through

1. **Pricing:** Is $99 the right price for a featured listing? Could we charge $199 for the World Cup window given the massive demand? Or should we go lower ($49) to maximize volume?

2. **Data quality vs. quantity:** Better to have 50 well-researched, accurate venues or 500 scraped venues that might have wrong info? (Answer probably: launch with 50 great ones, grow from there)

3. **Freemium listing model:** Should basic listings be free forever, or time-limited free during the tournament and then $19/mo? Free = more listings = more useful = more traffic.

4. **Venue verification:** How do we ensure featured venues are actually running watch parties? Require venue owners to confirm? Trust but verify with a follow-up email?

5. **International expansion:** How quickly should we add Canada and Mexico given they're co-hosts? Toronto and Vancouver are significant markets.

6. **User accounts:** Are they worth the complexity pre-launch? Or ship without and add later?

7. **Match schedule page:** This could be the highest-traffic page during the tournament ("World Cup schedule 2026" is a top query). Should it be a priority?

---

*Last updated: June 2026 | Contact: hello@findwatchparty.com*
