import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { MATCHES, formatMatchDate, matchDisplayName } from '@/data/matches';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'World Cup 2026 Match Schedule | Watch Parties in NYC & NJ',
  description:
    'Browse the FIFA World Cup 2026 match schedule and find NYC and New Jersey watch party venues for every match.',
  alternates: { canonical: `${SITE_URL}/matches` },
};

export default function Page() {
  const localMatches = MATCHES.filter((match) => match.isLocalMatch).length;

  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wide text-sky-600">
            FIFA World Cup 2026
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            World Cup 2026 Match Schedule
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            All {MATCHES.length} matches, shown in Eastern Time for New York and New Jersey
            watch party planning. {localMatches} matches are scheduled at MetLife Stadium.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MATCHES.map((match) => (
            <Link
              key={match.id}
              href={`/matches/${match.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Match {match.matchNumber}
                </span>
                {match.isLocalMatch && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                    MetLife
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-base font-semibold leading-snug text-gray-900">
                {matchDisplayName(match)}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{match.group}</p>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-gray-400" />
                  {formatMatchDate(match)} at {match.timeET}
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
                  <span>{match.stadium}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
