import { Suspense } from 'react';
import { CityDetailPage } from '@/views/CityDetailPage';

export default function Page() {
  return (
    <Suspense>
      <CityDetailPage />
    </Suspense>
  );
}
