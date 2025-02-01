'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { TChallenge } from '@/types';
import { useGetAllChallengeListQuery } from '@/api/content';
import { setLocalStorage } from '@/utils/localStorage';
import { setChallenges } from '@/lib/features/challenges/challengeSlice';
import { ChallengeInfo, Button } from '@/components/';
import staticData from '@/constants/data.json';
import styles from './listChallenges.module.scss';

export default function ListChallenges() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    title,
    buttons: { add },
  } = staticData.challendes;
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
    } else {
      setLocal(MY_CHALLENGES);
    }
    console.log('local ', local);
  }, [isSuccess, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error && local.length === 0) {
    const errorMessage = 'An unknown error occurred.';
    const status = 'status' in error ? error.status : undefined;
    const statusOriginal = 'originalStatus' in error ? error.originalStatus : undefined;
    return (
      <div>
        Error {statusOriginal ? `${statusOriginal}:` : errorMessage}{' '}
        {status ? `${status}` : errorMessage}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.rowWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          type='button'
          text={add}
          color={local?.length != 0 ? 'mini' : 'default-width'}
          onClick={() => router.push('/challenges/create')}
        />
      </div>
      {local?.length != 0 && (
        <ol className={styles.list}>
          {data?.map((item: TChallenge) => (
            <li key={`challenge-${item.id}`}>
              <ChallengeInfo challenge={item} />
            </li>
          ))}
        </ol>
      )}

      {error && <div className={styles.error}>{`Error updating :(`}</div>}
    </div>
  );
}
