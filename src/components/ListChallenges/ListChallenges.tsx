'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { TChallenge } from '@/types';
import { useGetAllChallengeListQuery } from '@/api/content';
import { setLocalStorage } from '@/utils/localStorage';
import { setChallenges } from '@/lib/features/challenges/challengeSlice';
import styles from './listChallenges.module.scss';

import { ChallengeInfo } from '@/components/';

export default function ListChallenges() {
  const dispatch = useDispatch();
  const [local, setLocal] = useState<TChallenge[]>([]);
  const { data, error, isLoading, isSuccess } = useGetAllChallengeListQuery();
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);

  console.log('fetchData', data, error, isLoading, isSuccess);
  console.log('storeRedux', challengeData);

  useEffect(() => {
    if (data) {
      setLocalStorage('challenges', data);
      dispatch(setChallenges(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem('challenges') ?? '[]');
    setLocal(MY_CHALLENGES);
    if (isSuccess) {
      setLocal(data);
    }
    console.log('local ', local);
  }, [isSuccess, data, local]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>My Challenges List</h2>
      <ol className={styles.list}>
        {data?.map((item: TChallenge) => (
          <li key={`challenge-${item.id}`}>
            <ChallengeInfo challenge={item} />
          </li>
        ))}
      </ol>
    </div>
  );
}
