import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SubmitPage } from '@/views/SubmitPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'List Your Venue | FindWatchParty',
  description:
    'Add your bar or venue to FindWatchParty and reach thousands of fans searching for World Cup 2026 watch parties in NYC & NJ. Basic listings are free.',
  alternates: { canonical: `${SITE_URL}/submit` },
};

export default function Page() {
  return (
    <Suspense>
      <SubmitPage />
    </Suspense>
  );
}

