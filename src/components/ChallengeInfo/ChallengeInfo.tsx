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
    <li className={styles.wrapper}>
      <span className={styles.description}>{challenge.description}</span>
      <button
        className={styles.editButton}
        onClick={(e) => handleEditClick(e, challenge.id)}
        aria-label={`Edit challenge: ${challenge.description}`}
      >
        <EditIcon
          id={`editIcon-${challenge.id}`}
          color={challenge.is_finished ? '#6FCF97' : '#9199F3'}
        />
      </button>
      <Button
        type='button'
        text={'+'}
        color='round'
        //onClick={() => router.push('/challenges/create')}
      />
    </li>
  );
}
