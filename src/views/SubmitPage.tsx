'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Sparkles } from 'lucide-react';
import { VENUES } from '../data/venues';
import { STRIPE_FEATURED_URL, FEATURED_PRICE, CONTACT_EMAIL } from '../lib/constants';

const CITY_OPTIONS = [
  { value: '', label: 'Select a city…' },
  { value: 'new-york', label: 'New York' },
  { value: 'new-jersey', label: 'New Jersey' },
];

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500';

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && ' *'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}

export function SubmitPage() {
  const searchParams = useSearchParams();
  const isClaim = searchParams.get('claim') === 'true';
  const venueSlug = searchParams.get('venue') ?? '';
  const claimedVenue = useMemo(
    () => VENUES.find((v) => v.slug === venueSlug),
    [venueSlug]
  );

  const [submitted, setSubmitted] = useState(false);
  const formName = isClaim ? 'venue-claim' : 'venue-submission';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = { 'form-name': formName };
    formData.forEach((value, key) => {
      data[key] = String(value);
    });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle size={56} className="mx-auto text-emerald-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">
          {isClaim ? 'Claim Received!' : 'Submission Received!'}
        </h1>
        <p className="mt-2 text-gray-500">
          {isClaim
            ? "Thanks — we'll verify your details and get your listing updated within 24 hours."
            : "Thanks for listing your venue. We'll review it and add it to the directory within 24 hours."}
        </p>
        <div className="mt-8 rounded-2xl bg-sky-50 p-6 text-left">
          <div className="flex items-center gap-2 text-sky-700">
            <Sparkles size={18} />
            <span className="font-semibold">Want more visibility?</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Get a Featured listing — top placement across the directory for the entire
            World Cup — for just {FEATURED_PRICE}.
          </p>
          <a
            href={STRIPE_FEATURED_URL}
            className="mt-4 inline-block rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Get Featured — {FEATURED_PRICE}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isClaim ? 'Claim Your Listing' : 'List Your Venue'}
        </h1>
        <p className="mt-2 text-gray-500 max-w-lg mx-auto">
          {isClaim ? (
            <>
              {claimedVenue ? (
                <>
                  You&apos;re claiming <strong>{claimedVenue.name}</strong>. Confirm your
                  details below and we&apos;ll verify ownership.
                </>
              ) : (
                'Confirm your details below and we\u2019ll verify ownership of your listing.'
              )}
            </>
          ) : (
            <>
              Reach thousands of fans searching for watch parties near them. Basic listings
              are <strong>free</strong>. Featured placements available for {FEATURED_PRICE} for
              the full World Cup tournament.
            </>
          )}
        </p>
      </div>

      <form
        name={formName}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
      >
        {/* Netlify form detection + honeypot */}
        <input type="hidden" name="form-name" value={formName} />
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
          </label>
        </p>

        {isClaim && (
          <>
            <input type="hidden" name="venueSlug" value={venueSlug} />
            <input type="hidden" name="venue" value={claimedVenue?.name ?? venueSlug} />
          </>
        )}

        {isClaim ? (
          <>
            <h2 className="font-semibold text-gray-900">Your Details</h2>
            <Field label="Your Name" name="contactName" required />
            <Field
              label="Your Role at the Venue"
              name="role"
              placeholder="e.g. Owner, Manager"
              required
            />
            <Field label="Email Address" name="contactEmail" type="email" required />
            <Field label="Phone" name="phone" type="tel" placeholder="(555) 000-0000" />
            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                What needs updating?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Tell us about your watch party setup, corrections, or anything we should know…"
                className={inputClass}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-gray-900">Venue Information</h2>
            <Field label="Venue Name" name="venueName" required placeholder="e.g. The Soccer Republic" />
            <Field label="Street Address" name="address" required placeholder="e.g. 123 Main St" />
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City *
              </label>
              <select id="city" name="city" required className={inputClass}>
                {CITY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Neighborhood" name="neighborhood" placeholder="e.g. Williamsburg" />
            <Field label="Phone" name="phone" type="tel" placeholder="(555) 000-0000" />
            <Field label="Website" name="website" type="url" placeholder="https://yourbar.com" />

            <hr className="border-gray-100" />
            <h2 className="font-semibold text-gray-900">Your Contact Info</h2>
            <Field label="Your Name" name="contactName" required />
            <Field label="Email Address" name="contactEmail" type="email" required />

            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Tell us about your watch party setup — cover charge, drink specials, fanbase, capacity…"
                className={inputClass}
              />
            </div>
          </>
        )}

        <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="featuredInterest"
            value="yes"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
          />
          <span>Interested in a featured listing placement</span>
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-600"
        >
          {isClaim ? 'Submit Claim' : 'Submit Venue'}
        </button>

        <p className="text-center text-xs text-gray-400">
          We review all submissions within 24 hours. Questions? Email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </form>

      {/* Featured upsell */}
      <div id="featured" className="mt-10 rounded-2xl border border-sky-100 bg-sky-50 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sky-700">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold">Want more visibility? Get Featured — {FEATURED_PRICE}</h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Featured venues get top placement across the homepage and venue listings for the
          entire World Cup tournament — the best way to fill your seats on match day.
        </p>
        <a
          href={STRIPE_FEATURED_URL}
          className="mt-4 inline-block rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Get Featured — {FEATURED_PRICE}
        </a>
      </div>
    </div>
  );
}
