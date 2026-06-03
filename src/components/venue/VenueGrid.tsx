import { VenueCard } from './VenueCard';
import { EmptyState } from '../shared/EmptyState';
import { Button } from '../ui/Button';
import type { Venue } from '../../types';

interface VenueGridProps {
  venues: Venue[];
  onReset?: () => void;
}

export function VenueGrid({ venues, onReset }: VenueGridProps) {
  if (venues.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No venues found"
        description="Try adjusting your filters or search term to find watch party venues in your area."
        action={onReset && <Button variant="secondary" onClick={onReset}>Clear Filters</Button>}
      />
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-900">{venues.length}</span> venue{venues.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
