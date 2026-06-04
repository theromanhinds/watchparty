import type { Metadata } from 'next';
import { AboutPage } from '@/views/AboutPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About | FindWatchParty',
  description:
    'FindWatchParty is the directory for FIFA World Cup 2026 watch parties across New York & New Jersey.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function Page() {
  return <AboutPage />;
}

