import type { Metadata } from 'next';
import { EventDetailPage } from '@/views/EventDetailPage';
import { EVENTS } from '@/data/events';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return { title: 'Event Not Found | FindWatchParty' };
  const title = `${event.name} Watch Parties in NYC & NJ | FindWatchParty`;
  const description = `Find watch party venues for the ${event.name} across New York & New Jersey. Fan zones, sports bars, and restaurants by nationality.`;
  const url = `${SITE_URL}/events/${event.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <EventDetailPage slug={slug} />;
}
