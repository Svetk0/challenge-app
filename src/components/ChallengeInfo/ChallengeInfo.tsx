'use client';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TChallenge } from '@/types';
import { formatDate } from '@/utils';

import { ProgressBar, Modal } from '@/components';
import {
  CompleteChallengeButton,
  DeleteChallengeButton,
  EditChallengeIconButton,
} from '@/shared/entities/ControlChallenge';

import staticData from '@/constants/data.json';
import styles from './ChallengeInfo.module.scss';
import { ModalDelete } from '../ModalDelete/ModalDelete';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};

export function ChallengeInfo({ isLoading, challenge }: Props) {
  const {
    loading,
    period: { every, starts_at },
  } = staticData.challenge_info;

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
          <DeleteChallengeButton challenge={challenge} />
        </div>
      ) : null}
      <Modal
        isOpen={isChoosen}
        onClose={() => {
          console.log('modal is open');
        }}
        // width='260px'
        // height='360px'
      >
        <ModalDelete challenge={challenge} />
      </Modal>
    </div>
  );
}
