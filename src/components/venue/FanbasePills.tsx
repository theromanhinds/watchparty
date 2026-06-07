'use client';

import { useState } from 'react';
import { FANBASES, FANBASE_ISO } from '../../lib/constants';
import { cn } from '../../lib/utils';

const TOP_FANBASES = ['usmnt', 'mexico', 'brazil', 'argentina', 'england', 'france', 'germany', 'spain'];
const TOP_8 = FANBASES.filter((fb) => TOP_FANBASES.includes(fb.slug));
const REST = FANBASES.filter((fb) => !TOP_FANBASES.includes(fb.slug));

interface FanbasePillsProps {
  selected: string;
  onSelect: (fanbase: string) => void;
}

export function FanbasePills({ selected, onSelect }: FanbasePillsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? [...TOP_8, ...REST] : TOP_8;

  return (
    <div className="border-b border-gray-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
        {visible.map((fb) => {
          const iso = FANBASE_ISO[fb.slug];
          const isActive = selected === fb.slug;
          return (
            <button
              key={fb.slug}
              type="button"
              onClick={() => onSelect(isActive ? 'all' : fb.slug)}
              aria-pressed={isActive}
              className={cn(
                'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border border-gray-900 bg-gray-900 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-500 hover:bg-gray-50'
              )}
            >
              {iso && (
                <span
                  className={`fi fi-${iso} rounded-sm`}
                  style={{ width: '1.1em', height: '0.825em', display: 'inline-block', flexShrink: 0 }}
                />
              )}
              {fb.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="shrink-0 whitespace-nowrap rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-sky-600 transition-colors hover:border-sky-400 hover:bg-sky-50"
        >
          {showAll ? '← Less' : 'More teams →'}
        </button>
      </div>
    </div>
  );
}
