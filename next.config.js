/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      { source: '/cities', destination: '/cities/new-york', permanent: false },
      { source: '/events', destination: '/events/fifa-world-cup-2026', permanent: false },
      { source: '/sports', destination: '/venues', permanent: false },
      { source: '/sports/:slug', destination: '/venues', permanent: false },
    ];
  },
};

module.exports = nextConfig;
