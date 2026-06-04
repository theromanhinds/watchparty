'use client';

import { EventCard } from '../components/event/EventCard';
import { EVENTS } from '../data/events';
import { SPORTS } from '../data/sports';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function EventsPage() {
  const [activeSport, setActiveSport] = useState<string>('all');

  const filtered = activeSport === 'all'
    ? EVENTS
    : EVENTS.filter((e) => e.sportSlug === activeSport);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Sporting Events</h1>
        <p className="mt-1 text-gray-500">Find watch parties for every major event</p>

        {/* Sport tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSport('all')}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              activeSport === 'all'
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            )}
          >
            All Sports
          </button>
          {SPORTS.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActiveSport(s.slug)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                activeSport === s.slug
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              )}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
