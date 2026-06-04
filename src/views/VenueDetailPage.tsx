'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Globe, Star, ExternalLink, Volume2, Users, Calendar } from 'lucide-react';
import { VENUES } from '../data/venues';
import { EVENTS } from '../data/events';
import { SEOHead } from '../components/shared/SEOHead';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NotFoundPage } from './NotFoundPage';
import { FANBASES } from '../lib/constants';
import { formatDateRange } from '../lib/utils';

export function VenueDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const venue = VENUES.find((v) => v.slug === slug);

  if (!venue) return <NotFoundPage />;

  const hostedEvents = EVENTS.filter((e) => venue.eventSlugs.includes(e.slug));
  const fanbases = venue.fanbases.map((s) => FANBASES.find((f) => f.slug === s)?.label ?? s);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressLocality: venue.city,
      addressRegion: venue.stateCode,
      postalCode: venue.zip,
      addressCountry: 'US',
    },
    telephone: venue.phone,
    url: venue.website,
    aggregateRating: venue.rating
      ? { '@type': 'AggregateRating', ratingValue: venue.rating, reviewCount: venue.reviewCount }
      : undefined,
  };

  return (
    <>
      <SEOHead
        title={`${venue.name} — Watch Parties in ${venue.city}`}
        description={venue.description ?? `Watch party venue in ${venue.city}, ${venue.stateCode}.`}
        canonicalPath={`/venues/${venue.slug}`}
      />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Venues', href: '/venues' },
            { label: venue.city, href: `/cities/${venue.citySlug}` },
            { label: venue.name },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-brand-600 to-brand-900 p-8">
                {venue.featured && <Badge variant="featured" className="mb-3">⭐ Featured Venue</Badge>}
                <h1 className="text-3xl font-extrabold text-white">{venue.name}</h1>
                <p className="flex items-center gap-2 mt-2 text-brand-200">
                  <MapPin size={16} />
                  {venue.address}, {venue.city}, {venue.stateCode} {venue.zip}
                </p>
                {venue.rating && (
                  <div className="flex items-center gap-2 mt-2 text-white">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{venue.rating.toFixed(1)}</span>
                    <span className="text-brand-200 text-sm">({venue.reviewCount?.toLocaleString()} reviews)</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                {venue.description && <p className="text-gray-700 leading-relaxed">{venue.description}</p>}
              </div>
            </div>

            {/* Hosted Events */}
            {hostedEvents.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar size={16} /> Hosting Watch Parties For
                </h2>
                <div className="space-y-3">
                  {hostedEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:border-brand-200 hover:bg-brand-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{event.name}</p>
                        <p className="text-sm text-gray-500">{formatDateRange(event.startDate, event.endDate)}</p>
                      </div>
                      <ExternalLink size={14} className="text-brand-500 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Fanbases */}
            {fanbases.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-3">Popular With</h2>
                <div className="flex flex-wrap gap-2">
                  {fanbases.map((fb) => (
                    <span key={fb} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                      {fb}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              {venue.bookingUrl && (
                <a href={venue.bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button size="lg" className="w-full">Book a Spot</Button>
                </a>
              )}
              {venue.googleMapsUrl && (
                <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    <MapPin size={14} /> Get Directions
                  </Button>
                </a>
              )}
              {venue.website && (
                <a href={venue.website} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="ghost" size="md" className="w-full">
                    <Globe size={14} /> Visit Website
                  </Button>
                </a>
              )}
              {venue.phone && (
                <a href={`tel:${venue.phone}`} className="block">
                  <Button variant="ghost" size="md" className="w-full">
                    <Phone size={14} /> {venue.phone}
                  </Button>
                </a>
              )}
            </div>

            {/* Details */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Venue Details</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Entry</dt>
                  <dd className="font-medium text-gray-900">
                    {venue.coverChargeAmount ?? (venue.coverCharge === 'free' ? 'Free' : venue.coverCharge)}
                  </dd>
                </div>
                {venue.drinkSpecials && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Drink Specials</dt>
                    <dd className="font-medium text-gray-900">{venue.drinkSpecialsNote ?? 'Yes'}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Sound</dt>
                  <dd className="flex items-center gap-1 font-medium text-gray-900">
                    {venue.soundOn ? <><Volume2 size={13} className="text-green-600" /> On</> : 'Silent'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Family Friendly</dt>
                  <dd className="font-medium text-gray-900">
                    {venue.familyFriendly ? <><Users size={13} className="inline text-green-600" /> Yes</> : 'No'}
                  </dd>
                </div>
                {venue.outdoorScreen && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Outdoor Screen</dt>
                    <dd className="font-medium text-gray-900">Yes</dd>
                  </div>
                )}
                {venue.reservationRequired && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Reservation</dt>
                    <dd className="font-medium text-brand-600">Required</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
