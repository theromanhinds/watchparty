'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { VenueCard } from '../components/venue/VenueCard';
import { FilterPills } from '../components/venue/FilterPills';
import { FanbasePills } from '../components/venue/FanbasePills';
import { Select } from '../components/ui/Select';
import { VENUES } from '../data/venues';
import { FILTER_PILLS, FEATURED_PRICE } from '../lib/constants';
import { sortVenues } from '../lib/featured';
import { NEIGHBORHOOD_GROUPS } from '../lib/neighborhoods';

export function VenuesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [neighborhood, setNeighborhood] = useState(searchParams.get('neighborhood') ?? 'all');
  const [activeFanbase, setActiveFanbase] = useState(searchParams.get('fanbase') ?? 'all');
  const [activePill, setActivePill] = useState('all');

  const matcher = FILTER_PILLS.find((p) => p.id === activePill)?.match ?? (() => true);
  const selectedNeighborhood = neighborhood !== 'all' ? neighborhood : undefined;

  const neighborhoodGroups = NEIGHBORHOOD_GROUPS.map((group) => ({
    label: group.label,
    options: group.neighborhoods.map((value) => ({ value, label: value })),
  }));

  const replaceQuery = (next: { search?: string; neighborhood?: string; fanbase?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextSearch = next.search ?? search;
    const nextNeighborhood = next.neighborhood ?? neighborhood;
    const nextFanbase = next.fanbase ?? activeFanbase;

    if (nextSearch.trim()) params.set('search', nextSearch.trim());
    else params.delete('search');

    if (nextNeighborhood && nextNeighborhood !== 'all') params.set('neighborhood', nextNeighborhood);
    else params.delete('neighborhood');

    if (nextFanbase && nextFanbase !== 'all') params.set('fanbase', nextFanbase);
    else params.delete('fanbase');

    const query = params.toString();
    router.replace(query ? `/venues?${query}` : '/venues', { scroll: false });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    replaceQuery({ search });
  };

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    replaceQuery({ neighborhood: value });
  };

  const handleFanbaseChange = (value: string) => {
    setActiveFanbase(value);
    replaceQuery({ fanbase: value });
  };

  const venues = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = VENUES.filter(matcher)
      .filter((v) => !selectedNeighborhood || v.neighborhood === selectedNeighborhood)
      .filter((v) => activeFanbase === 'all' || v.fanbases.includes(activeFanbase))
      .filter((v) => {
        if (!q) return true;
        return (
          v.name.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          (v.neighborhood?.toLowerCase().includes(q) ?? false) ||
          v.address.toLowerCase().includes(q) ||
          v.fanbases.some((f) => f.includes(q))
        );
      });

    return sortVenues(filtered, 'featured', { neighborhood: selectedNeighborhood });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activePill, selectedNeighborhood, activeFanbase]);

  return (
    <>
      {/* Page header */}
      <div className="bg-white px-4 pb-2 pt-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold text-gray-900">Watch Party Venues in NYC &amp; NJ</h1>
          <p className="mt-1 text-sm text-gray-500">
            {venues.length} venue{venues.length !== 1 ? 's' : ''} for FIFA World Cup 2026
          </p>

          {/* Search */}
          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,28rem)_minmax(14rem,20rem)] sm:items-end">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 shadow-card"
          >
            <Search size={16} className="shrink-0 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by venue, neighborhood, or fanbase…"
              aria-label="Search venues"
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </form>
          <Select
            label="Neighborhood"
            value={neighborhood}
            options={[{ value: 'all', label: 'All neighborhoods' }]}
            groups={neighborhoodGroups}
            onChange={(e) => handleNeighborhoodChange(e.target.value)}
          />
        </div>
        </div>
      </div>

      {/* Filter pills */}
      <FilterPills selected={activePill} onSelect={setActivePill} sticky />

      {/* Team / fanbase pills */}
      <FanbasePills selected={activeFanbase} onSelect={handleFanbaseChange} />

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        {venues.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-3xl">🔍</p>
            <p className="mt-3 text-sm font-medium text-gray-900">No venues found</p>
            <p className="mt-1 text-sm text-gray-500">Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {venues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                featuredContext={{ neighborhood: selectedNeighborhood }}
              />
            ))}
          </div>
        )}

        {/* Slim featured banner */}
        <div className="mt-6 flex flex-col gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-gray-700">
            Own this venue? <strong>List free</strong> · Go Featured for {FEATURED_PRICE}
          </span>
          <Link
            href="/submit#featured"
            className="inline-block self-start rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-600 sm:self-auto"
          >
            Get Featured
          </Link>
        </div>
      </section>
    </>
  );
}
