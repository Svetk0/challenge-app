'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TChallenge } from '@/types';
import { formatDate } from '@/utils';
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
  const [isStarted, setIsStarted] = useState<boolean>(true);
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

  useEffect(() => {}, [isChoosen, isStarted]);
  useEffect(() => {
    if (challenge) {
      const today = new Date();
      const startDate = new Date(challenge.started_at);
      const diff = today.getTime() - startDate.getTime();
      if (diff < 0) setIsStarted(false);
      else setIsStarted(true);
    }
  }, [challenge]);
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
      className={
        isChoosen
          ? `${styles.wrapper} ${styles.wrapper__active}`
          : isStarted
            ? `${styles.wrapper}`
            : `${styles.wrapper} ${styles.wrapper__upcoming}`
      }
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
        <div className={styles.period}>
          {isChoosen ? (
            ''
          ) : isStarted ? (
            `every ${period}`
          ) : (
            <>
              starts at <br /> {formatDate(challenge.started_at)}
            </>
          )}
        </div>
        <ProgressBar challenge={challenge} isMinimal={!isChoosen} />
      </div>
    </div>
  );
}
