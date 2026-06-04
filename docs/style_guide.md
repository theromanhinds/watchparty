# FindWatchParty — Style Guide

## Design Philosophy

Inspired by Airbnb's visual language — not their layout or UX flow (they're a booking platform; we're a directory). We borrow their **design DNA**: one brand accent color used sparingly, white canvas, generous whitespace, rounded-everything, photo-first cards, and clean sans-serif type. Applied to a mobile-first sports venue directory.

**The rule:** If a design element feels heavy, dark, or cluttered — it's wrong. If it feels light, clean, and confident — it's right.

---

## Color System

### Philosophy
One brand accent (sky blue), used only for CTAs and selected states. White and off-white carry the layout. Color signals meaning (amber = featured, green = verified) — never used decoratively.

### Palette

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `page-bg` | `#F7F7F7` | `bg-gray-100` | Page background behind cards |
| `surface` | `#FFFFFF` | `bg-white` | Cards, nav, modals |
| `text-primary` | `#222222` | `text-gray-900` | Headings, venue names |
| `text-secondary` | `#717171` | `text-gray-500` | Meta info, neighborhood, labels |
| `border` | `#DDDDDD` | `border-gray-200` | Dividers, unselected pill borders |
| `brand` | `#0EA5E9` | `sky-500` | Primary buttons, selected filter pills, links |
| `brand-dark` | `#0284C7` | `sky-600` | Button hover state |
| `featured` | `#F59E0B` | `amber-500` | Featured badge, featured card left border |
| `verified` | `#10B981` | `emerald-500` | Verified checkmark badge |
| `danger` | `#EF4444` | `red-500` | Errors only |

### Color Rules
- **Never** use brand blue as a background fill for hero sections or large areas
- **Never** use dark gradients (the old `from-brand-700 via-brand-800 to-gray-900` hero is gone)
- **Do** let white and gray-100 carry the page; blue appears only on interactive elements
- The featured amber accent appears as a `4px left border` on featured cards + a small badge — nowhere else

---

## Typography

### Font
**Inter** (already loaded via Google Fonts). This is the closest open-source match to Airbnb's Cereal — warm, rounded, geometric.

### Scale

| Style | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Display | 28–32px / `text-3xl` | 700 | `#222222` | Homepage hero headline only |
| H1 | 24px / `text-2xl` | 700 | `#222222` | Page titles |
| H2 | 20px / `text-xl` | 600 | `#222222` | Section headers |
| H3 | 16px / `text-base` | 600 | `#222222` | Card venue names, modal headers |
| Body | 14px / `text-sm` | 400 | `#222222` | General content |
| Meta | 12–13px / `text-xs` | 400 | `#717171` | Neighborhood, timestamps, secondary info |
| Label | 12px / `text-xs` | 500 | `#717171` | Form labels, filter categories |
| Button | 14px / `text-sm` | 600 | — | All button text |

### Rules
- **No uppercase text** — Airbnb never uses all-caps. Write in sentence case.
- **No tracking-widest** — the old `uppercase tracking-widest` style labels are gone
- Line height: `leading-snug` (1.375) for headings, `leading-normal` (1.5) for body
- Max line width for readable copy: `max-w-prose` (65ch)

---

## Spacing

Base unit is **4px**. All spacing is a multiple of 4.

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `xs` | 4px | `p-1` | Micro gaps (icon to label) |
| `sm` | 8px | `p-2` | Internal component padding |
| `md` | 12px | `p-3` | Card content padding |
| `lg` | 16px | `p-4` | Standard element spacing |
| `xl` | 24px | `p-6` | Card padding, section gaps |
| `2xl` | 32px | `p-8` | Large section padding |
| `section` | 48–64px | `py-12`–`py-16` | Vertical section spacing |

---

## Border Radius

Airbnb rounds everything. There are no hard corners in the UI except the page grid itself.

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `xs` | 4px | `rounded` | Inline badges/tags |
| `sm` | 8px | `rounded-lg` | Small buttons, inputs |
| `md` | 12px | `rounded-xl` | Standard cards |
| `lg` | 16px | `rounded-2xl` | Large venue cards |
| `pill` | 9999px | `rounded-full` | Primary buttons, filter chips, search bar |

---

## Shadow System

Airbnb uses a warm, three-layer shadow that gives cards a natural lift — no hard drop shadows.

Add this to `tailwind.config.js`:

```js
boxShadow: {
  'card': '0 0 0 1px rgba(0,0,0,0.02), 0 2px 6px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.10)',
  'card-hover': '0 0 0 1px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.12)',
  'nav': '0 1px 0 rgba(0,0,0,0.08)',
}
```

Usage:
- Venue cards: `shadow-card hover:shadow-card-hover transition-shadow`
- Top nav: `shadow-nav`
- **Never** use `shadow-lg` or `shadow-xl` — too heavy

---

## Components

### Venue Card

The primary UI element. Photo-first (or gradient placeholder). Minimal text. Mobile-first: full width on phones, 2-col on tablet, 3-col on desktop.

```
┌─────────────────────────────┐
│                             │  ← Photo area (16:9 aspect ratio)
│   [placeholder gradient]    │    rounded-2xl top corners
│                             │    No border — shadow only
├─────────────────────────────┤
│ Williamsburg · Brooklyn     │  ← neighborhood · borough (text-xs text-gray-500)
│ The Abbey Bar               │  ← venue name (text-base font-semibold text-gray-900)
│ Free entry · 🔊 Sound on    │  ← key info chips (text-xs text-gray-500)
│ ⭐ 4.3                      │  ← rating if available (text-xs)
└─────────────────────────────┘
```

- Card: `rounded-2xl bg-white shadow-card overflow-hidden`
- Photo area: `aspect-video bg-gradient-to-br [neighborhood color] w-full`
- Content: `px-3 py-3`
- Featured card: add `border-l-4 border-amber-400` and a `⭐ Featured` pill overlaid top-left of photo
- Verified badge: small `✓ Verified` pill in top-left of photo area

### Photo Placeholder (Gradient Strategy)

Until real photos exist, each venue gets a gradient based on its neighborhood/borough. These feel intentional and city-coded, not empty.

```
Manhattan:     from-sky-600 to-sky-900        (blue)
Brooklyn:      from-emerald-600 to-teal-900   (green)
Queens:        from-purple-600 to-indigo-900  (purple)
Bronx:         from-orange-600 to-red-900     (orange)
Staten Island: from-slate-500 to-slate-800    (slate)
New Jersey:    from-rose-600 to-pink-900      (rose)
Fan Zone:      from-amber-500 to-orange-700   (gold — for official FIFA fan zones)
```

Optionally overlay the venue name initial or a soccer ball emoji centered in the gradient for visual interest.

### Filter Pills (Horizontal Scroll)

Airbnb's category strip. This is the primary filter mechanism — replaces the sidebar on mobile.

```
┌─────────────────────────────────────────────────────┐
│  All  │  Fan Zones  │  Free Entry  │  Sound On  │  → │
│  (selected = bg-gray-900 text-white)               │
│  (unselected = bg-white border border-gray-200)     │
└─────────────────────────────────────────────────────┘
```

- Container: `flex gap-2 overflow-x-auto pb-2 scrollbar-hide`
- Pill: `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors`
- Unselected: `bg-white border border-gray-200 text-gray-700 hover:border-gray-400`
- Selected: `bg-gray-900 text-white border-transparent`

Filter options (in order):
1. All
2. Fan Zones (official FIFA venues)
3. Sports Bars
4. Free Entry
5. Sound On
6. Outdoor
7. Reservation OK (not required)
8. Family Friendly

### Primary Button

```
bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm
rounded-full px-6 py-3 transition-colors
```

### Secondary Button

```
bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-sm
rounded-full px-6 py-3 transition-colors
```

### Search/Filter Bar (Homepage)

Airbnb-style floating bar. For FindWatchParty: single row on mobile (just a text input + search button), expanded on desktop.

```
bg-white rounded-full shadow-card border border-gray-200
px-4 py-3 flex items-center gap-3
```

- Placeholder: "Search by venue or neighborhood…"
- Search button: sky-500 circle button with search icon, `rounded-full w-10 h-10`

### Top Navigation

Minimal. Logo left, one utility CTA right. No multi-item nav menu.

```
┌────────────────────────────────────────────────────┐
│  ⚽ FindWatchParty          [List Your Venue]       │
└────────────────────────────────────────────────────┘
```

- Nav: `sticky top-0 z-50 bg-white shadow-nav px-4 py-3 flex items-center justify-between`
- Logo: `font-bold text-gray-900 text-base` with soccer ball emoji or SVG logo
- CTA button: secondary button style (outlined, rounded-full)

### Venue Detail — Mobile Layout

Follows Airbnb's mobile detail pattern: image at top, info scrolls below.

```
┌─────────────────────────────┐
│                             │
│   [gradient placeholder]    │  ← Full width, 56vw height, no border radius
│                             │
├─────────────────────────────┤
│  Williamsburg · Brooklyn    │  ← meta gray xs
│  The Abbey Bar              │  ← venue name bold 22px
│  ⭐ 4.3 · 120 ratings       │  ← rating row
├─────────────────────────────┤
│  🎟  Free entry             │  ← detail rows with icon
│  🔊  Sound on               │
│  📅  Reservation not req.   │
│  🌐  Visit website ↗        │
│  📍  123 Bedford Ave        │
├─────────────────────────────┤
│  Fanbases                   │  ← section header
│  🇧🇷 Brazil  🇦🇷 Argentina  │  ← flag chips
├─────────────────────────────┤
│  Showing these matches      │  ← section header
│  [match date cards]         │
└─────────────────────────────┘

─── sticky bottom bar ────────
│  [Get Directions]  [Book]  │  ← or "Claim this listing" if unclaimed
└─────────────────────────────┘
```

- Sticky bottom: `fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3`
- Get Directions: secondary button (links to Google Maps URL)
- Book/Reserve: primary sky button (links to `bookingUrl`)
- If no booking URL but unclaimed: "Is this your venue?" outlined button

---

## Page Layouts

### Homepage

```
[Top Nav]
[Hero — white bg, centered]
  H1: "Find your World Cup 2026 watch party in NYC"
  Subline: "161 venues across New York and New Jersey"
  [Search bar]
[Filter Pills — horizontal scroll]
[Venue Grid — 2 col mobile, 3 col desktop]
  Show top 12 venues (featured first), "Show all →" link
[CTA Banner — sky-50 bg]
  "Own a venue? List free or get featured for $99"
[Footer]
```

### Venues Page (Directory)

```
[Top Nav]
[Page header — "Watch Party Venues in NYC"]
[Filter Pills — sticky on scroll, horizontal]
[Result count — "161 venues"]
[Venue Grid — 2 col mobile, 3 col tablet, 4 col desktop max]
[Load more / pagination]
```

No sidebar. Filters are all in the pill strip. This is the mobile-first, Airbnb-style approach.

### Venue Detail Page

See component spec above. Mobile: single column. Desktop: same layout but max-width container, image capped at 600px height.

---

## What's Removed

These elements from the old design should not appear in the new design:

- Dark gradient hero sections (`bg-gradient-to-br from-brand-700 via-brand-800 to-gray-900`)
- `uppercase tracking-widest` label text
- Heavy sidebar filters on venues page (mobile)
- Multi-item nav bar (Cities, Sports, Events links)
- `SEOHead` component (replaced by Next.js `generateMetadata`)
- Visible card borders in favor of shadow-card
- `brand-*` Tailwind colors (replaced by `sky-*` used sparingly)

---

## Tailwind Config Changes

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'card': '0 0 0 1px rgba(0,0,0,0.02), 0 2px 6px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.10)',
        'card-hover': '0 0 0 1px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.12)',
        'nav': '0 1px 0 rgba(0,0,0,0.08)',
      },
      colors: {
        // Keep existing 'brand' for now but deprecate in favor of 'sky' built-ins
        // Add nothing new — use Tailwind's sky, amber, emerald built-in palettes
      },
    },
  },
};
```
