import { useState, useCallback } from 'react';
import type { FilterState, SortOption } from '../types';

const DEFAULT_FILTERS: FilterState = {
  city: 'all',
  neighborhood: 'all',
  sport: 'all',
  fanbase: 'all',
  coverCharge: 'all',
  soundOn: null,
  familyFriendly: null,
  outdoorScreen: null,
  drinkSpecials: null,
  featured: null,
  search: '',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('featured');

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSort('featured');
  }, []);

  const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'search') return val !== '';
    if (key === 'matchSlug') return false;
    if (typeof val === 'string') return val !== 'all';
    return val !== null;
  }).length;

  return { filters, sort, updateFilter, setSort, resetFilters, activeFilterCount };
}
