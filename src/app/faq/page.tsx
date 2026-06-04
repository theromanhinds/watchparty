import type { Metadata } from 'next';
import { FAQPage } from '@/views/FAQPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ | FindWatchParty',
  description:
    'Frequently asked questions about FindWatchParty — how to find World Cup 2026 watch parties in NYC & NJ and list your venue.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function Page() {
  return <FAQPage />;
}

