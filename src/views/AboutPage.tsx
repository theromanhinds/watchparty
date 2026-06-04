'use client';

import { SEOHead } from '../components/shared/SEOHead';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About FindWatchParty"
        description="FindWatchParty is the #1 directory for finding sports watch parties across the United States. World Cup, NBA Finals, NFL, NHL, and more."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose prose-gray">
        <h1 className="text-3xl font-bold text-gray-900 not-prose">About FindWatchParty</h1>

        <p className="mt-4 text-gray-600">
          <strong>FindWatchParty</strong> is the leading online directory for finding sports watch party venues across
          the United States. Whether you're looking for a bar hosting the FIFA World Cup 2026, the NBA Finals, Super
          Bowl, or your local soccer club's match — we've got you covered.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">Our Mission</h2>
        <p className="mt-2 text-gray-600">
          Sports are better together. We believe every fan deserves to find a great place to watch the game, surrounded
          by fellow supporters. Our mission is to connect fans with venues and build community through shared sporting
          experiences.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">World Cup 2026</h2>
        <p className="mt-2 text-gray-600">
          With the FIFA World Cup 2026 coming to 11 US cities — New York, Los Angeles, Miami, Dallas, Houston, Atlanta,
          Boston, Philadelphia, Seattle, San Francisco, and Kansas City — we're the go-to resource for fans from every
          country to find their perfect watch party spot. Whether you're rooting for the USMNT, Mexico, Brazil,
          Argentina, England, or any other nation, we'll help you find your people.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">For Venue Owners</h2>
        <p className="mt-2 text-gray-600">
          If you run a bar, restaurant, or event space that hosts watch parties, we want to work with you. Basic
          listings are free. Our featured placement program puts your venue at the top of results during major events,
          driving thousands of new customers through your doors. Contact us at{' '}
          <a href="mailto:hello@findwatchparty.com" className="text-brand-600 hover:underline">
            hello@findwatchparty.com
          </a>{' '}
          to learn more.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">Contact</h2>
        <p className="mt-2 text-gray-600">
          Have a question, want to list a venue, or interested in advertising?{' '}
          <a href="mailto:hello@findwatchparty.com" className="text-brand-600 hover:underline">
            Reach out →
          </a>
        </p>
      </div>
    </>
  );
}
