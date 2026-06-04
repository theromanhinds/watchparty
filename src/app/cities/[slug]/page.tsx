import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CityDetailPage } from '@/views/CityDetailPage';
import { CITIES } from '@/data/cities';
import { VENUES } from '@/data/venues';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return { title: 'City Not Found | FindWatchParty' };
  const count = VENUES.filter((v) => v.citySlug === city.slug).length;
  const title = `World Cup 2026 Watch Parties in ${city.name} | FindWatchParty`;
  const description = `Find ${count} FIFA World Cup 2026 watch party venues in ${city.name} — fan zones, sports bars, and restaurants by nationality. Filter by free entry, sound on, and outdoor.`;
  const url = `${SITE_URL}/cities/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <Suspense>
      <CityDetailPage slug={slug} />
    </Suspense>
  );
}
