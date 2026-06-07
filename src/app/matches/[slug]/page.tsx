import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { MATCHES, formatMatchDate, getMatchBySlug, matchDisplayName } from '@/data/matches';
import { VENUES } from '@/data/venues';
import { VenueGrid } from '@/components/venue/VenueGrid';
import { sortVenues } from '@/lib/featured';
import { SITE_URL, STRIPE_FEATURED_URL } from '@/lib/constants';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MATCHES.map((match) => ({ slug: match.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const match = getMatchBySlug(slug);
  if (!match) return { title: 'Match Not Found | FindWatchParty' };

  const title = `${match.team1} vs ${match.team2} Watch Party NYC | World Cup 2026`;
  const description = `Find NYC and New Jersey watch party venues for ${matchDisplayName(match)} on ${formatMatchDate(match)} at ${match.timeET}.`;
  const url = `${SITE_URL}/matches/${match.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const match = getMatchBySlug(slug);
  if (!match) notFound();

  const venues = sortVenues(VENUES, 'featured', { matchSlug: match.slug });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${matchDisplayName(match)} - FIFA World Cup 2026`,
    startDate: match.isoDateTimeET,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: match.stadium,
    },
    organizer: {
      '@type': 'Organization',
      name: 'FIFA',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white">
        <section className="border-b border-gray-200 px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <Link href="/matches" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
              Match schedule
            </Link>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-sky-600">
                  {match.group} - Match {match.matchNumber}
                </p>
                <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900">
                  {matchDisplayName(match)} Watch Parties
                </h1>
                <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:flex-wrap">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} className="text-gray-400" />
                    {formatMatchDate(match)} at {match.timeET}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {match.stadium}
                  </span>
                </div>
              </div>
              {match.isLocalMatch && (
                <span className="inline-flex self-start rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 lg:self-auto">
                  MetLife Stadium match
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-5 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-gray-700">
            Most listed venues show all World Cup matches. Confirm reservation and audio
            details with the venue before match day.
          </div>

          <VenueGrid venues={venues} featuredContext={{ matchSlug: match.slug }} />

          <div className="mt-8 rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm sm:flex sm:items-center sm:justify-between">
            <span className="text-gray-700">Own a venue? Get the top slot for this match.</span>
            <a
              href={STRIPE_FEATURED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-600 sm:mt-0"
            >
              Get featured
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
