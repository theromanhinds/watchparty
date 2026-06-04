import type { Metadata } from 'next';
import { HomePage } from '@/views/HomePage';
import { SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FindWatchParty — FIFA World Cup 2026 Watch Parties in NYC & NJ',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'FindWatchParty — World Cup 2026 Watch Parties in NYC & NJ',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
};

export default function Page() {
  return <HomePage />;
}

