'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/shared/ui';
import { HeroAstonishedIcon } from '@/shared/ui/Icons';
import styles from './Errors.module.scss';
export function ErrorApi({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {}, [error]);
  const router = useRouter();
  return (
    <section className={styles.container}>
      <HeroAstonishedIcon />
      <div className={styles.wrapper}>
        <h2>Oops, something went wrong!</h2>
        <blockquote className={styles.content}>
          <code>{error.message}</code>
        </blockquote>
      </div>

      <div className={styles.rowWrapper}>
        <Button
          type='button'
          text={'My Challenges'}
          color='mini_black'
          onClick={() => router.push('/challenges')}
        />
        {reset && <Button type='button' text='Try again' color='mini' onClick={reset} />}
      </div>
    </section>
  );
}
