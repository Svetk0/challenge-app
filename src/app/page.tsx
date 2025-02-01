'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { setAuthToken, getAuthToken } from '@/utils/auth';
import { Button, Input } from '@/components/';

import styles from './page.module.scss';
type Props = {
  auth_id_input: number;
};
const Home: React.FC = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [authId, setAuthId] = useState('');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLogoVisible(false);
      setIsDivVisible(true);
    }, 3300); // 3000мс анимация и 300мс задержка

    return () => {
      clearTimeout(timer1);
    };
  }, []);
  useEffect(() => {
    const token: string | null = getAuthToken();
    if (token) {
      setAuthId(token);
    }
  }, [authId]);
  const { register, handleSubmit, reset } = useForm<Props>({
    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<Props> = async (data) => {
    console.log(data);
    setAuthToken(String(data.auth_id_input));
    setAuthId(String(data.auth_id_input));
    setTimeout(() => {}, 3300); // 3000мс анимация и 300мс задержка
    reset();
  };

  //setAuthToken(TELEGRAM_ID);
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
            {authId != '' ? (
              <div className={styles.columnWrapper}>
                <Link href={'/challenges'}>
                  <Button type='button' text={'My challenges'} color='default' />
                </Link>
                <div className={styles.tip}>
                  All your progress will be saved based on your ID: <br />
                  <span>{authId}</span>
                </div>
                <Button
                  type='button'
                  text={' New Id'}
                  color='mini'
                  onClick={() => {
                    setAuthToken('');
                    setAuthId('');
                  }}
                />
              </div>
            ) : (
              <form className={styles.formId} onSubmit={handleSubmit(onSubmit)}>
                <Input
                  placeholder={'type your id'}
                  type={'number'}
                  {...register('auth_id_input')}
                />
                <Button type='submit' text={'Submit'} color='default' />
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
