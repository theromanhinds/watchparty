'use client';

import { FILTER_PILLS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface FilterPillsProps {
  selected: string;
  onSelect: (id: string) => void;
  sticky?: boolean;
}

export function FilterPills({ selected, onSelect, sticky }: FilterPillsProps) {
  return (
    <div
      className={cn(
        'bg-white',
        sticky && 'sticky top-14 z-40 border-b border-gray-100'
      )}
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {FILTER_PILLS.map((pill) => (
          <button
            key={pill.id}
            type="button"
            onClick={() => onSelect(pill.id)}
            aria-pressed={selected === pill.id}
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
              selected === pill.id
                ? 'border border-transparent bg-gray-900 text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
            )}
          >
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
}
