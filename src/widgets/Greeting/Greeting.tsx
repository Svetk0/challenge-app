'use client';
import { useEffect, useState } from 'react';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import Link from 'next/link';
import Image from 'next/image';
import { setAuthToken } from '@/shared/utils/auth';
import { Button } from '@/shared/ui';

import styles from './Greeting.module.scss';

export function Greeting() {
  const initDataState = useSignal(initData.state);
  const username = initDataState?.user?.username || null;
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(false);
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLogoVisible(false);
      setIsDivVisible(true);
    }, 3300);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <>
      {isLogoVisible && (
        <div className={styles.logoWrapper}>
          <Image
            src='/images/logo.svg'
            alt='Logo'
            width={180}
            height={180}
            className={styles.logoStart}
          />
        </div>
      )}
      {isDivVisible && (
        <div className={styles.container}>
          {initDataState && (
            <>
              <h2>
                Hi, <span>{username}!</span>
              </h2>
              <h2>welcome to</h2>
            </>
          )}
          <div className={styles.logoWrapper}>
            <Image
              src='/images/logo.svg'
              alt='Logo'
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
          <h1 className={styles.title}>
            <span>Challenge</span> App
          </h1>
          <Link href={'/challenges'}>
            <Button
              type='button'
              text={'Continue'}
              color='default'
              onClick={() => setAuthToken('111')}
            />
          </Link>
        </div>
      )}
    </>
  );
}
