//import Image from 'next/image';
'use client';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import styles from './page.module.scss';
import { setAuthToken, TELEGRAM_ID } from '@/utils/auth';

export default function Home() {
  setAuthToken(TELEGRAM_ID);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Challenge App</h1>
        <Link href={'/challenges'}>
          <Button
            type='button'
            text={'My challenges'}
            color='default'
            //onClick={() => router.push("/challenges/create")}
          />
        </Link>
      </main>
    </div>
  );
}
