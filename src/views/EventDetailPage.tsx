'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { EVENTS } from '../data/events';
import { VENUES } from '../data/venues';
import { CITIES } from '../data/cities';
import { SEOHead } from '../components/shared/SEOHead';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { VenueCard } from '../components/venue/VenueCard';
import { Badge } from '../components/ui/Badge';
import { NotFoundPage } from './NotFoundPage';
import { formatDateRange, isEventActive } from '../lib/utils';

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) return <NotFoundPage />;

  const venues = VENUES.filter((v) => v.eventSlugs.includes(event.slug));
  const hostCities = event.hostCities.map((cs) => CITIES.find((c) => c.slug === cs)).filter(Boolean);
  const active = isEventActive(event.startDate, event.endDate);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    sport: event.sport,
    description: event.description,
  };

  return (
    <>
      <SEOHead
        title={`${event.name} Watch Parties`}
        description={`Find bars and venues hosting ${event.name} watch parties near you. ${event.description}`}
        canonicalPath={`/events/${event.slug}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: event.name }]} />

        {/* Event header */}
        <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white">
            {active && <Badge variant="success" className="mb-3">🔴 Live Now</Badge>}
            <p className="text-brand-200 font-medium">{event.sport}</p>
            <h1 className="text-4xl font-extrabold mt-1">{event.name}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-brand-200 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDateRange(event.startDate, event.endDate)}
              </span>
              {hostCities.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {hostCities.map((c) => c!.name).join(', ')}
                </span>
              )}
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Browse by Host City */}
        {hostCities.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Host City</h2>
            <div className="flex flex-wrap gap-3">
              {hostCities.map((city) => (
                <Link
                  key={city!.slug}
                  href={`/cities/${city!.slug}?event=${event.slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
                >
                  {city!.name}, {city!.stateCode} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Venues showing this event */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Watch Party Venues
            <span className="ml-2 text-sm font-normal text-gray-400">({venues.length} venues)</span>
          </h2>
          {venues.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {venues.map((v) => <VenueCard key={v.id} venue={v} />)}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No venues listed yet. <Link href="/submit" className="text-brand-600 hover:underline">Add yours →</Link></p>
          )}
        </div>
      </div>
    </>
  );
}
