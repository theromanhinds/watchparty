'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <span className="text-6xl">🔍</span>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-2 text-gray-500 max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link href="/" className="mt-6 inline-flex items-center gap-1 text-brand-600 hover:underline font-medium">
        <MapPin size={14} /> Back to Home
      </Link>
    </div>
  );
}
