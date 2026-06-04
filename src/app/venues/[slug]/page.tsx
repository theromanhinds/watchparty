import type { Metadata } from 'next';
import { VenueDetailPage } from '@/views/VenueDetailPage';
import { VENUES } from '@/data/venues';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = VENUES.find((v) => v.slug === slug);
  if (!venue) return { title: 'Venue Not Found | FindWatchParty' };
  const where = venue.neighborhood ? `${venue.neighborhood}, ${venue.city}` : venue.city;
  const title = `${venue.name} — World Cup 2026 Watch Party in ${venue.city} | FindWatchParty`;
  const description = `Watch the FIFA World Cup 2026 at ${venue.name} in ${where}. Cover charge, sound, reservations, and fan details for your match-day watch party.`;
  const url = `${SITE_URL}/venues/${venue.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <VenueDetailPage slug={slug} />;
}
