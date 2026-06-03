# FindWatchParty — Product Vision

> *The #1 place for sports fans to find their people on game day.*

---

## The Big Idea

Every major sporting event creates a massive, high-intent question that nobody has cleanly answered:

**"Where can I watch [the game] near me, with people who actually care?"**

Google Maps gives you a list of bars. Yelp gives you reviews about the food. Reddit gives you one person's opinion from three years ago. Nobody has built the definitive, structured, filterable answer for every city, every sport, every fanbase — until now.

**FindWatchParty** is a sports watch party directory. Fans search it like a flight tracker. Venues submit to it like a business listing. It's built for the World Cup moment but designed to outlive it.

---

## The Origin

The FIFA World Cup 2026 is landing in 11 US cities between June 11 and July 19, 2026. It's the first World Cup ever held in North America at full scale, and it's projected to be the most-watched sporting event in US history. Hundreds of thousands of international fans — Brazilian, Mexican, Argentine, English, French — are descending on cities where they don't know any bars, don't speak the language fluently, and desperately want to find their people.

That's the wedge. But the vision is bigger than the World Cup.

---

## Who This Is For

### Fan Personas

| Persona | Need |
|--------|------|
| **The International Fan** | Traveling for the World Cup, wants a bar full of their national team's supporters |
| **The Casual Viewer** | Wants to watch the NBA Finals somewhere with a big screen and a cold beer |
| **The Planner** | Organizing a group outing, needs to know about reservations, capacity, and cover charges |
| **The Local Regular** | Wants to find a new sports bar in their city with great vibes |

### Venue Personas

| Persona | Need |
|--------|------|
| **The Sports Bar Owner** | Wants maximum visibility during peak event windows |
| **The Restaurant with a Screen** | Running a one-time watch party, wants to attract a specific fanbase |
| **The Event Organizer** | Hosting a paid watch party experience, needs ticketed listing support |

---

## What We've Built

A full-stack React/TypeScript directory with:

- **Venue listings** filterable by city, sport, fanbase/nationality, cover charge, sound-on, family-friendly, outdoor screen, drink specials
- **Event pages** for every major sporting event (World Cup, NBA Finals, Stanley Cup, NFL, Super Bowl, MLB) with linked host cities and venues
- **City pages** for 21 US cities — 11 World Cup host cities + major sports markets
- **Sport pages** for soccer, basketball, football, hockey, boxing, baseball, motorsports
- **Featured listing system** — paid placements appear first in results with a featured badge
- **SEO infrastructure** — robots.txt, sitemap.xml, JSON-LD structured data (BarOrPub, SportsEvent, City schemas) on every relevant page
- **Agent-friendly architecture** — AGENTS.md, CLAUDE.md, llms.txt for AI-assisted development and crawling
- **Venue submission form** — free self-serve listing pipeline

---

## Monetization Stack

### Phase 1 — Now (Event-Driven)

**Featured Listings — $99/venue for the World Cup window**
- Venue appears at the top of all relevant search results
- "Featured" badge and visual prominence
- Target: 50 featured venues × $99 = **~$5,000** for a single tournament

**Direct Outreach to Sports Bars in Host Cities**
- Email/call campaign to the ~200 best sports bars in New York, LA, Miami, Dallas, Houston, Atlanta, Boston, Philadelphia, Seattle, SF, KC
- Ask: "We're building the biggest watch party directory for the World Cup. Featured listing is $99. Want in?"

### Phase 2 — During Tournament

**Tiered Featured Placement — $49 / $99 / $199**
- $49 = city listing only
- $99 = event + city listing
- $199 = top of homepage featured section + all filters

**Lead Gen / Booking Affiliate**
- If venues use OpenTable, Resy, or Eventbrite — affiliate on bookings made through our links
- Estimated: $2–5 per completed reservation

**Drink Specials Sponsorship**
- "Drink specials powered by [Beer Brand]" — sponsored filter section
- One-time fee or per-impression deal

### Phase 3 — Post Tournament (Sustainability)

**Monthly SaaS Listing Subscription — $19–$49/month**
- Recurring featured placement for "permanent" sports bars
- Pivot messaging: "The #1 sports bar directory in America"

**Event-Specific Campaigns**
- Super Bowl LXI, NBA Finals 2027, Stanley Cup, NFL season openers
- Run the same featured listing campaign for each major event window

**Display Advertising**
- Once traffic hits 10k+ monthly sessions: Google AdSense → Ezoic → Mediavine
- Sports betting affiliate programs (FanDuel, DraftKings) — $50–$300 per new depositing user
- Food delivery affiliate (DoorDash, Uber Eats) — "Order food for your watch party at home"

---

## Traffic Strategy

### Short Term (World Cup Window — No SEO)

The site won't rank on Google in time. That's fine. The playbook is:

1. **Reddit** — Post in city subreddits (r/nyc, r/LosAngeles, r/Miami, etc.) + r/soccer, r/WorldCup
2. **Facebook Groups** — Local "soccer in [city]" and national team supporter groups
3. **TikTok / Instagram Reels** — Short "best World Cup watch party bars in [city]" videos
4. **Twitter/X** — Tag supporter clubs, national team accounts, local journalists
5. **Venue partnerships** — Every venue we list will share it to their own audience

### Medium Term (SEO — 3–6 months post-launch)

Target long-tail queries:
- "best World Cup watch party bars in [city]"
- "watch [team] game near me [city]"
- "sports bars with [nationality] fans [city]"
- "NBA Finals watch party [city] 2026"

**Every city + event combination is a landing page.** That's 21 cities × 6 events = 126 SEO targets, plus 21 cities × 7 sports = 147 more. Total: ~273 indexable landing pages with structured data.

### Long Term

- **Local SEO stays strong** — "sports bar near me" has consistent search volume year-round
- **Event calendar SEO** — build authority around recurring events (Super Bowl, Playoffs, etc.)
- **Backlinks** — press coverage around World Cup launch, venue partnerships linking back

---

## Data Population Strategy

### Current State
6 seed venues manually created. All data is static in `src/data/venues.ts`.

### Phase 1 — Manual Enrichment (Week 1)
- Target top 3–5 sports bars in each of the 11 host cities = ~50 venues
- Source: Google Maps "sports bar" search + Yelp "watch party" search
- For each venue: scrape address, phone, website, hours, Google rating
- Enrich manually: soundOn, coverCharge, drinkSpecials, fanbases it caters to

### Phase 2 — Semi-Automated (Week 2–4)
- Use Outscraper or Apify to pull Google Maps data for "sports bar" in each city
- Claude/AI enrichment: visit each venue website, extract features
- Target: 20–30 venues per city, 200+ total venues by launch

### Phase 3 — Self-Serve UGC (Ongoing)
- Venue submission form is live — promote it
- Every submitted venue gets reviewed and added within 24 hours
- Goal: 500+ venues by end of World Cup tournament

### Data Fields to Prioritize
High signal fields fans actually filter on:
1. **soundOn** — do they turn the game audio on? (Most critical for watch parties)
2. **coverCharge** — free vs. ticketed (huge filter for casual fans)
3. **fanbases** — which national teams does this bar cater to?
4. **reservationRequired** + bookingUrl — enables direct booking revenue
5. **outdoorScreen** — summer tournament, outdoor viewing is premium

---

## Future Features Roadmap

### Near Term (1–3 months)
- [ ] **User reviews / ratings** — let fans rate venues post-game
- [ ] **Event schedule integration** — show upcoming match times on venue pages
- [ ] **Email alerts** — "Get notified when a venue lists watch parties for [team]"
- [ ] **"Happening Tonight" filter** — surface venues hosting watch parties tonight
- [ ] **Claimed listings** — allow venues to claim and self-manage their page
- [ ] **Photos** — venue image uploads to make listings more compelling

### Medium Term (3–6 months)
- [ ] **Backend / Firestore database** — migrate from static data to live Firestore
- [ ] **Venue dashboard** — self-serve portal for venue owners to update info, manage featured status, see traffic
- [ ] **Match schedule page** — full World Cup group stage / knockout bracket
- [ ] **Supporter club directory** — find official supporter clubs by city and nationality
- [ ] **Map view** — interactive map of all venues in a city
- [ ] **"I'm going" / RSVP count** — social proof on venue cards

### Long Term (6–12 months)
- [ ] **Ticketed watch parties** — venues sell tickets directly through the platform (Stripe integration)
- [ ] **Corporate group bookings** — high-value B2B lead gen for large groups
- [ ] **Mobile app** (Capacitor) — "Find a watch party near me" on-the-go
- [ ] **Expand internationally** — Canada and Mexico are co-hosts; add Toronto, Vancouver, Guadalajara, Mexico City
- [ ] **Notify API** — push notifications when a venue goes from "tentative" to "confirmed watch party"

---

## Competitive Landscape

| Competitor | Strength | Our Edge |
|-----------|---------|---------|
| **Fanzo** (fanzo.com) | UK-focused sports bar finder | US focus, World Cup timing, better filtering |
| **Google Maps** | Ubiquitous | Structured watch party data, event-specific filtering |
| **Yelp** | Reviews & ratings | Sports-specific, fanbase filtering, event linking |
| **Reddit city subs** | Community trust | Structured, searchable, always up to date |
| **Supporter club websites** | Fanbase loyalty | Multi-fanbase aggregation, venue discovery UX |

**Our moat:** The combination of event + city + fanbase filtering is something nobody else has. A Brazilian fan in New York searching for "a bar full of Brazil supporters near me showing the Brazil game tonight" has zero good options. We're building that.

---

## The Bigger Picture

The World Cup is the wedge, not the ceiling.

Every 4 years another World Cup. Every year: Super Bowl, NBA Finals, Stanley Cup, World Series, NCAA March Madness. Every weekend: NFL Sunday, Premier League early morning, UFC PPV.

**Sports are always on. Fans always want to watch with people who care.**

The vision is a sports watch party layer on top of every bar and restaurant in America — a live, searchable, event-aware directory that becomes the default answer to "where should we watch the game?"

That's a real, defensible, recurring-revenue business.

---

*Built by a fan, for fans. findwatchparty.com*
