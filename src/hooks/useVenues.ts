import { useMemo } from 'react';
import { VENUES } from '../data/venues';
import { sortVenues } from '../lib/featured';
import type { FilterState, SortOption, Venue } from '../types';

export function useVenues(filters: Partial<FilterState>, sort: SortOption = 'featured'): Venue[] {
  return useMemo(() => {
    let results = [...VENUES];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.address.toLowerCase().includes(q) ||
          v.description?.toLowerCase().includes(q)
      );
    }

    if (filters.city && filters.city !== 'all') {
      results = results.filter((v) => v.citySlug === filters.city);
    }

    if (filters.neighborhood && filters.neighborhood !== 'all') {
      results = results.filter((v) => v.neighborhood === filters.neighborhood);
    }

    if (filters.sport && filters.sport !== 'all') {
      results = results.filter((v) => v.sports.includes(filters.sport!));
    }

    if (filters.fanbase && filters.fanbase !== 'all') {
      results = results.filter((v) => v.fanbases.includes(filters.fanbase!));
    }

    if (filters.coverCharge && filters.coverCharge !== 'all') {
      results = results.filter((v) => v.coverCharge === filters.coverCharge);
    }

    if (filters.soundOn === true) {
      results = results.filter((v) => v.soundOn);
    }

    if (filters.familyFriendly === true) {
      results = results.filter((v) => v.familyFriendly);
    }

    if (filters.outdoorScreen === true) {
      results = results.filter((v) => v.outdoorScreen);
    }

    if (filters.drinkSpecials === true) {
      results = results.filter((v) => v.drinkSpecials);
    }

    if (filters.featured === true) {
      results = results.filter((v) => v.featured);
    }

    return sortVenues(results, sort, {
      neighborhood: filters.neighborhood && filters.neighborhood !== 'all' ? filters.neighborhood : undefined,
      matchSlug: filters.matchSlug,
    });
  }, [filters, sort]);
}
