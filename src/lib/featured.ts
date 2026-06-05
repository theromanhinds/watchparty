import type { SortOption, Venue } from '../types';

export interface FeaturedContext {
  neighborhood?: string;
  matchSlug?: string;
}

function sameNeighborhood(a?: string, b?: string): boolean {
  return Boolean(a && b && a.toLowerCase() === b.toLowerCase());
}

export function isMatchFeatured(venue: Venue, matchSlug?: string): boolean {
  return Boolean(
    matchSlug &&
      venue.featuredTier === 'match' &&
      venue.featuredMatchSlugs?.includes(matchSlug)
  );
}

export function isNeighborhoodFeatured(venue: Venue, neighborhood?: string): boolean {
  return Boolean(
    neighborhood &&
      venue.featuredTier === 'neighborhood' &&
      sameNeighborhood(venue.featuredNeighborhood, neighborhood)
  );
}

export function getFeaturedRank(venue: Venue, context: FeaturedContext = {}): number {
  if (isMatchFeatured(venue, context.matchSlug)) return 3;
  if (isNeighborhoodFeatured(venue, context.neighborhood)) return 2;
  if (venue.featuredTier === 'city' || (venue.featured && !venue.featuredTier)) return 1;
  return 0;
}

export function getFeaturedBadgeLabel(venue: Venue, context: FeaturedContext = {}): string | undefined {
  if (isMatchFeatured(venue, context.matchSlug)) return 'Top Pick for This Match';
  if (isNeighborhoodFeatured(venue, context.neighborhood)) {
    return `Top Pick in ${context.neighborhood}`;
  }
  if (venue.featuredTier === 'city' || (venue.featured && !venue.featuredTier)) return 'Featured';
  return undefined;
}

export function sortVenues(
  venues: Venue[],
  sort: SortOption = 'featured',
  context: FeaturedContext = {}
): Venue[] {
  return [...venues].sort((a, b) => {
    const featuredDiff = getFeaturedRank(b, context) - getFeaturedRank(a, context);
    if (featuredDiff !== 0) return featuredDiff;

    if (sort === 'rating' || sort === 'featured') {
      const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
      if (ratingDiff !== 0) return ratingDiff;
    }

    return a.name.localeCompare(b.name);
  });
}
