export const SITE_NAME = 'FindWatchParty';
export const SITE_DOMAIN = 'findwatchparty.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  'Find your FIFA World Cup 2026 watch party across New York & New Jersey. 161 venues — fan zones, sports bars, and restaurants by nationality. Filter by free entry, sound on, outdoor, and more.';

// ── Monetization ───────────────────────────────────────────────
export const STRIPE_FEATURED_URL = 'https://buy.stripe.com/4gM5kE2L1aRj5eQ3G1bMQ00';
export const FEATURED_PRICE = '$99';
export const CONTACT_EMAIL = 'roman@findwatchparty.com';


export const FANBASES = [
  { slug: 'usmnt', label: 'USA' },
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
];

// ISO 3166-1 alpha-2 codes for flag-icons (fi fi-{code})
export const FANBASE_ISO: Record<string, string> = {
  usmnt: 'us',
  mexico: 'mx',
  brazil: 'br',
  argentina: 'ar',
  england: 'gb-eng',
  france: 'fr',
  germany: 'de',
  spain: 'es',
  portugal: 'pt',
  netherlands: 'nl',
  colombia: 'co',
  italy: 'it',
  canada: 'ca',
  morocco: 'ma',
  japan: 'jp',
  'south-korea': 'kr',
};

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
