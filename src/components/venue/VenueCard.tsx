import { Link } from 'react-router-dom';
import { MapPin, Star, Volume2, Users, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import type { Venue } from '../../types';
import { FANBASES } from '../../lib/constants';

interface VenueCardProps {
  venue: Venue;
  className?: string;
}

const COVER_LABEL: Record<Venue['coverCharge'], string> = {
  free: 'Free Entry',
  ticketed: 'Ticketed',
  varies: 'Varies',
};

export function VenueCard({ venue, className }: VenueCardProps) {
  const fanbases = venue.fanbases
    .slice(0, 3)
    .map((slug) => FANBASES.find((f) => f.slug === slug)?.label ?? slug);

  return (
    <article
      className={cn(
        'relative flex flex-col rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden',
        venue.featured ? 'border-amber-200 ring-1 ring-amber-200' : 'border-gray-200',
        className
      )}
      aria-label={`Watch party venue: ${venue.name}`}
    >
      {/* Image placeholder / cover */}
      <div className="h-40 bg-gradient-to-br from-brand-600 to-brand-800 relative flex items-end p-4">
        {venue.featured && (
          <Badge variant="featured" className="absolute top-3 left-3">
            ⭐ Featured
          </Badge>
        )}
        <div className="text-white">
          <h2 className="text-lg font-bold leading-tight">{venue.name}</h2>
          <p className="flex items-center gap-1 text-sm text-brand-200 mt-0.5">
            <MapPin size={12} />
            {venue.city}, {venue.stateCode}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Rating */}
        {venue.rating && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="font-medium text-gray-900">{venue.rating.toFixed(1)}</span>
            <span className="text-gray-400">({venue.reviewCount?.toLocaleString()} reviews)</span>
          </div>
        )}

        {/* Description */}
        {venue.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{venue.description}</p>
        )}

        {/* Attribute badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={venue.coverCharge === 'free' ? 'success' : 'warning'}>
            {COVER_LABEL[venue.coverCharge]}
          </Badge>
          {venue.soundOn && <Badge variant="default"><Volume2 size={11} />Sound On</Badge>}
          {venue.familyFriendly && <Badge variant="default"><Users size={11} />Family Friendly</Badge>}
          {venue.outdoorScreen && <Badge variant="default">🌤 Outdoor Screen</Badge>}
          {venue.drinkSpecials && <Badge variant="default">🍺 Drink Specials</Badge>}
        </div>

        {/* Fanbases */}
        {fanbases.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {fanbases.map((fb) => (
              <span key={fb} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {fb}
              </span>
            ))}
            {venue.fanbases.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                +{venue.fanbases.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          <Link to={`/venues/${venue.slug}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {venue.googleMapsUrl && (
            <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <MapPin size={14} />
              </Button>
            </a>
          )}
          {venue.bookingUrl && (
            <a href={venue.bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm">
                <ExternalLink size={14} />
                Book
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
