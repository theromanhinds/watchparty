import type { MetadataRoute } from 'next';
import { VENUES } from '@/data/venues';
import { CITIES } from '@/data/cities';
import { EVENTS } from '@/data/events';
import { MATCHES } from '@/data/matches';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/venues',
    '/matches',
    '/submit',
    '/about',
    '/faq',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const venueRoutes: MetadataRoute.Sitemap = VENUES.map((v) => ({
    url: `${SITE_URL}/venues/${v.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE_URL}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const eventRoutes: MetadataRoute.Sitemap = EVENTS.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const matchRoutes: MetadataRoute.Sitemap = MATCHES.map((match) => ({
    url: `${SITE_URL}/matches/${match.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: match.isLocalMatch ? 0.85 : 0.65,
  }));

  return [...staticRoutes, ...cityRoutes, ...eventRoutes, ...matchRoutes, ...venueRoutes];
}
