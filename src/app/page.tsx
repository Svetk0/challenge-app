'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { setAuthToken, getAuthToken } from '@/shared/utils/auth';
import { Button } from '@/shared/ui';

import styles from './page.module.scss';

import { AuthForm } from '@/components/';
import SendInitDataButton from '@/components/SendInitDataButton/SendInitDataButton';

const Home: React.FC = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [authId, setAuthId] = useState('');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLogoVisible(false);
      setIsDivVisible(true);
    }, 3300);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setAuthId(token);
    }
  }, []);

  const handleAuthSuccess = (id: string) => {
    setAuthId(id);
  };

  const handleLogout = () => {
    setAuthToken('');
    setAuthId('');
  };

  return (
    <>
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
          <p>DEVELOP TEST HOME PAGE</p>
          <div className={styles.initDataRaw}>
            <SendInitDataButton />
            <Link href={'/auth'}>
              <Button type='button' text={'Auth'} color='default' />
            </Link>
          </div>
          <h1>Challenge App</h1>
          {authId != '' ? (
            <div className={styles.columnWrapper}>
              <div className={styles.tip}>
                All your progress will be saved based on your ID: <br />
                <span>{authId}</span>
                <br />
                <i>
                  or use default ID: <br /> 111
                </i>
              </div>
              <Button type='button' text={' New Id'} color='mini' onClick={handleLogout} />
              <Link href={'/challenges'}>
                <Button type='button' text={'My challenges'} color='default' />
              </Link>
            </div>
          ) : (
            <AuthForm onAuthSuccess={handleAuthSuccess} />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
