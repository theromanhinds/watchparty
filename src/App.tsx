import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { VenuesPage } from './pages/VenuesPage';
import { VenueDetailPage } from './pages/VenueDetailPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { CitiesPage } from './pages/CitiesPage';
import { CityDetailPage } from './pages/CityDetailPage';
import { SportsPage } from './pages/SportsPage';
import { SportDetailPage } from './pages/SportDetailPage';
import { SubmitPage } from './pages/SubmitPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="venues" element={<VenuesPage />} />
          <Route path="venues/:slug" element={<VenueDetailPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="cities/:slug" element={<CityDetailPage />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="sports/:slug" element={<SportDetailPage />} />
          <Route path="submit" element={<SubmitPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
