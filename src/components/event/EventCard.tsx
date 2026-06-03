import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatDateRange, isEventActive, isEventUpcoming } from '../../lib/utils';
import { CITIES } from '../../data/cities';
import type { SportingEvent } from '../../types';

const SPORT_COLORS: Record<string, string> = {
  soccer: 'from-green-600 to-emerald-800',
  basketball: 'from-orange-500 to-red-700',
  football: 'from-gray-700 to-gray-900',
  hockey: 'from-blue-600 to-indigo-800',
  boxing: 'from-red-600 to-rose-800',
  baseball: 'from-blue-500 to-blue-800',
  motorsports: 'from-red-700 to-orange-700',
};

interface EventCardProps {
  event: SportingEvent;
}

export function EventCard({ event }: EventCardProps) {
  const active = isEventActive(event.startDate, event.endDate);
  const upcoming = isEventUpcoming(event.startDate);
  const gradient = SPORT_COLORS[event.sportSlug] ?? 'from-brand-600 to-brand-800';

  const hostCityNames = event.hostCities
    .map((slug) => CITIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');

  return (
    <Link
      to={`/events/${event.slug}`}
      className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Event: ${event.name}`}
    >
      {/* Header */}
      <div className={`bg-gradient-to-br ${gradient} p-5 relative`}>
        {event.featured && (
          <Badge variant="featured" className="absolute top-3 right-3">
            Featured
          </Badge>
        )}
        {active && <Badge variant="success" className="absolute top-3 left-3">🔴 Live Now</Badge>}
        {!active && upcoming && <Badge className="absolute top-3 left-3 bg-white/20 text-white border-0">Upcoming</Badge>}
        <p className="text-sm font-medium text-white/70">{event.sport}</p>
        <h3 className="mt-1 text-xl font-bold text-white group-hover:underline">{event.name}</h3>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar size={14} />
          {formatDateRange(event.startDate, event.endDate)}
        </div>
        {hostCityNames && (
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={14} />
            {hostCityNames}
            {event.hostCities.length > 3 && ` +${event.hostCities.length - 3} cities`}
          </div>
        )}
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        <p className="text-sm font-medium text-brand-600 group-hover:underline">Find watch parties →</p>
      </div>
    </Link>
  );
}
