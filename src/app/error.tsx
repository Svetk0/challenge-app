'use client';

import { useEffect } from 'react';
import { Button } from '@/components';

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
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <Button type='button' text='Try again' color='default' onClick={reset} />
    </div>
  );
}
