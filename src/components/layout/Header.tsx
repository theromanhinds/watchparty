'use client';

import Link from 'next/link';
import { SITE_NAME } from '../../lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-base font-bold text-gray-900"
        >
          <span aria-hidden>⚽</span>
          <span>{SITE_NAME}</span>
        </Link>

        {/* Single utility CTA */}
        <Link
          href="/submit"
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
        >
          List Your Venue
        </Link>
      </div>
    </header>
  );
}
