# FindWatchParty — AGENTS.md

## Project Overview
**FindWatchParty** (`findwatchparty.com`) is a React/TypeScript/Vite sports watch party directory.
Fans find bars/venues hosting watch parties for the World Cup, NBA Finals, NFL, and other major US sporting events.
Venue owners can submit listings for free.

## Key Commands
```bash
cd watchparty
npm run dev        # Start local dev server (http://localhost:5173)
npm run build      # TypeScript compile + Vite bundle
npm run preview    # Preview production build
```

## Project Structure
```
watchparty/
├── src/
│   ├── App.tsx              # Router — all route definitions
│   ├── main.tsx             # ReactDOM entry
│   ├── index.css            # Tailwind directives
│   ├── types/index.ts       # TypeScript interfaces (Venue, SportingEvent, City, Sport, FilterState)
│   ├── lib/
│   │   ├── constants.ts     # SITE_NAME, FANBASES, SORT_OPTIONS, NAV_LINKS
│   │   └── utils.ts         # cn(), slugify(), formatDate(), isEventActive()
│   ├── data/
│   │   ├── cities.ts        # 21 US cities (11 World Cup host + 10 major)
│   │   ├── sports.ts        # 7 sports with icons and slugs
│   │   ├── events.ts        # Major sporting events (World Cup 2026, NBA Finals, etc.)
│   │   └── venues.ts        # Seed venue data (6 venues)
│   ├── hooks/
│   │   ├── useVenues.ts     # Filters + sorts VENUES array
│   │   └── useFilters.ts    # Manages FilterState with URL-sync helpers
│   ├── components/
│   │   ├── ui/              # Button, Badge, Input, Card, Select
│   │   ├── layout/          # Header, Footer, Layout (Outlet wrapper)
│   │   ├── shared/          # SEOHead, Breadcrumb, EmptyState
│   │   ├── venue/           # VenueCard, VenueGrid, VenueFilters
│   │   ├── event/           # EventCard
│   │   ├── city/            # CityCard
│   │   └── search/          # SearchBar
│   └── pages/
│       ├── HomePage.tsx
│       ├── VenuesPage.tsx
│       ├── VenueDetailPage.tsx
│       ├── EventsPage.tsx
│       ├── EventDetailPage.tsx
│       ├── CitiesPage.tsx
│       ├── CityDetailPage.tsx
│       ├── SportsPage.tsx
│       ├── SportDetailPage.tsx
│       ├── SubmitPage.tsx
│       ├── AboutPage.tsx
│       ├── FAQPage.tsx
│       ├── SitemapPage.tsx
│       └── NotFoundPage.tsx
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt             # LLM-friendly site map
│   └── favicon.svg
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Routes
| Path | Page |
|------|------|
| `/` | HomePage |
| `/venues` | VenuesPage |
| `/venues/:slug` | VenueDetailPage |
| `/events` | EventsPage |
| `/events/:slug` | EventDetailPage |
| `/cities` | CitiesPage |
| `/cities/:slug` | CityDetailPage |
| `/sports` | SportsPage |
| `/sports/:slug` | SportDetailPage |
| `/submit` | SubmitPage |
| `/about` | AboutPage |
| `/faq` | FAQPage |
| `/sitemap` | SitemapPage |
| `*` | NotFoundPage |

## Tech Stack
- **React 19** + **TypeScript** (strict)
- **Vite 8** — build tool
- **React Router v6** — client-side routing
- **Tailwind CSS v3** — styling with custom `brand` (sky blue) and `accent` (amber) colors
- **Lucide React** — icons
- **clsx + tailwind-merge** — `cn()` utility

## Data Model Summary
- **Venue** — bar/restaurant hosting watch parties; has sports[], fanbases[], eventSlugs[], featured flag
- **SportingEvent** — major event (World Cup, NBA Finals); has hostCities[], sportSlug
- **City** — US city; has isHostCity flag (World Cup 2026 host cities)
- **Sport** — soccer, basketball, football, hockey, boxing, baseball, motorsports

## Conventions
- Named exports only (no default exports for components/pages except App.tsx)
- All page components use SEOHead at the top
- Path alias `@/` → `src/`
- JSON-LD structured data on all detail pages (BarOrPub, SportsEvent, City schemas)
- No backend yet — data is static in `src/data/`. Firebase planned for production.
