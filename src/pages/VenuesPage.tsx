import { useState } from 'react';
import { SEOHead } from '../components/shared/SEOHead';
import { VenueFilters } from '../components/venue/VenueFilters';
import { VenueGrid } from '../components/venue/VenueGrid';
import { SearchBar } from '../components/search/SearchBar';
import { useFilters } from '../hooks/useFilters';
import { useVenues } from '../hooks/useVenues';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export function VenuesPage() {
  const [searchParams] = useSearchParams();
  const { filters, sort, updateFilter, setSort, resetFilters, activeFilterCount } = useFilters();
  const [showFilters, setShowFilters] = useState(false);

  // Hydrate search from URL params
  useEffect(() => {
    const s = searchParams.get('search');
    const city = searchParams.get('city');
    if (s) updateFilter('search', s);
    if (city) updateFilter('city', city);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const venues = useVenues(filters, sort);

  return (
    <>
      <SEOHead title="Find Watch Party Venues" description="Browse all sports watch party venues. Filter by city, sport, fanbase, price, and vibe." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Watch Party Venues</h1>
          <p className="mt-1 text-gray-500">Find the perfect bar or venue for every sport and every fanbase</p>
        </div>

        {/* Search + filter toggle */}
        <div className="mb-6 flex gap-3">
          <SearchBar
            value={filters.search}
            onChange={(v) => updateFilter('search', v)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={() => setShowFilters((v) => !v)}
            className="md:hidden shrink-0"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-brand-600 px-1.5 py-0.5 text-xs text-white">{activeFilterCount}</span>
            )}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters — always visible on md+ */}
          <div className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <VenueFilters
              filters={filters}
              sort={sort}
              activeFilterCount={activeFilterCount}
              onUpdate={updateFilter}
              onSortChange={setSort}
              onReset={resetFilters}
            />
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <VenueGrid venues={venues} onReset={resetFilters} />
          </div>
        </div>
      </div>
    </>
  );
}
