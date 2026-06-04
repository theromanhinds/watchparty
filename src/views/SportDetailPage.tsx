'use client';

import { useParams } from 'next/navigation';
import { SPORTS } from '../data/sports';
import { VENUES } from '../data/venues';
import { EVENTS } from '../data/events';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { VenueCard } from '../components/venue/VenueCard';
import { EventCard } from '../components/event/EventCard';
import { NotFoundPage } from './NotFoundPage';

export function SportDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const sport = SPORTS.find((s) => s.slug === slug);
  if (!sport) return <NotFoundPage />;

  const venues = VENUES.filter((v) => v.sports.includes(sport.slug));
  const events = EVENTS.filter((e) => e.sportSlug === sport.slug);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sports', href: '/sports' }, { label: sport.name }]} />

        <div className="mt-6">
          <div className="text-5xl mb-2">{sport.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900">{sport.name} Watch Parties</h1>
          <p className="mt-1 text-gray-500">{sport.description}</p>
        </div>

        {events.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Venues Showing {sport.name}
            <span className="ml-2 text-sm font-normal text-gray-400">({venues.length})</span>
          </h2>
          {venues.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {venues.map((v) => <VenueCard key={v.id} venue={v} />)}
            </div>
          ) : (
            <p className="text-gray-500">No venues listed yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
