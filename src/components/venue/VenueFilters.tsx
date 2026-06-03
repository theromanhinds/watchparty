import { SlidersHorizontal, X } from 'lucide-react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CITIES } from '../../data/cities';
import { SPORTS } from '../../data/sports';
import { FANBASES, COVER_CHARGE_OPTIONS, SORT_OPTIONS } from '../../lib/constants';
import type { FilterState, SortOption } from '../../types';

interface VenueFiltersProps {
  filters: FilterState;
  sort: SortOption;
  activeFilterCount: number;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

function Toggle({ label, active, onChange }: { label: string; active: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-brand-500 bg-brand-50 text-brand-700'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
      }`}
      aria-pressed={active}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
      {label}
    </button>
  );
}

export function VenueFilters({ filters, sort, activeFilterCount, onUpdate, onSortChange, onReset }: VenueFiltersProps) {
  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    ...CITIES.map((c) => ({ value: c.slug, label: c.isHostCity ? `⭐ ${c.name}` : c.name })),
  ];

  const sportOptions = [
    { value: 'all', label: 'All Sports' },
    ...SPORTS.map((s) => ({ value: s.slug, label: `${s.icon} ${s.name}` })),
  ];

  const fanbases = [
    { value: 'all', label: 'All Fanbases' },
    ...FANBASES.map((f) => ({ value: f.slug, label: f.label })),
  ];

  return (
    <aside aria-label="Venue filters" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900">
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">{activeFilterCount}</span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-gray-500">
            <X size={14} />
            Clear all
          </Button>
        )}
      </div>

      {/* Dropdowns */}
      <Select
        label="City"
        value={filters.city}
        options={cityOptions}
        onChange={(e) => onUpdate('city', e.target.value)}
      />
      <Select
        label="Sport"
        value={filters.sport}
        options={sportOptions}
        onChange={(e) => onUpdate('sport', e.target.value)}
      />
      <Select
        label="Fanbase / Nationality"
        value={filters.fanbase}
        options={fanbases}
        onChange={(e) => onUpdate('fanbase', e.target.value)}
      />
      <Select
        label="Price"
        value={filters.coverCharge}
        options={COVER_CHARGE_OPTIONS}
        onChange={(e) => onUpdate('coverCharge', e.target.value)}
      />

      {/* Toggle filters */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Venue Features</p>
        <div className="flex flex-wrap gap-2">
          <Toggle label="Sound On" active={filters.soundOn === true} onChange={() => onUpdate('soundOn', filters.soundOn === true ? null : true)} />
          <Toggle label="Family Friendly" active={filters.familyFriendly === true} onChange={() => onUpdate('familyFriendly', filters.familyFriendly === true ? null : true)} />
          <Toggle label="Outdoor Screen" active={filters.outdoorScreen === true} onChange={() => onUpdate('outdoorScreen', filters.outdoorScreen === true ? null : true)} />
          <Toggle label="Drink Specials" active={filters.drinkSpecials === true} onChange={() => onUpdate('drinkSpecials', filters.drinkSpecials === true ? null : true)} />
          <Toggle label="Featured Only" active={filters.featured === true} onChange={() => onUpdate('featured', filters.featured === true ? null : true)} />
        </div>
      </div>

      {/* Sort */}
      <Select
        label="Sort by"
        value={sort}
        options={SORT_OPTIONS}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      />
    </aside>
  );
}
