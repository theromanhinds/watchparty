# FindWatchParty — CLAUDE.md

## Quick Start
```bash
cd watchparty
npm install
npm run dev
```

## Build & Type Check
```bash
npm run build    # Runs tsc + vite build
```

## Project Context
See AGENTS.md for full project structure, routes, data model, and tech stack.

## Key Conventions
- Tailwind CSS — use `brand-*` for blues, `accent-*` for ambers
- `cn()` from `@/lib/utils` for conditional class merging
- Named exports for all components/pages (except App.tsx default export)
- `@/` path alias maps to `src/`
- SEOHead component at top of every page
- Static data in `src/data/` — no backend yet

## Adding a New Venue
Edit `src/data/venues.ts` — follow the `Venue` interface from `src/types/index.ts`.
Required: id, slug, name, address, city, citySlug, state, stateCode, zip, sports[], fanbases[], eventSlugs[]

## Adding a New Event
Edit `src/data/events.ts` — follow the `SportingEvent` interface.
Required: id, slug, name, sport, sportSlug, startDate, endDate, hostCities[]

## Environment
- Firebase not yet configured (future: Firestore in us-east4 region)
- Netlify deployment target (netlify.toml can be added later)
- No .env required for current static build
