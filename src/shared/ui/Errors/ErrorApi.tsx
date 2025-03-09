'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/shared/ui';
import { HeroAstonishedIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';
import styles from './Errors.module.scss';
const {
  error_global: { title },
  buttons: { my_challenges, try_again },
} = staticData.root;
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
        <h2>{title}</h2>
        <blockquote className={styles.content}>
          <code>{error.message}</code>
        </blockquote>
      </div>

      <div className={styles.rowWrapper}>
        <Button
          type='button'
          text={my_challenges}
          color='mini_black'
          onClick={() => router.push('/challenges')}
        />
        {reset && <Button type='button' text={try_again} color='mini' onClick={reset} />}
      </div>
    </section>
  );
}
