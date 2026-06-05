// Converts ../watchpartydata/venues_with_neighborhoods.csv -> src/data/venues.ts.
// Run from the watchparty project root: node scripts/csv_to_venues.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CSV_PATH = join(ROOT, '..', 'watchpartydata', 'venues_with_neighborhoods.csv');
const PHOTO_CSV_PATH = join(ROOT, '..', 'watchpartydata', 'venues_with_photos.csv');
const OUT_PATH = join(ROOT, 'src', 'data', 'venues.ts');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\r') {
      // Ignore CR in CRLF files.
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function readRecords(path) {
  const raw = readFileSync(path, 'utf8');
  const rows = parseCsv(raw).filter((r) => r.length > 1 && r.some((c) => c.trim() !== ''));
  const header = rows[0].map((h) => h.trim());

  return rows.slice(1).map((r) => {
    const obj = {};
    header.forEach((h, i) => {
      obj[h] = (r[i] ?? '').trim();
    });
    return obj;
  });
}

const records = readRecords(CSV_PATH);
const photoRecords = readRecords(PHOTO_CSV_PATH);

const recordKey = (rec) =>
  `${(rec.venue_name || '').trim()}|${(rec.address || '').trim()}`.toLowerCase();

const photosByVenue = new Map(photoRecords.map((rec) => [recordKey(rec), rec.photo_url || '']));

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const NYC_BOROUGHS = ['Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Staten Island'];

function resolveLocation(boroughOrCity) {
  const v = boroughOrCity.trim();
  if (NYC_BOROUGHS.includes(v)) {
    return { city: v, citySlug: 'new-york', state: 'New York', stateCode: 'NY' };
  }

  if (/NJ/i.test(v)) {
    const first = v.split('/')[0].trim();
    const city = first.replace(/\s*NJ\s*$/i, '').trim();
    return { city, citySlug: 'new-jersey', state: 'New Jersey', stateCode: 'NJ' };
  }

  return { city: v || 'New York', citySlug: 'new-york', state: 'New York', stateCode: 'NY' };
}

function cleanUrl(val) {
  const v = (val || '').trim();
  if (!v || /^unknown$/i.test(v)) return undefined;
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

function instagramUrl(val) {
  const v = (val || '').trim().replace(/^@/, '');
  if (!v || /^unknown$/i.test(v)) return undefined;
  return `https://instagram.com/${v}`;
}

function mapCover(type) {
  const t = (type || '').toLowerCase();
  if (t === 'free') return 'free';
  if (t === 'ticketed') return 'ticketed';
  return 'varies';
}

function mapCapacity(tier) {
  const t = (tier || '').toLowerCase();
  if (t.startsWith('small')) return 'intimate';
  if (t.startsWith('medium')) return 'medium';
  if (t.startsWith('large')) return 'large';
  return undefined;
}

function truthyReservation(val) {
  return /^yes/i.test((val || '').trim());
}

function isOutdoor(val) {
  const v = (val || '').toLowerCase();
  return v.startsWith('yes') || v.includes('partial');
}

function isFanZone(rec) {
  return (
    (rec.venue_type || '').toLowerCase().includes('public/outdoor') ||
    /fan zone|fan village|fan festival|fan fest/i.test(rec.venue_name || '')
  );
}

const FANBASE_ALIASES = {
  usmnt: 'usmnt',
  'multi-national': 'multinational',
  'multi national': 'multinational',
  general: 'general',
};

function parseFanbases(val) {
  if (!val) return [];
  return [
    ...new Set(
      val
        .split(/[;,]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => FANBASE_ALIASES[s.toLowerCase()] ?? slugify(s))
        .filter(Boolean)
    ),
  ];
}

function jsStr(s) {
  if (s === undefined) return undefined;
  return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').trim() + "'";
}

const usedSlugs = new Set();
function uniqueSlug(base) {
  let slug = base || 'venue';
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
  usedSlugs.add(slug);
  return slug;
}

const venues = records.map((rec, idx) => {
  const loc = resolveLocation(rec.borough_or_city || '');
  const name = (rec.venue_name || '').trim();
  const slug = uniqueSlug(slugify(name));
  const notes = (rec.notes || '').trim();
  const rawNeighborhood = (rec.neighborhood || '').trim();
  const neighborhood =
    rawNeighborhood && !/^unknown$/i.test(rawNeighborhood) ? rawNeighborhood : undefined;
  const wcConfirmed = (rec.world_cup_event_confirmed || '').toLowerCase();

  const eventSlugs = [];
  if (wcConfirmed === 'yes' || wcConfirmed === 'inferred') eventSlugs.push('fifa-world-cup-2026');
  if (isFanZone(rec)) eventSlugs.push('fan-zone');

  const coverCharge = mapCover(rec.cover_charge_type);
  const amountRaw = (rec.cover_charge_amount || '').trim();
  let coverChargeAmount;
  if (coverCharge === 'free') coverChargeAmount = 'Free';
  else if (amountRaw && amountRaw !== 'see notes' && amountRaw !== '$0') coverChargeAmount = amountRaw;

  const familyFriendly = /family[- ]friendly|all[- ]ages|kids zone|kid-friendly/i.test(notes);
  const drinkSpecials = /happy hour|drink special|specials|2-for-1|\$\d+\s*(draft|beer|wine|drinks|pints)/i.test(notes);

  const address = (rec.address || '').trim();
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${name} ${address}`)}`;

  const rawPhotoUrl = (rec.photo_url || photosByVenue.get(recordKey(rec)) || '').trim();
  const imageUrl = rawPhotoUrl
    ? '/' + rawPhotoUrl.replace(/^venue_photos\//, 'venue-photos/').replace(/\.(jpe?g)$/i, '.webp')
    : undefined;

  return {
    id: `venue-${String(idx + 1).padStart(3, '0')}`,
    slug,
    name,
    address,
    neighborhood,
    city: loc.city,
    citySlug: loc.citySlug,
    state: loc.state,
    stateCode: loc.stateCode,
    zip: '',
    phone: undefined,
    website: cleanUrl(rec.website),
    instagram: instagramUrl(rec.instagram_handle),
    googleMapsUrl,
    imageUrl,
    description: notes || `Watch World Cup 2026 matches at ${name}${neighborhood ? ` in ${neighborhood}` : ''}.`,
    venueType: (rec.venue_type || '').trim() || undefined,
    matchesNote: (rec.specific_matches_listed || '').trim() || undefined,
    soundOn: true,
    coverCharge,
    coverChargeAmount,
    drinkSpecials,
    familyFriendly,
    verifiedWatchParty: false,
    outdoorScreen: isOutdoor(rec.is_outdoor),
    reservationRequired: truthyReservation(rec.reservation_required),
    bookingUrl: cleanUrl(rec.booking_url),
    capacity: mapCapacity(rec.capacity_tier),
    featured: false,
    sports: ['soccer'],
    fanbases: parseFanbases(rec.fanbases),
    eventSlugs,
  };
});

function serializeVenue(v) {
  const lines = [];
  const push = (key, val) => {
    if (val !== undefined) lines.push(`    ${key}: ${val},`);
  };

  push('id', jsStr(v.id));
  push('slug', jsStr(v.slug));
  push('name', jsStr(v.name));
  push('address', jsStr(v.address));
  push('neighborhood', jsStr(v.neighborhood));
  push('city', jsStr(v.city));
  push('citySlug', jsStr(v.citySlug));
  push('state', jsStr(v.state));
  push('stateCode', jsStr(v.stateCode));
  push('zip', jsStr(v.zip));
  push('website', jsStr(v.website));
  push('instagram', jsStr(v.instagram));
  push('googleMapsUrl', jsStr(v.googleMapsUrl));
  push('imageUrl', jsStr(v.imageUrl));
  push('description', jsStr(v.description));
  push('venueType', jsStr(v.venueType));
  push('matchesNote', jsStr(v.matchesNote));
  push('soundOn', v.soundOn);
  push('coverCharge', jsStr(v.coverCharge));
  push('coverChargeAmount', jsStr(v.coverChargeAmount));
  push('drinkSpecials', v.drinkSpecials);
  push('familyFriendly', v.familyFriendly);
  push('verifiedWatchParty', v.verifiedWatchParty);
  push('outdoorScreen', v.outdoorScreen);
  push('reservationRequired', v.reservationRequired);
  push('bookingUrl', jsStr(v.bookingUrl));
  push('capacity', jsStr(v.capacity));
  push('featured', v.featured);
  push('sports', `[${v.sports.map(jsStr).join(', ')}]`);
  push('fanbases', `[${v.fanbases.map(jsStr).join(', ')}]`);
  push('eventSlugs', `[${v.eventSlugs.map(jsStr).join(', ')}]`);

  return `  {\n${lines.join('\n')}\n  }`;
}

const out =
  `import type { Venue } from '../types';\n\n` +
  `// Auto-generated from watchpartydata/venues_with_neighborhoods.csv by scripts/csv_to_venues.mjs\n` +
  `// ${venues.length} NYC/NJ World Cup 2026 watch party venues. Do not edit by hand - re-run the script.\n\n` +
  `export const VENUES: Venue[] = [\n${venues.map(serializeVenue).join(',\n')},\n];\n`;

writeFileSync(OUT_PATH, out, 'utf8');
console.log(`Wrote ${venues.length} venues to ${OUT_PATH}`);
