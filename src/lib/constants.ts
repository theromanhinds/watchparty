export const SITE_NAME = 'FindWatchParty';
export const SITE_DOMAIN = 'findwatchparty.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  'Find your FIFA World Cup 2026 watch party across New York & New Jersey. 161 venues — fan zones, sports bars, and restaurants by nationality. Filter by free entry, sound on, outdoor, and more.';

// ── Monetization ───────────────────────────────────────────────
// TODO: Replace with the real Stripe Payment Link once created in the Stripe dashboard.
// Product: "Featured Listing — World Cup 2026", $99 one-time, custom fields: Venue Name, City, Email.
export const STRIPE_FEATURED_URL = 'https://buy.stripe.com/REPLACE_WITH_REAL_LINK';
export const FEATURED_PRICE = '$99';
export const CONTACT_EMAIL = 'roman.hinds17@gmail.com';


export const FANBASES = [
  { slug: 'usmnt', label: 'USA (USMNT)' },
  { slug: 'mexico', label: 'Mexico' },
  { slug: 'brazil', label: 'Brazil' },
  { slug: 'argentina', label: 'Argentina' },
  { slug: 'england', label: 'England' },
  { slug: 'france', label: 'France' },
  { slug: 'germany', label: 'Germany' },
  { slug: 'spain', label: 'Spain' },
  { slug: 'portugal', label: 'Portugal' },
  { slug: 'netherlands', label: 'Netherlands' },
  { slug: 'colombia', label: 'Colombia' },
  { slug: 'italy', label: 'Italy' },
  { slug: 'canada', label: 'Canada' },
  { slug: 'morocco', label: 'Morocco' },
  { slug: 'japan', label: 'Japan' },
  { slug: 'south-korea', label: 'South Korea' },
  { slug: 'general', label: 'General / Mixed' },
];

export const COVER_CHARGE_OPTIONS = [
  { value: 'all', label: 'Any Price' },
  { value: 'free', label: 'Free Entry' },
  { value: 'ticketed', label: 'Ticketed' },
  { value: 'varies', label: 'Varies by Game' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'A–Z' },
];

export const NAV_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/cities', label: 'Cities' },
  { href: '/venues', label: 'All Venues' },
  { href: '/sports', label: 'Sports' },
  { href: '/submit', label: 'List Your Venue' },
];

// ── Homepage / Venues filter pills (Airbnb-style category strip) ──
export interface FilterPill {
  id: string;
  label: string;
  match: (v: import('../types').Venue) => boolean;
}

export const FILTER_PILLS: FilterPill[] = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'fan-zones', label: 'Fan Zones', match: (v) => v.eventSlugs.includes('fan-zone') },
  { id: 'sports-bars', label: 'Sports Bars', match: (v) => v.venueType === 'bar' },
  { id: 'free', label: 'Free Entry', match: (v) => v.coverCharge === 'free' },
  { id: 'sound-on', label: 'Sound On', match: (v) => v.soundOn },
  { id: 'outdoor', label: 'Outdoor', match: (v) => v.outdoorScreen },
  { id: 'family', label: 'Family Friendly', match: (v) => v.familyFriendly },
];

// ── Fanbase flag chips (detail page) ──────────────────────────────
export const FANBASE_FLAGS: Record<string, string> = {
  usmnt: '🇺🇸', usa: '🇺🇸', mexico: '🇲🇽', brazil: '🇧🇷', argentina: '🇦🇷',
  england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', france: '🇫🇷', germany: '🇩🇪', spain: '🇪🇸', portugal: '🇵🇹',
  netherlands: '🇳🇱', colombia: '🇨🇴', italy: '🇮🇹', canada: '🇨🇦', morocco: '🇲🇦',
  japan: '🇯🇵', 'south-korea': '🇰🇷', norway: '🇳🇴', sweden: '🇸🇪', australia: '🇦🇺',
  'new-zealand': '🇳🇿', austria: '🇦🇹', belgium: '🇧🇪', 'cabo-verde': '🇨🇻',
  croatia: '🇭🇷', 'czech-republic': '🇨🇿', ecuador: '🇪🇨', egypt: '🇪🇬', ghana: '🇬🇭',
  haiti: '🇭🇹', iran: '🇮🇷', iraq: '🇮🇶', panama: '🇵🇦', paraguay: '🇵🇾',
  scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', senegal: '🇸🇳', 'south-africa': '🇿🇦', tunisia: '🇹🇳',
  turkey: '🇹🇷', uruguay: '🇺🇾', general: '⚽', multinational: '🌍',
};

export function fanbaseLabel(slug: string): string {
  const found = FANBASES.find((f) => f.slug === slug);
  if (found) return found.label;
  if (slug === 'general') return 'All fans';
  if (slug === 'multinational') return 'Multi-national';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
