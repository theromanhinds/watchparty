import type { City } from '../types';

// Phase 1 scope: World Cup 2026 in New York & New Jersey only.
// All five NYC boroughs roll up to "new-york"; all NJ venues roll up to "new-jersey".
export const CITIES: City[] = [
  {
    id: 'nyc',
    slug: 'new-york',
    name: 'New York',
    state: 'New York',
    stateCode: 'NY',
    isHostCity: true,
    lat: 40.7128,
    lng: -74.006,
    description:
      'The biggest city in the US and a co-host of World Cup 2026 — with watch parties across all five boroughs and a massive international fanbase.',
  },
  {
    id: 'nj',
    slug: 'new-jersey',
    name: 'New Jersey',
    state: 'New Jersey',
    stateCode: 'NJ',
    isHostCity: true,
    lat: 40.7357,
    lng: -74.1724,
    description:
      'Home of MetLife Stadium — site of the 2026 World Cup Final — plus watch parties from Hoboken and Jersey City to Newark and Paramus.',
  },
];
