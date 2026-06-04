import type { SportingEvent } from '../types';

// Phase 1 scope: FIFA World Cup 2026 only.
export const EVENTS: SportingEvent[] = [
  {
    id: 'fifa-wc-2026',
    slug: 'fifa-world-cup-2026',
    name: 'FIFA World Cup 2026',
    shortName: 'World Cup 2026',
    sport: 'Soccer',
    sportSlug: 'soccer',
    description:
      'The biggest sporting event on the planet comes to North America for the first time since 1994. 48 teams, 104 matches across 16 host cities in the US, Canada, and Mexico.',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    featured: true,
    hostCities: ['new-york', 'new-jersey'],
    tags: ['world-cup', 'soccer', 'international', 'usmnt', 'featured'],
  },
];
