export const SITE_NAME = 'FindWatchParty';
export const SITE_DOMAIN = 'findwatchparty.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  'Find the perfect sports watch party near you. Filter by city, sport, fanbase, price, and vibe. World Cup, NBA Finals, NFL playoffs and more.';

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
