'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { TChallenge } from '@/types';
import { useGetAllChallengeListQuery } from '@/api/content';
import { setLocalStorage } from '@/utils/localStorage';
import { setChallenges } from '@/lib/features/challenges/challengeSlice';

export default function ListChallenges() {
  const dispatch = useDispatch();
  const { data, error, isLoading, isSuccess } = useGetAllChallengeListQuery();
  console.log('fetchData', data, error, isLoading, isSuccess);
  const [local, setLocal] = useState<TChallenge[]>([]);
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  console.log('storeRedux', challengeData);

  useEffect(() => {
    if (data) {
      // Сохраняем в localStorage
      setLocalStorage('challenges', data);

      // Обновляем Redux store
      dispatch(setChallenges(data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem('challenges') ?? '[]');
    setLocal(MY_CHALLENGES);
    if (isSuccess) {
      setLocal(data);
    }
    console.log('all ', local);
  }, []);

  return (
    <>
      My Challenges List
      <ol>
        {data?.map((item: TChallenge) => <li key={`challenge-${item.id}`}>{item.description}</li>)}
      </ol>
    </>
  );
}
