'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/shared/lib/store';
import { useGetAllChallengeListQuery } from '@/shared/api/content';
import { setLocalStorage } from '@/shared/utils';
import { useNotificationHandler } from '@/shared/utils/hooks';
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

export function InProgressChallengesList() {
  const { clearCurrentNotification } = useNotificationHandler();
  const notificationData = useSelector(
    (state: RootState) => state.notification.notification?.user_message
  );
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllChallengeListQuery(undefined, {
    skip: false,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notificationData) {
        const notify = () => toast.custom(<ToastSuccess message={notificationData || ''} />);
        notify();
        clearCurrentNotification();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [notificationData]);

  useEffect(() => {
    if (data) {
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
      <ListChallenges displayData={displayData}>
        <ChallengeInfo isLoading={isLoading} />
      </ListChallenges>
      <Toaster
        containerClassName={styles.toastsWrapper}
        toastOptions={{
          duration: 2000,
          position: 'bottom-center',
        }}
      />
    </section>
  );
}
