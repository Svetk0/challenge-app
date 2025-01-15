'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

import { TChallenge } from '@/types';

import { useGetAllChallengeListQuery } from '@/api/content';

export default function ListChallenges() {
  const TELEGRAM_ID = '111';

  const { data, error, isLoading, isSuccess } = useGetAllChallengeListQuery(TELEGRAM_ID);
  console.log('fetchData', data, error, isLoading, isSuccess);
  const [_local, setLocal] = useState<TChallenge[]>([]);
  const challengeData = useSelector((state: RootState) => state.challenge);
  console.log('storeRedux', challengeData);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem('challenges') ?? '[]');
    setLocal(MY_CHALLENGES);
  }, []);

  return (
    <>
      My Challenges List
      <ol>{data?.map((item: TChallenge) => <li key={item.id}>{item.description}</li>)}</ol>
    </>
  );
}
