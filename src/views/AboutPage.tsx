'use client';

export function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose prose-gray">
        <h1 className="text-3xl font-bold text-gray-900 not-prose">About FindWatchParty</h1>

        <p className="mt-4 text-gray-600">
          <strong>FindWatchParty</strong> is a directory for FIFA World Cup 2026 watch parties in New York City and
          New Jersey. We built it because finding the right bar to watch a match — one that has sound on, serves your
          crowd, and isn't charging $50 cover — is harder than it should be.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">Our Mission</h2>
        <p className="mt-2 text-gray-600">
          Every fan deserves a great place to watch the game. We index watch party venues across NYC and NJ so you can
          filter by neighborhood, team fanbase, free entry, sound on, outdoor screen, and more — and just show up.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">World Cup 2026</h2>
        <p className="mt-2 text-gray-600">
          The World Cup Final is at MetLife Stadium on July 19 — making New York and New Jersey the center of the
          soccer world this summer. We cover 161 venues across all five boroughs and NJ, from dedicated fan zones to
          ethnically specific bars where you'll watch with the most passionate supporters in the city.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">For Venue Owners</h2>
        <p className="mt-2 text-gray-600">
          If you run a bar, restaurant, or event space that hosts watch parties, we want to work with you. Basic
          listings are free. Our featured placement program puts your venue at the top of results during major events,
          driving thousands of new customers through your doors. Contact us at{' '}
          <a href="mailto:roman@findwatchparty.com" className="text-brand-600 hover:underline">
            roman@findwatchparty.com
          </a>{' '}
          to learn more.
        </p>

        <h2 className="mt-8 text-xl font-bold text-gray-900 not-prose">Contact</h2>
        <p className="mt-2 text-gray-600">
          Have a question, want to list a venue, or interested in advertising?{' '}
          <a href="mailto:roman@findwatchparty.com" className="text-brand-600 hover:underline">
            Reach out →
          </a>
        </p>
      </div>
    </>
  );
}
