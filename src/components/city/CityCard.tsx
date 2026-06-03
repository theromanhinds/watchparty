import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { City } from '../../types';
import { VENUES } from '../../data/venues';

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const venueCount = VENUES.filter((v) => v.citySlug === city.slug).length;

  return (
    <Link
      to={`/cities/${city.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Watch parties in ${city.name}, ${city.stateCode}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
            {city.name}
          </h3>
          <p className="flex items-center gap-1 mt-0.5 text-sm text-gray-500">
            <MapPin size={12} />
            {city.stateCode}
          </p>
        </div>
        {city.isHostCity && (
          <Badge variant="featured" className="shrink-0">Host City</Badge>
        )}
      </div>

      {city.description && (
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{city.description}</p>
      )}

      <p className="mt-3 text-sm font-medium text-brand-600">
        {venueCount > 0 ? `${venueCount} venue${venueCount !== 1 ? 's' : ''}` : 'Coming soon'} →
      </p>
    </Link>
  );
}
