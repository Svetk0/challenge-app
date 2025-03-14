'use client';

import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/shared/lib/store';
import { useGetAllFinishedChallengeListQuery } from '@/shared/api/content';
import { setLocalStorage } from '@/shared/utils';
import { useNotificationHandler } from '@/shared/utils/hooks';
import { setFinishedChallenges } from '@/shared/lib/features/finished_challenges/finishedChallengesSlice';

import { ListChallenges, ToastSuccess } from '@/shared/ui';
import { FinishedChallengeInfo } from '@/widgets';

import staticData from '@/shared/constants/data.json';
import styles from './FinishedChallengesList.module.scss';
const {
  title,
  errors: { get_all },
} = staticData.finished_challenges_list;

export function FinishedChallengesList() {
  const { clearCurrentNotification } = useNotificationHandler();
  const notificationData = useSelector(
    (state: RootState) => state.notification.notification?.user_message
  );
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllFinishedChallengeListQuery(undefined, {
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
      setLocalStorage('finished_challenges', data);
      dispatch(setFinishedChallenges(data));
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
      </div>
      <ListChallenges displayData={displayData}>
        <FinishedChallengeInfo isLoading={isLoading} />
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
