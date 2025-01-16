'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

import { TChallenge } from '@/types';

import { useGetAllChallengeListQuery } from '@/api/content';

export default function ListChallenges() {
  const { data, error, isLoading, isSuccess } = useGetAllChallengeListQuery('');
  console.log('fetchData', data, error, isLoading, isSuccess);
  const [local, setLocal] = useState<TChallenge[]>([]);
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);
  console.log('storeRedux', challengeData);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem('challenges') ?? '[]');
    setLocal(MY_CHALLENGES);
    if (isSuccess) {
      setLocal(data);
    }
    console.log('all ', local);
  }, [isSuccess]);

  return (
    <>
      My Challenges List
      <ol>
        {data?.map((item: TChallenge) => <li key={`challenge-${item.id}`}>{item.description}</li>)}
      </ol>
    </>
  );
}
