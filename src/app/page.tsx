'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { setAuthToken, TELEGRAM_ID } from '@/utils/auth';
import { Button } from '@/components/';

import styles from './page.module.scss';

const Home: React.FC = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLogoVisible(false);
      setIsDivVisible(true);
    }, 3300); // 3000мс анимация и 300мс задержка

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  setAuthToken(TELEGRAM_ID);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {isLogoVisible && (
          <div className={styles.logoWrapper}>
            <Image
              src='/images/logo.svg'
              alt='Logo'
              width={180}
              height={180}
              className={styles.logo}
            />
          </div>
        )}
        {isDivVisible && (
          <div className={styles.textBlock}>
            <h1>Challenge App</h1>
            <Link href={'/challenges'}>
              <Button
                type='button'
                text={'My challenges'}
                color='default'
                //onClick={() => router.push("/challenges/create")}
              />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
