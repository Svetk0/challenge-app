'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/shared/lib/store';
import { TChallenge } from '@/shared/types';
import { useGetAllChallengeListQuery } from '@/shared/api/content';
import { setLocalStorage, getLocalStorage } from '@/shared/utils';
import { setChallenges } from '@/shared/lib/features/challenges/challengeSlice';

import { Button, ListChallenges, ToastSuccess } from '@/shared/ui';
import { ChallengeInfo } from '@/widgets';

import staticData from '@/shared/constants/data.json';
import styles from './InProgressChallengesList.module.scss';
const {
  title,
  buttons: { add },
  errors: { get_all },
} = staticData.challenges;
const notify = () => toast.custom(<ToastSuccess message='my very tasty toast' />);
export function InProgressChallengesList() {
  const notificationData = useSelector((state: RootState) => state.notification.notification);
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  const [localChallenges, setLocalChallenges] = useState<TChallenge[] | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllChallengeListQuery(undefined, {
    skip: false,
  });

  useEffect(() => {
    const notify = () => toast.success(`${notificationData?.user_message}`);
    if (notificationData) {
      notify();
    }
  }, [notificationData]);
  useEffect(() => {
    setLocalChallenges(getLocalStorage('challenges'));
    console.log('get local', isLoading, localChallenges);
  }, [isLoading]);
  useEffect(() => {
    if (data) {
      console.log('have data');
      setLocalStorage('challenges', data);
      dispatch(setChallenges(data));
    }
  }, [data, dispatch, challengeData]);

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        throw new Error(`${error.status}: ${get_all}`);
      }
      throw error;
    }
  }, [error]);

  const displayData = data || challengeData;
  console.log('displayData, data:', data, 'store:', challengeData);

  return (
    <section className={styles.container}>
      <div className={styles.rowWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          type='button'
          text={add}
          color={displayData?.length !== 0 ? 'mini' : 'default-width'}
          onClick={() => router.push('/challenges/create')}
        />
      </div>
      <Button type='button' text={'toast'} color={'mini'} onClick={() => notify()} />
      <ListChallenges displayData={displayData}>
        <ChallengeInfo isLoading={isLoading} />
      </ListChallenges>
      <Toaster
        containerClassName={styles.toastsWrapper}
        toastOptions={{
          duration: 6000,
          position: 'bottom-center',
        }}
      />
    </section>
  );
}
