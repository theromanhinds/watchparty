import { VENUES } from '../data/venues';

export interface NeighborhoodGroup {
  label: string;
  neighborhoods: string[];
}

const GROUP_ORDER = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island',
  'New Jersey',
];

function groupForVenue(city: string, citySlug: string): string {
  if (citySlug === 'new-jersey') return 'New Jersey';
  return city;
}

export const NEIGHBORHOOD_GROUPS: NeighborhoodGroup[] = (() => {
  const groups = new Map<string, Set<string>>();

  VENUES.forEach((venue) => {
    const neighborhood = venue.neighborhood?.trim();
    if (!neighborhood || neighborhood.toLowerCase() === 'unknown') return;

    const label = groupForVenue(venue.city, venue.citySlug);
    if (!groups.has(label)) groups.set(label, new Set());
    groups.get(label)?.add(neighborhood);
  });

  return [...groups.entries()]
    .sort(([a], [b]) => {
      const ai = GROUP_ORDER.indexOf(a);
      const bi = GROUP_ORDER.indexOf(b);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      return a.localeCompare(b);
    })
    .map(([label, neighborhoods]) => ({
      label,
      neighborhoods: [...neighborhoods].sort((a, b) => a.localeCompare(b)),
    }));
})();
