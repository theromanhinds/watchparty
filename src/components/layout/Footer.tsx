import Link from 'next/link';
import { SITE_NAME } from '../../lib/constants';

const FOOTER_LINKS = [
  { href: '/venues', label: 'All Venues' },
  { href: '/matches', label: 'Match Schedule' },
  { href: '/cities/new-york', label: 'New York' },
  { href: '/cities/new-jersey', label: 'New Jersey' },
  { href: '/submit', label: 'List Your Venue' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/sitemap', label: 'Sitemap' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-1.5 text-base font-bold text-gray-900">
              <span aria-hidden>⚽</span>
              <span>{SITE_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              The directory for FIFA World Cup 2026 watch parties across New York &amp; New Jersey.
            </p>
            <p className="mt-3 text-xs text-gray-400">
              Expanding to LA, Dallas, Miami + more cities for World Cup 2026 →
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
