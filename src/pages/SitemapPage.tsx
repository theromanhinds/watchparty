import { SEOHead } from '../components/shared/SEOHead';
import { CITIES } from '../data/cities';
import { EVENTS } from '../data/events';
import { SPORTS } from '../data/sports';
import { Link } from 'react-router-dom';

export function SitemapPage() {
  return (
    <>
      <SEOHead title="Sitemap – FindWatchParty" description="Full sitemap of all pages on FindWatchParty." />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sitemap</h1>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Main pages */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Main Pages</h2>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/venues', label: 'All Venues' },
                { to: '/events', label: 'All Events' },
                { to: '/cities', label: 'All Cities' },
                { to: '/sports', label: 'All Sports' },
                { to: '/submit', label: 'List Your Venue' },
                { to: '/about', label: 'About' },
                { to: '/faq', label: 'FAQ' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-brand-600 hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Events */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Events</h2>
            <ul className="space-y-2 text-sm">
              {EVENTS.map((e) => (
                <li key={e.slug}>
                  <Link to={`/events/${e.slug}`} className="text-brand-600 hover:underline">{e.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Sports */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Sports</h2>
            <ul className="space-y-2 text-sm">
              {SPORTS.map((s) => (
                <li key={s.slug}>
                  <Link to={`/sports/${s.slug}`} className="text-brand-600 hover:underline">
                    {s.icon} {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Cities */}
          <section className="sm:col-span-2 lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Cities</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/cities/${c.slug}`} className="text-brand-600 hover:underline">
                    {c.name}, {c.stateCode}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
