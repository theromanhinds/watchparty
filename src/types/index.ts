// ─────────────────────────────────────────────
// Core domain types for FindWatchParty
// ─────────────────────────────────────────────

export interface Venue {
  id: string;
  slug: string;
  name: string;
  address: string;
  neighborhood?: string;
  city: string;
  citySlug: string;
  state: string;
  stateCode: string;
  zip: string;
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  instagram?: string;
  googleMapsUrl?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  imageUrl?: string;
  venueType?: string;
  matchesNote?: string;

  // Filters
  soundOn: boolean;
  coverCharge: 'free' | 'ticketed' | 'varies';
  coverChargeAmount?: string; // e.g. "$20" or "Free"
  drinkSpecials: boolean;
  drinkSpecialsNote?: string;
  familyFriendly: boolean;
  verifiedWatchParty: boolean;
  outdoorScreen: boolean;
  reservationRequired: boolean;
  bookingUrl?: string;
  capacity?: 'intimate' | 'medium' | 'large';

  // Featured / monetization
  featured: boolean;

  // Associations
  sports: string[];          // sport slugs
  fanbases: string[];        // e.g. ["mexico", "brazil", "argentina"]
  eventSlugs: string[];      // event slugs this venue hosts watch parties for
}

export interface SportingEvent {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  sport: string;
  sportSlug: string;
  description: string;
  startDate: string;   // ISO
  endDate: string;     // ISO
  imageUrl?: string;
  featured: boolean;
  hostCities: string[]; // city slugs
  tags: string[];
}

export interface City {
  id: string;
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  isHostCity: boolean;
  imageUrl?: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface Sport {
  id: string;
  slug: string;
  name: string;
  icon: string;          // emoji or icon name
  description: string;
  eventSlugs: string[];
}

export interface FilterState {
  city: string;
  sport: string;
  fanbase: string;
  coverCharge: string;  // 'all' | 'free' | 'ticketed' | 'varies'
  soundOn: boolean | null;
  familyFriendly: boolean | null;
  outdoorScreen: boolean | null;
  drinkSpecials: boolean | null;
  featured: boolean | null;
  search: string;
}

export type SortOption = 'featured' | 'rating' | 'name';
