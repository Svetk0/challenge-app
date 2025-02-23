'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/shared/lib/store';
import { TChallenge } from '@/shared/types';
import { useGetAllChallengeListQuery } from '@/api/content';
import { setLocalStorage, getLocalStorage } from '@/shared/utils';
import { setChallenges } from '@/shared/lib/features/challenges/challengeSlice';

import { Button, CardSkeleton } from '@/shared/ui';
import { ChallengeInfo } from '@/widgets/';

import staticData from '@/shared/constants/data.json';
import styles from './ListChallenges.module.scss';

export function ListChallenges() {
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  const [localChallenges, setLocalChallenges] = useState<TChallenge[] | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    title,
    loading,
    buttons: { add },
  } = staticData.challenges;

  const { data, error, isLoading } = useGetAllChallengeListQuery(undefined, {
    skip: false,
  });

  useEffect(() => {
    setLocalChallenges(getLocalStorage('challenges'));
    console.log('get local', localChallenges);
  }, [isLoading]);
  useEffect(() => {
    if (data) {
      console.log('have data');
      setLocalStorage('challenges', data);
      dispatch(setChallenges(data));
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
        {localChallenges?.length !== 0 ? (
          localChallenges?.map((item: TChallenge) => (
            <CardSkeleton key={`challenge-${item.uuid}`} />
          ))
        ) : (
          <span>{loading}</span>
        )}
      </div>
    );
  }

  const displayData = data || challengeData;
  console.log('displayData, data:', data, 'store:', challengeData);

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
