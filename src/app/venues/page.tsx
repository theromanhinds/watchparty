import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VenuesPage } from '@/views/VenuesPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All World Cup 2026 Watch Party Venues in NYC & NJ | FindWatchParty',
  description:
    'Browse all 161 FIFA World Cup 2026 watch party venues across New York & New Jersey — fan zones, sports bars, and restaurants by nationality. Filter by free entry, sound on, and outdoor.',
  alternates: { canonical: `${SITE_URL}/venues` },
};

export default function Page() {
  return (
    <Suspense>
      <VenuesPage />
    </Suspense>
  );
}

