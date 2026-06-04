import type { Venue } from '../types';

// Photo-placeholder gradient, city/borough-coded per the style guide.
export function getVenueGradient(venue: Venue): string {
  if (venue.eventSlugs.includes('fan-zone')) return 'from-amber-500 to-orange-700';
  if (venue.citySlug === 'new-jersey') return 'from-rose-600 to-pink-900';
  switch (venue.city) {
    case 'Brooklyn':
      return 'from-emerald-600 to-teal-900';
    case 'Queens':
      return 'from-purple-600 to-indigo-900';
    case 'Bronx':
      return 'from-orange-600 to-red-900';
    case 'Staten Island':
      return 'from-slate-500 to-slate-800';
    default:
      // Manhattan / default NYC
      return 'from-sky-600 to-sky-900';
  }
}

export function coverChargeLabel(venue: Venue): string {
  if (venue.coverCharge === 'free') return 'Free entry';
  if (venue.coverCharge === 'ticketed') {
    return venue.coverChargeAmount ? `From ${venue.coverChargeAmount}` : 'Ticketed';
  }
  return 'Varies';
}

export function googleMapsUrl(venue: Venue): string {
  return (
    venue.googleMapsUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(`${venue.name} ${venue.address} ${venue.city}`)}`
  );
}
