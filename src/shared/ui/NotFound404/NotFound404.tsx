'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { HeroAstonishedIcon } from '@/shared/ui/Icons';
import styles from './NotFound404.module.scss';
export function NotFound404() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <HeroAstonishedIcon />
      <section className={styles.wrapper}>
        <h2>404 - Page Not Found</h2>
        <blockquote className={styles.content}>
          <code>{`Oops! The page you're looking for doesn't exist.`}</code>
        </blockquote>
      </section>

      <Button type='button' text={'Home'} color='mini' onClick={() => router.push('/')} />
    </div>
  );
}
