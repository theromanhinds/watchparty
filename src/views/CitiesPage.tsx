'use client';

import { SEOHead } from '../components/shared/SEOHead';
import { CityCard } from '../components/city/CityCard';
import { CITIES } from '../data/cities';

export function CitiesPage() {
  const hostCities = CITIES.filter((c) => c.isHostCity);
  const otherCities = CITIES.filter((c) => !c.isHostCity);

  return (
    <>
      <SEOHead title="Watch Party Cities" description="Find watch party venues in every major US city. World Cup host cities plus Chicago, Vegas, Nashville and more." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse by City</h1>
        <p className="mt-1 text-gray-500">Find watch party venues near you in every major US sports market</p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">⭐ FIFA World Cup 2026 Host Cities</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hostCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Other Major Cities</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {otherCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
