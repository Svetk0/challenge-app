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

  const scrollToCenter = () => {
    setTimeout(() => {
      const element = document.getElementById(`challenge-${challenge?.uuid}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  };

  useEffect(() => {}, [isChoosen]);

  if (isLoading || !challenge) {
    return <div>Loading...</div>;
  }
  const { uuid, description, period } = challenge;
  const handleEditClick = (e: React.MouseEvent, uuid: string) => {
    e.stopPropagation();
    router.push(`/challenges/edit/${uuid}`);
  };

  return (
    <div
      ref={wrapperRef}
      id={`challenge-${challenge?.uuid}`}
      className={isChoosen ? `${styles.wrapper} ${styles.wrapper__active}` : `${styles.wrapper}`}
      onClick={() => {
        setIsChoosen(true);
        scrollToCenter();
      }}
    >
      <div className={styles.rowWrapper}>
        <span className={styles.description}>{description}</span>
        <Button
          type='button'
          text={<EditIcon id={`editIcon-${uuid}`} />}
          color='icon'
          onClick={(e) => handleEditClick(e, uuid)}
        />
      </div>
      <div className={styles.rowWrapper}>
        <div className={styles.period}>{isChoosen ? '' : `every ${period}`}</div>
        <ProgressBar challenge={challenge} isMinimal={!isChoosen} />
      </div>
    </div>
  );
}
