'use client';

import { useState } from 'react';
import { SEOHead } from '../components/shared/SEOHead';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'Is FindWatchParty free to use?',
    a: 'Yes! FindWatchParty is completely free for fans to use. Just browse, filter, and find your perfect watch party venue.',
  },
  {
    q: 'How do I list my venue?',
    a: 'Head to our Submit page and fill out the form. Basic listings are free. We review all submissions within 24 hours. For featured placements, contact hello@findwatchparty.com.',
  },
  {
    q: 'Which events does FindWatchParty cover?',
    a: 'We cover major sporting events including the FIFA World Cup, NBA Finals, Stanley Cup Finals, NFL season games, the Super Bowl, MLB World Series, and more.',
  },
  {
    q: 'Which cities are covered?',
    a: 'We currently cover 21 US cities including all 11 FIFA World Cup 2026 host cities (New York, Los Angeles, Miami, Dallas, Houston, Atlanta, Boston, Philadelphia, Seattle, San Francisco, and Kansas City) plus major sports cities like Chicago, Las Vegas, Nashville, and more.',
  },
  {
    q: 'What is a "Featured" listing?',
    a: "Featured listings appear at the top of search results and are highlighted to fans browsing for venues. They're perfect for venues that want maximum visibility during major events.",
  },
  {
    q: 'How do I find venues for my national team (USMNT, Mexico, Brazil, etc.)?',
    a: "Use the Fanbase filter on the Venues page to find venues that cater to your national team's supporters.",
  },
  {
    q: 'Are reservation details listed?',
    a: 'Yes, where available. Venue detail pages show whether reservations are required and include a booking link if the venue supports it.',
  },
  {
    q: 'My venue info is incorrect. How do I update it?',
    a: "Email us at hello@findwatchparty.com with your venue name and the correct details and we'll update it within 24 hours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-brand-600"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {q}
        {open ? <ChevronUp size={16} className="shrink-0 text-gray-400" /> : <ChevronDown size={16} className="shrink-0 text-gray-400" />}
      </button>
      {open && <p className="pb-4 text-sm text-gray-600">{a}</p>}
    </div>
  );
}

export function FAQPage() {
  return (
    <>
      <SEOHead
        title="FAQ – FindWatchParty"
        description="Frequently asked questions about FindWatchParty — how to find venues, list your bar, and more."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="mt-2 text-gray-500">Everything you need to know about FindWatchParty.</p>

        <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-6">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Still have questions?{' '}
          <a href="mailto:hello@findwatchparty.com" className="text-brand-600 hover:underline">
            Email us
          </a>
        </p>
      </div>
    </>
  );
}
