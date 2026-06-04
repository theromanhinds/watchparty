import Link from 'next/link';
import { cn } from '../../lib/utils';
import type { Venue } from '../../types';
import { getVenueGradient, coverChargeLabel } from '../../lib/venueDisplay';

interface VenueCardProps {
  venue: Venue;
  className?: string;
}

export function VenueCard({ venue, className }: VenueCardProps) {
  const gradient = getVenueGradient(venue);

  return (
    <Link
      href={`/venues/${venue.slug}`}
      aria-label={`Watch party venue: ${venue.name}`}
      className={cn(
        'group block overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover',
        venue.featured && 'border-l-4 border-amber-400',
        className
      )}
    >
      {/* Photo area */}
      <div
        className={cn(
          'relative flex aspect-video w-full items-center justify-center bg-gradient-to-br',
          gradient
        )}
      >
        {venue.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-1 text-xs font-semibold text-white">
            ⭐ Featured
          </span>
        )}
        {venue.verifiedWatchParty && (
          <span className="absolute right-2 top-2 rounded-full border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-600">
            ✓ Verified
          </span>
        )}
        <span className="text-4xl opacity-90 drop-shadow-sm" aria-hidden>
          ⚽
        </span>
      </div>

      {/* Content */}
      <div className="px-3 py-3">
        <p className="truncate text-xs text-gray-500">
          {venue.neighborhood ? `${venue.neighborhood} · ` : ''}
          {venue.city}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">{venue.name}</p>
        <p className="mt-1 truncate text-xs text-gray-500">
          {coverChargeLabel(venue)} · {venue.soundOn ? '🔊 Sound on' : '🔇 Silent'}
        </p>
      </div>
    </Link>
  );
}
