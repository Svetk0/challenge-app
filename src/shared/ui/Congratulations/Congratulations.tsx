'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { HeroHappyIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';
import styles from './Congratulations.module.scss';

const {
  congratulations: { title, message },
  buttons: { congrats },
} = staticData.root;
export function Congratulations() {
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
        <HeroHappyIcon />
        <Button type='button' text={congrats} color='mini' onClick={() => router.push('/')} />
      </div>
    </div>
  );
}
