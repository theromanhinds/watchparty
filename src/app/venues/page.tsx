import { Suspense } from 'react';
import { VenuesPage } from '@/views/VenuesPage';

export default function Page() {
  return (
    <Suspense>
      <VenuesPage />
    </Suspense>
  );
}

