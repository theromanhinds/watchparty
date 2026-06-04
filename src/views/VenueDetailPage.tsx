'use client';

import Link from 'next/link';
import {
  Globe,
  Ticket,
  Volume2,
  VolumeX,
  CalendarCheck,
  Sun,
  MapPin,
  AtSign,
  Users,
} from 'lucide-react';
import { VENUES } from '../data/venues';
import { NotFoundPage } from './NotFoundPage';
import {
  FANBASE_FLAGS,
  fanbaseLabel,
  STRIPE_FEATURED_URL,
  FEATURED_PRICE,
} from '../lib/constants';
import { getVenueGradient, coverChargeLabel, googleMapsUrl } from '../lib/venueDisplay';
import { cn } from '../lib/utils';

interface VenueDetailPageProps {
  slug: string;
}

export function VenueDetailPage({ slug }: VenueDetailPageProps) {
  const venue = VENUES.find((v) => v.slug === slug);
  if (!venue) return <NotFoundPage />;

  const gradient = getVenueGradient(venue);
  const mapsUrl = googleMapsUrl(venue);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressLocality: venue.city,
      addressRegion: venue.stateCode,
      addressCountry: 'US',
    },
    url: venue.website,
  };

  const detailRows = [
    {
      icon: <Ticket size={18} className="text-gray-500" />,
      label: venue.coverChargeAmount
        ? `${coverChargeLabel(venue)} (${venue.coverChargeAmount})`
        : coverChargeLabel(venue),
    },
    {
      icon: venue.soundOn ? (
        <Volume2 size={18} className="text-emerald-600" />
      ) : (
        <VolumeX size={18} className="text-gray-400" />
      ),
      label: venue.soundOn ? 'Sound on during matches' : 'Silent / no match audio',
    },
    {
      icon: <CalendarCheck size={18} className="text-gray-500" />,
      label: venue.reservationRequired ? 'Reservation required' : 'Walk-ins welcome',
    },
    ...(venue.outdoorScreen
      ? [{ icon: <Sun size={18} className="text-amber-500" />, label: 'Outdoor screen' }]
      : []),
    ...(venue.familyFriendly
      ? [{ icon: <Users size={18} className="text-gray-500" />, label: 'Family friendly' }]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero image */}
      <div
        className={cn(
          'relative flex h-[56vw] max-h-80 w-full items-center justify-center bg-gradient-to-br',
          gradient
        )}
      >
        {venue.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-white">
            ⭐ Featured
          </span>
        )}
        {venue.verifiedWatchParty && (
          <span className="absolute right-3 top-3 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-600">
            ✓ Verified
          </span>
        )}
        <span className="text-6xl opacity-90 drop-shadow" aria-hidden>
          ⚽
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto -mt-4 max-w-2xl rounded-t-2xl bg-white px-5 pb-28 pt-6">
        <p className="text-xs text-gray-500">
          {venue.neighborhood ? `${venue.neighborhood} · ` : ''}
          {venue.city}, {venue.stateCode}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">{venue.name}</h1>
        {venue.venueType && (
          <p className="mt-1 text-sm capitalize text-gray-500">{venue.venueType}</p>
        )}

        <hr className="my-5 border-gray-100" />

        {/* Detail rows */}
        <ul className="space-y-3">
          {detailRows.map((row, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
              {row.icon}
              <span>{row.label}</span>
            </li>
          ))}
          {venue.website && (
            <li>
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                <Globe size={18} /> Visit website ↗
              </a>
            </li>
          )}
          {venue.instagram && (
            <li>
              <a
                href={venue.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                <AtSign size={18} /> Instagram ↗
              </a>
            </li>
          )}
          <li>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              <MapPin size={18} /> Get directions ↗
            </a>
          </li>
        </ul>

        {/* Description */}
        {venue.description && (
          <>
            <hr className="my-5 border-gray-100" />
            <p className="text-sm leading-normal text-gray-700">{venue.description}</p>
          </>
        )}

        {/* Fanbases */}
        {venue.fanbases.length > 0 && (
          <>
            <hr className="my-5 border-gray-100" />
            <h2 className="text-base font-semibold text-gray-900">Fanbases</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {venue.fanbases.map((fb) => (
                <span
                  key={fb}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  <span aria-hidden>{FANBASE_FLAGS[fb] ?? '⚽'}</span>
                  {fanbaseLabel(fb)}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Matches */}
        {venue.matchesNote && venue.matchesNote.toLowerCase() !== 'unknown' && (
          <>
            <hr className="my-5 border-gray-100" />
            <h2 className="text-base font-semibold text-gray-900">Showing these matches</h2>
            <p className="mt-2 text-sm leading-normal text-gray-600">{venue.matchesNote}</p>
          </>
        )}

        {/* Featured upsell + claim */}
        <hr className="my-5 border-gray-100" />
        <div className="flex flex-col items-start gap-2">
          <a
            href={STRIPE_FEATURED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
          >
            Get more visibility — {FEATURED_PRICE} →
          </a>
          <Link
            href={`/submit?claim=true&venue=${venue.slug}`}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Is this your venue? Claim it free →
          </Link>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-3 border-t border-gray-200 bg-white p-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
        >
          Get Directions
        </a>
        {venue.bookingUrl ? (
          <a
            href={venue.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            Book a Spot
          </a>
        ) : (
          <Link
            href={`/submit?claim=true&venue=${venue.slug}`}
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
          >
            Claim this listing
          </Link>
        )}
      </div>
    </>
  );
}
