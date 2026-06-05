'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { VenueCard } from '../components/venue/VenueCard';
import { FilterPills } from '../components/venue/FilterPills';
import { VENUES } from '../data/venues';
import { FILTER_PILLS, FEATURED_PRICE } from '../lib/constants';

const HOME_LIMIT = 12;

export function HomePage() {
  const [search, setSearch] = useState('');
  const [activePill, setActivePill] = useState('all');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/venues?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/venues');
    }
  };

  const matcher = FILTER_PILLS.find((p) => p.id === activePill)?.match ?? (() => true);

  const venues = useMemo(() => {
    const filtered = VENUES.filter(matcher);
    return [...filtered]
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
      .slice(0, HOME_LIMIT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePill]);

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-4 py-12 text-center">
        <p className="text-xs font-medium text-gray-500">
          FIFA World Cup 2026 · New York &amp; New Jersey
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-snug text-gray-900">
          Find Your World Cup Watch Party
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {VENUES.length} venues across New York and New Jersey
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-card"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by venue or neighborhood…"
            aria-label="Search venues"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600"
          >
            <Search size={16} />
          </button>
        </form>
      </section>

      {/* Filter pills */}
      <FilterPills selected={activePill} onSelect={setActivePill} sticky />

      {/* Venue grid */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        {venues.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-500">
            No venues match this filter yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/venues"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            Show all {VENUES.length} venues →
          </Link>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-4 mb-12 mt-4 rounded-2xl bg-sky-50 px-6 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Own a watch party venue?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
          Get a free listing or go featured for {FEATURED_PRICE} for the full World Cup tournament.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/submit"
            className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
          >
            List Free
          </Link>
          <Link
            href="/submit#featured"
            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            Get Featured — {FEATURED_PRICE}
          </Link>
        </div>
      </section>
    </>
  );
}
