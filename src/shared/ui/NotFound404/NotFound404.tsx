'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { HeroAstonishedIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';
import styles from './NotFound404.module.scss';

const {
  not_found: { title, message },
  buttons: { home },
} = staticData.root;
export function NotFound404() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        <h2>{title}</h2>
        <blockquote className={styles.content}>
          <code>{message}</code>
        </blockquote>
      </section>
      <div className={styles.columnWrapper}>
        <HeroAstonishedIcon />
        <Button type='button' text={home} color='mini' onClick={() => router.push('/')} />
      </div>
    </div>
  );
}
