'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { TChallenge } from '@/types';
import { useGetAllChallengeListQuery } from '@/api/content';
import { setLocalStorage } from '@/utils/localStorage';
import { setChallenges } from '@/lib/features/challenges/challengeSlice';
import { ChallengeInfo, Button } from '@/components/';
import staticData from '@/constants/data.json';
import styles from './listChallenges.module.scss';

import { CardsSkeleton } from '../ui/Skeletons/Skeletons';

export default function ListChallenges() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    title,
    buttons: { add },
  } = staticData.challendes;
  const isLoading = true;
  const {
    data,
    error,
    //isLoading
  } = useGetAllChallengeListQuery(undefined, {
    //refetchOnMountOrArgChange: false,
    //refetchOnFocus: false,
    skip: false,
  });

  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  //const challengeData = [];

  useEffect(() => {
    if (data) {
      console.log('have data');
      if (data?.length !== challengeData.length) {
        setLocalStorage('challenges', data);
        dispatch(setChallenges(data));
        console.log('set local');
      }
    }
  }, [data, dispatch, challengeData]);

  if (error) {
    if ('status' in error) {
      throw new Error(`Error ${error.status}: Failed to load challenges`);
    }
    throw error;
  }

  if (isLoading && !challengeData.length) {
    return (
      <div className={styles.list}>
        Loading challenges...
        <CardsSkeleton />
      </div>
    );
  }

  const displayData = data || challengeData;

  return (
    <div className={styles.container}>
      <div className={styles.rowWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          type='button'
          text={add}
          color={displayData?.length !== 0 ? 'mini' : 'default-width'}
          onClick={() => router.push('/challenges/create')}
        />
      </div>

      {displayData?.length !== 0 && (
        <ol className={styles.list}>
          <CardsSkeleton />
          {displayData?.map((item: TChallenge) => (
            <li key={`challenge-${item.uuid}`}>
              <ChallengeInfo challenge={item} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
