'use client';

import { useState } from 'react';
import { SEOHead } from '../components/shared/SEOHead';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { CITIES } from '../data/cities';
import { CheckCircle } from 'lucide-react';

const CITY_OPTIONS = [
  { value: '', label: 'Select a city…' },
  ...CITIES.map((c) => ({ value: c.slug, label: `${c.name}, ${c.stateCode}` })),
];

export function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    venueName: '',
    address: '',
    city: '',
    phone: '',
    website: '',
    contactName: '',
    contactEmail: '',
    notes: '',
  });

  const handleChange = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to backend / Supabase
    console.log('Venue submission:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Submission Received!</h1>
        <p className="mt-2 text-gray-500">
          Thanks for listing your venue. We'll review it and add it to the directory within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="List Your Venue"
        description="Add your bar or venue to FindWatchParty and reach thousands of fans searching for World Cup and sports watch parties."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your Venue</h1>
          <p className="mt-2 text-gray-500 max-w-lg mx-auto">
            Reach thousands of fans searching for watch parties near them. Basic listings are <strong>free</strong>.
            Featured placements available for $99 for the full World Cup tournament.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-gray-900">Venue Information</h2>

          <Input
            label="Venue Name *"
            value={form.venueName}
            onChange={handleChange('venueName')}
            placeholder="e.g. The Soccer Republic"
            required
          />
          <Input
            label="Street Address *"
            value={form.address}
            onChange={handleChange('address')}
            placeholder="e.g. 123 Main St"
            required
          />
          <Select
            label="City *"
            value={form.city}
            options={CITY_OPTIONS}
            onChange={handleChange('city')}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="(555) 000-0000"
          />
          <Input
            label="Website"
            type="url"
            value={form.website}
            onChange={handleChange('website')}
            placeholder="https://yourbar.com"
          />

          <hr className="border-gray-100" />
          <h2 className="font-semibold text-gray-900">Your Contact Info</h2>

          <Input
            label="Your Name *"
            value={form.contactName}
            onChange={handleChange('contactName')}
            required
          />
          <Input
            label="Email Address *"
            type="email"
            value={form.contactEmail}
            onChange={handleChange('contactEmail')}
            required
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={handleChange('notes')}
              placeholder="Tell us about your watch party setup — cover charge, drink specials, fanbase, capacity…"
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Venue
          </Button>

          <p className="text-center text-xs text-gray-400">
            We review all submissions within 24 hours. Interested in a <strong>featured listing</strong>? Email us at{' '}
            <a href="mailto:hello@findwatchparty.com" className="text-brand-600 hover:underline">
              hello@findwatchparty.com
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
