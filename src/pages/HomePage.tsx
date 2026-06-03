import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { EventCard } from '../components/event/EventCard';
import { CityCard } from '../components/city/CityCard';
import { VenueCard } from '../components/venue/VenueCard';
import { SearchBar } from '../components/search/SearchBar';
import { Button } from '../components/ui/Button';
import { EVENTS } from '../data/events';
import { CITIES } from '../data/cities';
import { VENUES } from '../data/venues';
import { SPORTS } from '../data/sports';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/venues?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const featuredEvents = EVENTS.filter((e) => e.featured);
  const hostCities = CITIES.filter((c) => c.isHostCity).slice(0, 8);
  const featuredVenues = VENUES.filter((v) => v.featured).slice(0, 3);

  return (
    <>
      <SEOHead />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-gray-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-300 font-medium text-sm uppercase tracking-widest mb-3">
            ⚽ FIFA World Cup 2026 · NBA Finals · NFL · and more
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Find the perfect <span className="text-brand-300">watch party</span><br />
            near you
          </h1>
          <p className="mt-5 text-lg text-brand-100 max-w-2xl mx-auto">
            Filter by city, sport, fanbase, price, and vibe. Discover bars and venues hosting watch parties for every major sporting event.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="mt-8 flex gap-3 max-w-xl mx-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by city, venue, or event…"
              size="lg"
              className="flex-1"
            />
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          {/* Quick filters */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SPORTS.map((s) => (
              <Link
                key={s.slug}
                to={`/sports/${s.slug}`}
                className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition-colors"
              >
                {s.icon} {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
            <p className="text-sm text-gray-500 mt-1">Find watch parties for the biggest games right now</p>
          </div>
          <Link to="/events">
            <Button variant="ghost" size="sm">
              All Events <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Featured Venues */}
      <section className="bg-white border-y border-gray-200 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">⭐ Featured Venues</h2>
              <p className="text-sm text-gray-500 mt-1">Top-rated watch party venues across the country</p>
            </div>
            <Link to="/venues">
              <Button variant="ghost" size="sm">
                All Venues <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Browse by City</h2>
            <p className="text-sm text-gray-500 mt-1">World Cup host cities and major US sports markets</p>
          </div>
          <Link to="/cities">
            <Button variant="ghost" size="sm">
              All Cities <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hostCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>

      {/* CTA — List your venue */}
      <section className="bg-brand-600 py-14 text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold">Own a bar or venue?</h2>
          <p className="mt-2 text-brand-100">
            List your venue and reach thousands of fans searching for World Cup and sports watch parties near them.
          </p>
          <Link to="/submit" className="mt-6 inline-block">
            <Button variant="secondary" size="lg">
              List Your Venue — It's Free
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
