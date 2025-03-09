'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useErrorHandler } from '@/shared/utils/hooks';
import { RootState } from '@/shared/lib/store';
import { useOutsideClick } from '@/shared/utils/hooks';
import { TChallenge } from '@/shared/types';

import { ModalDelete } from '@/features';
import {
  MakeActiveChallengeButton,
  EditChallengeIconButton,
} from '@/features/ManageChallenge/ManageChallenge';
import { Button, CardSkeleton } from '@/shared/ui';

import staticData from '@/shared/constants/data.json';
import styles from './FinishedChallengeInfo.module.scss';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};
const {
  buttons: { remove },
} = staticData.challenge_info;

export function FinishedChallengeInfo({ isLoading, challenge }: Props) {
  const errorData = useSelector((state: RootState) => state.error.error);
  const { clearCurrentError } = useErrorHandler();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
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
  useEffect(() => {}, [errorData]);
  useEffect(() => {}, [challenge, isLoading]);
  useEffect(() => {}, [isChoosen, isModalOpened]);

  if (isLoading || !challenge) {
    return <CardSkeleton />;
  }
  const { description, period, goal, total_progress = 0, goal_progress = 1, duration } = challenge;
  const performance: number = Math.round((+total_progress / +goal_progress) * 100);
  return (
    <div
      ref={wrapperRef}
      id={`challenge-${challenge?.uuid}`}
      className={isChoosen ? `${styles.wrapper} ${styles.wrapper__active}` : `${styles.wrapper}`}
      onClick={() => {
        setIsChoosen(true);
        scrollToCenter();
        clearCurrentError();
      }}
    >
      <div className={styles.rowWrapper}>
        <div className={styles.columnWrapper}>
          <span className={styles.description}>{description}</span>
          <p className={styles.comments}>{`Note: ${goal} actions per ${period}`}</p>
        </div>
        <EditChallengeIconButton challenge={challenge} />
      </div>
      {isChoosen ? (
        <div className={`${styles.columnWrapper} ${styles.summary}`}>
          <span className={styles.subtitle}>Summary</span>
          <div className={styles.rowWrapper}>
            <p className={styles.text}>Duration </p>
            <p className={styles.text}> {duration} days</p>
          </div>
          <div className={styles.rowWrapper}>
            <p className={styles.text}>Total result </p>
            <p className={styles.text}>
              {total_progress} of {goal_progress}
            </p>
          </div>
          <div className={styles.rowWrapper}>
            <p className={styles.text}>Performance </p>
            <p className={styles.text}>{performance}%</p>
          </div>
        </div>
      ) : null}
      {isChoosen ? (
        <div className={styles.rowWrapper}>
          {errorData && <div className={styles.error}> {errorData.user_message}</div>}
          <MakeActiveChallengeButton challenge={challenge} />
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
