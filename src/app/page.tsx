'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { setAuthToken, getAuthToken } from '@/utils/auth';
import { Button, AuthForm } from '@/components/';

import styles from './page.module.scss';

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
            {authId ? (
              <div className={styles.columnWrapper}>
                <Link href={'/challenges'}>
                  <Button type='button' text={'My challenges'} color='default' />
                </Link>
                <div className={styles.tip}>
                  All your progress will be saved based on your ID: <br />
                  <span>{authId}</span>
                  <br />
                  <i>
                    or use default ID: <br /> 111
                  </i>
                </div>
                <Button type='button' text={' New Id'} color='mini' onClick={handleLogout} />
              </div>
            ) : (
              <AuthForm onAuthSuccess={handleAuthSuccess} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
