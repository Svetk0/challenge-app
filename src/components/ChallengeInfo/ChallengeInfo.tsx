'use client';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TChallenge } from '@/types';
import { formatDate } from '@/utils';

import { Button, ProgressBar, ModalDelete } from '@/components';
import {
  CompleteChallengeButton,
  EditChallengeIconButton,
} from '@/shared/entities/ControlChallenge';

import staticData from '@/constants/data.json';
import styles from './ChallengeInfo.module.scss';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};
const {
  loading,
  period: { every, starts_at },
  buttons: { remove },
} = staticData.challenge_info;
export function ChallengeInfo({ isLoading, challenge }: Props) {
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
    return <div>{loading}</div>;
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
