'use client';
//import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { TChallenge } from '@/types';
import { EditIcon } from '@/components/ui/Icons/';
import { Button } from '@/components/ui';
import styles from './ChallengeInfo.module.scss';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};

export function ChallengeInfo({ isLoading, challenge }: Props) {
  const router = useRouter();

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/challenges/edit/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowWrapper}>
        <span className={styles.description}>{challenge.description}</span>
        <Button
          type='button'
          text={
            <EditIcon
              id={`editIcon-${challenge.id}`}
              color={challenge.is_finished ? '#6FCF97' : '#9199F3'}
            />
          }
          color='icon'
          onClick={(e) => handleEditClick(e, challenge.id)}
        />
      </div>
      <div className={styles.rowWrapper}>
        <Button
          type='button'
          text={'-'}
          color='round'
          //onClick={() => router.push('/challenges/create')}
        />
        <Button
          type='button'
          text={'+'}
          color='round'
          //onClick={() => router.push('/challenges/create')}
        />
      </div>
    </div>
  );
}
