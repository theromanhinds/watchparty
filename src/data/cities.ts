import type { City } from '../types';

export const CITIES: City[] = [
  // ── World Cup 2026 Host Cities (US) ──────────────────────────────
  { id: 'nyc', slug: 'new-york', name: 'New York', state: 'New York', stateCode: 'NY', isHostCity: true, lat: 40.7128, lng: -74.006, description: 'The biggest city in the US, home to MetLife Stadium and a massive international fanbase.' },
  { id: 'la', slug: 'los-angeles', name: 'Los Angeles', state: 'California', stateCode: 'CA', isHostCity: true, lat: 34.0522, lng: -118.2437, description: 'LA brings star power and a massive Latin American fanbase to World Cup 2026.' },
  { id: 'miami', slug: 'miami', name: 'Miami', state: 'Florida', stateCode: 'FL', isHostCity: true, lat: 25.7617, lng: -80.1918, description: 'Miami\'s vibrant Latin culture makes it the most electric host city for watch parties.' },
  { id: 'dallas', slug: 'dallas', name: 'Dallas', state: 'Texas', stateCode: 'TX', isHostCity: true, lat: 32.7767, lng: -96.797, description: 'AT&T Stadium hosts matches in one of America\'s most passionate sports cities.' },
  { id: 'houston', slug: 'houston', name: 'Houston', state: 'Texas', stateCode: 'TX', isHostCity: true, lat: 29.7604, lng: -95.3698, description: 'The most diverse city in the US — a melting pot of World Cup fanbases.' },
  { id: 'atlanta', slug: 'atlanta', name: 'Atlanta', state: 'Georgia', stateCode: 'GA', isHostCity: true, lat: 33.749, lng: -84.388, description: 'Mercedes-Benz Stadium and a thriving soccer community.' },
  { id: 'boston', slug: 'boston', name: 'Boston', state: 'Massachusetts', stateCode: 'MA', isHostCity: true, lat: 42.3601, lng: -71.0589, description: 'Gillette Stadium hosts World Cup matches near one of America\'s great sports cities.' },
  { id: 'philly', slug: 'philadelphia', name: 'Philadelphia', state: 'Pennsylvania', stateCode: 'PA', isHostCity: true, lat: 39.9526, lng: -75.1652, description: 'A passionate sports city with deep roots in soccer and a growing fanbase.' },
  { id: 'seattle', slug: 'seattle', name: 'Seattle', state: 'Washington', stateCode: 'WA', isHostCity: true, lat: 47.6062, lng: -122.3321, description: 'Lumen Field and a dedicated Sounders fanbase make Seattle a top watch party city.' },
  { id: 'sf', slug: 'san-francisco', name: 'San Francisco', state: 'California', stateCode: 'CA', isHostCity: true, lat: 37.7749, lng: -122.4194, description: 'Bay Area soccer culture and one of the most international cities in America.' },
  { id: 'kc', slug: 'kansas-city', name: 'Kansas City', state: 'Missouri', stateCode: 'MO', isHostCity: true, lat: 39.0997, lng: -94.5786, description: 'Children\'s Mercy Park hosts World Cup and a city known for devoted fans.' },
  // ── Non-host Major Cities ──────────────────────────────────────
  { id: 'chicago', slug: 'chicago', name: 'Chicago', state: 'Illinois', stateCode: 'IL', isHostCity: false, lat: 41.8781, lng: -87.6298, description: 'Chicago\'s massive soccer scene and world-class bars make it a top watch party destination.' },
  { id: 'vegas', slug: 'las-vegas', name: 'Las Vegas', state: 'Nevada', stateCode: 'NV', isHostCity: false, lat: 36.1699, lng: -115.1398, description: 'Vegas knows how to host a party — and watch parties are no exception.' },
  { id: 'nashville', slug: 'nashville', name: 'Nashville', state: 'Tennessee', stateCode: 'TN', isHostCity: false, lat: 36.1627, lng: -86.7816, description: 'A growing soccer scene in one of America\'s hottest cities.' },
  { id: 'denver', slug: 'denver', name: 'Denver', state: 'Colorado', stateCode: 'CO', isHostCity: false, lat: 39.7392, lng: -104.9903, description: 'Denver\'s outdoor culture meets major sports bar scene.' },
  { id: 'neworleans', slug: 'new-orleans', name: 'New Orleans', state: 'Louisiana', stateCode: 'LA', isHostCity: false, lat: 29.9511, lng: -90.0715, description: 'The party capital of the South — nobody does a watch party like New Orleans.' },
  { id: 'austin', slug: 'austin', name: 'Austin', state: 'Texas', stateCode: 'TX', isHostCity: false, lat: 30.2672, lng: -97.7431, description: 'Austin FC fans and a thriving young crowd make Austin a must for watch parties.' },
  { id: 'dc', slug: 'washington-dc', name: 'Washington DC', state: 'DC', stateCode: 'DC', isHostCity: false, lat: 38.9072, lng: -77.0369, description: 'The capital city with a huge international community and top sports bars.' },
  { id: 'orlando', slug: 'orlando', name: 'Orlando', state: 'Florida', stateCode: 'FL', isHostCity: false, lat: 28.5383, lng: -81.3792, description: 'A tourism hub with watch party venues for every sport and every fanbase.' },
  { id: 'portland', slug: 'portland', name: 'Portland', state: 'Oregon', stateCode: 'OR', isHostCity: false, lat: 45.5051, lng: -122.675, description: 'Timbers Army and Portland\'s soccer culture run deep.' },
  { id: 'phoenix', slug: 'phoenix', name: 'Phoenix', state: 'Arizona', stateCode: 'AZ', isHostCity: false, lat: 33.4484, lng: -112.074, description: 'A growing sports scene in one of America\'s fastest-growing metro areas.' },
];
