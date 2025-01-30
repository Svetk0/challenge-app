'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TChallenge } from '@/types';
import { EditIcon } from '@/components/ui/Icons/';
import { Button, ProgressBar } from '@/components';
import styles from './ChallengeInfo.module.scss';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};

export function ChallengeInfo({ isLoading, challenge }: Props) {
  const router = useRouter();
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const wrapperRef = useOutsideClick(() => setIsChoosen(false));

  useEffect(() => {}, [isChoosen]);

  if (isLoading || !challenge) {
    return <div>Loading...</div>;
  }
  const { id, description, is_finished, period } = challenge;
  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/challenges/edit/${id}`);
  };

  return (
    <div
      ref={wrapperRef}
      className={isChoosen ? `${styles.wrapper} ${styles.wrapper__active}` : `${styles.wrapper}`}
      onClick={() => {
        setIsChoosen(true);
      }}
    >
      <div className={styles.rowWrapper}>
        <span className={styles.description}>{description}</span>
        <Button
          type='button'
          text={<EditIcon id={`editIcon-${id}`} color={is_finished ? '#6FCF97' : '#9199F3'} />}
          color='icon'
          onClick={(e) => handleEditClick(e, id)}
        />
      </div>
      <div className={styles.rowWrapper}>
        <div className={styles.period}>{isChoosen ? '' : `every ${period}`}</div>
        <ProgressBar challenge={challenge} isMinimal={!isChoosen} />
      </div>
    </div>
  );
}
