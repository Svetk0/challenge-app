'use client';

import { useEffect } from 'react';
import { ErrorApi } from '@/shared/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className='error-container'>
      <ErrorApi error={error} reset={reset} />
    </div>
  );
}
