'use client';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/shared/utils/hooks/useOutsideClick';
import { TChallenge } from '@/shared/types';
import { formatDate } from '@/shared/utils';

import { Button, CardSkeleton } from '@/shared/ui';
import { ProgressBar, ModalDelete } from '@/features';
import {
  CompleteChallengeButton,
  EditChallengeIconButton,
} from '@/features/ManageChallenge/ManageChallenge';

import staticData from '@/shared/constants/data.json';
import styles from './ChallengeInfo.module.scss';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};
const {
  period: { every, starts_at },
  buttons: { remove },
} = staticData.challenge_info;
export function ChallengeInfo({ isLoading, challenge }: Props) {
  //console.log('challenge render', challenge?.description);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
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
  useEffect(() => {}, [challenge]);
  useEffect(() => {}, [isChoosen, isStarted, isModalOpened]);
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
    return <CardSkeleton />;
  }
  const { description, period } = challenge;

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
        <EditChallengeIconButton challenge={challenge} />
      </div>
      <div className={styles.rowWrapper}>
        <div className={styles.period}>
          {isChoosen ? (
            ''
          ) : isStarted ? (
            `${every} ${period}`
          ) : (
            <>
              {starts_at} <br /> {formatDate(challenge.started_at)}
            </>
          )}
        </div>
        <ProgressBar challenge={challenge} isMinimal={!isChoosen} />
      </div>
      {isChoosen ? (
        <div className={styles.rowWrapper}>
          <CompleteChallengeButton challenge={challenge} />
          <Button
            type='button'
            text={remove}
            color='control_red'
            onClick={() => setIsModalOpened(true)}
          />
        </div>
      ) : null}

      <ModalDelete
        isOpen={isModalOpened}
        onClose={() => {
          setIsModalOpened(false);
        }}
        challenge={challenge}
      />
    </div>
  );
}
