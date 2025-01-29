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
  const { id, description, is_finished, goal, _progress, finished_at } = challenge;

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/challenges/edit/${id}`);
  };

  useEffect(() => {
    console.log('isChoosen', isChoosen);
  }, [isChoosen]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <ProgressBar finished_at={finished_at} current={4} total={goal} />
    </div>
  );
}
