import type { Metadata } from 'next';
import '@/index.css';
import { Layout } from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'FindWatchParty — Find Sports Watch Parties Near You',
  description:
    'Find watch parties near you for the World Cup, NBA Finals, NFL playoffs and more. Filter by city, sport, fanbase, and vibe.',
  icons: { icon: '/favicon.svg' },
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

