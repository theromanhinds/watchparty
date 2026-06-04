'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { CITIES } from '../data/cities';
import { VENUES } from '../data/venues';
import { EVENTS } from '../data/events';
import { SEOHead } from '../components/shared/SEOHead';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { VenueCard } from '../components/venue/VenueCard';
import { Badge } from '../components/ui/Badge';
import { NotFoundPage } from './NotFoundPage';

export function CityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const eventFilter = searchParams.get('event');

  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return <NotFoundPage />;

  const cityEvents = EVENTS.filter((e) => e.hostCities.includes(city.slug));
  let venues = VENUES.filter((v) => v.citySlug === city.slug);
  if (eventFilter) {
    venues = venues.filter((v) => v.eventSlugs.includes(eventFilter));
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'City',
    name: city.name,
    containedInPlace: { '@type': 'State', name: city.state },
  };

  return (
    <>
      <SEOHead
        title={`Watch Party Venues in ${city.name}, ${city.stateCode}`}
        description={`Find the best bars and venues hosting sports watch parties in ${city.name}. Filter by sport, fanbase, price, and more.`}
        canonicalPath={`/cities/${city.slug}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cities', href: '/cities' }, { label: city.name }]} />

        <div className="mt-6 flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin size={24} className="text-brand-600" />
                {city.name}, {city.stateCode}
              </h1>
              {city.isHostCity && <Badge variant="featured">World Cup Host</Badge>}
            </div>
            {city.description && <p className="mt-2 text-gray-600 max-w-2xl">{city.description}</p>}
          </div>
        </div>

        {/* Events in this city */}
        {cityEvents.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 self-center">Hosting:</span>
            {cityEvents.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-sm text-brand-700 hover:bg-brand-100 transition-colors"
              >
                {event.shortName ?? event.name}
              </Link>
            ))}
          </div>
        )}

        {/* Venues */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Watch Party Venues in {city.name}
            <span className="ml-2 text-sm font-normal text-gray-400">({venues.length})</span>
          </h2>

          {venues.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {venues.map((v) => <VenueCard key={v.id} venue={v} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center">
              <p className="text-gray-500">No venues listed yet for {city.name}.</p>
              <Link href="/submit" className="mt-3 inline-block text-sm text-brand-600 hover:underline">
                List your venue →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
