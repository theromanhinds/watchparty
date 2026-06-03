import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { SITE_NAME } from '../../lib/constants';

const FOOTER_LINKS = {
  Events: [
    { href: '/events/fifa-world-cup-2026', label: 'FIFA World Cup 2026' },
    { href: '/events/nba-finals-2026', label: 'NBA Finals' },
    { href: '/events/stanley-cup-finals-2026', label: 'Stanley Cup Finals' },
    { href: '/events', label: 'All Events' },
  ],
  Cities: [
    { href: '/cities/new-york', label: 'New York' },
    { href: '/cities/los-angeles', label: 'Los Angeles' },
    { href: '/cities/miami', label: 'Miami' },
    { href: '/cities/chicago', label: 'Chicago' },
    { href: '/cities', label: 'All Cities' },
  ],
  Sports: [
    { href: '/sports/soccer', label: 'Soccer' },
    { href: '/sports/basketball', label: 'Basketball' },
    { href: '/sports/football', label: 'American Football' },
    { href: '/sports/hockey', label: 'Hockey' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/submit', label: 'List Your Venue' },
    { href: '/faq', label: 'FAQ' },
    { href: '/sitemap', label: 'Sitemap' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <MapPin size={16} strokeWidth={2.5} />
              </span>
              <span>{SITE_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Find the perfect watch party for every major sporting event near you.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://twitter.com/findwatchparty" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-sm text-gray-400 hover:text-gray-600">
                𝕏
              </a>
              <a href="https://instagram.com/findwatchparty" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-sm text-gray-400 hover:text-gray-600">
                IG
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
