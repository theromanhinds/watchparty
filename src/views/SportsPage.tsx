'use client';

import { SPORTS } from '../data/sports';
import { EVENTS } from '../data/events';
import Link from 'next/link';

export function SportsPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse by Sport</h1>
        <p className="mt-1 text-gray-500">Find watch party venues for every sport</p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPORTS.map((sport) => {
            const sportEvents = EVENTS.filter((e) => e.sportSlug === sport.slug);
            return (
              <Link
                key={sport.id}
                href={`/sports/${sport.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                aria-label={`Watch parties for ${sport.name}`}
              >
                <div className="text-5xl mb-3">{sport.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {sport.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{sport.description}</p>
                {sportEvents.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {sportEvents.slice(0, 3).map((e) => (
                      <span key={e.id} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {e.shortName ?? e.name}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-4 text-sm font-medium text-brand-600 group-hover:underline">Find venues →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
