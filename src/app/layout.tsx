import type { Metadata } from 'next';
import '@/index.css';
import 'flag-icons/css/flag-icons.min.css';
import { Layout } from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'FindWatchParty — World Cup 2026 Watch Parties in NYC & NJ',
  description:
    'Find your FIFA World Cup 2026 watch party in New York & New Jersey. 161 venues — sports bars, fan zones, and restaurants. Filter by neighborhood, fanbase, free entry, sound on, and more.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'FindWatchParty — World Cup 2026 Watch Parties in NYC & NJ',
    description:
      '161 venues in New York & New Jersey. Sports bars, fan zones, and restaurants showing every match. Filter by neighborhood, fanbase, free entry, and more.',
    url: 'https://findwatchparty.com',
    siteName: 'FindWatchParty',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FindWatchParty — World Cup 2026 Watch Parties in NYC & NJ',
    description:
      '161 venues in New York & New Jersey showing every World Cup match. Find your spot.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

