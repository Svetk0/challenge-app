'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

import { IChallenge } from '@/types';

export default function ListChallenges() {
  const [local, setLocal] = useState<IChallenge[]>([]);
  const challengeData = useSelector((state: RootState) => state.challenge);
  console.log('storeRedux', challengeData);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem('challenges') ?? '[]');
    setLocal(MY_CHALLENGES);
  }, []);

  return (
    <>
      My Challenges List
      <ol>
        {local.map((item: IChallenge) => (
          <li key={item.id}>{item.goalTitle}</li>
        ))}
      </ol>
    </>
  );
}
