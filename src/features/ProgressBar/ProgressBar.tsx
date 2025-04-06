'use client';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useEditChallengeMutation } from '@/shared/api/content';
import { formatDate } from '@/shared/utils';
import { useErrorHandler } from '@/shared/utils/hooks';
import { TChallenge } from '@/shared/types';
import { Button } from '@/shared/ui';
import { ModalCongrats } from '@/features';
import staticData from '@/shared/constants/data.json';
import styles from './ProgressBar.module.scss';

type Props = {
  challenge: TChallenge;
  isMinimal?: boolean;
};
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const {
  errors: { progress: progress_error },
} = staticData.challenge_info;

export function ProgressBar({ challenge, isMinimal = false }: Props) {
  const [editChallenge] = useEditChallengeMutation();
  const [currentProgress, setCurrentProgress] = useState<number>(challenge.progress);
  const [initialMount, setInitialMount] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleError } = useErrorHandler();

  const handleProgressChange = (increment: boolean) => {
    const newValue: number = increment ? currentProgress + 1 : currentProgress - 1;
    if (newValue < 0) return;

    setCurrentProgress(newValue);
  };
  useEffect(() => {
    setCurrentProgress(challenge.progress);
  }, [challenge.progress]);

  useEffect(() => {
    if (initialMount) {
      setIsOpen(false);
      setInitialMount(false);
      return;
    }
    updateProgress(currentProgress);
    const timer = setTimeout(() => {
      if (currentProgress >= challenge.goal) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [currentProgress]);

  const updateProgress = useDebouncedCallback(async (updatedProgress: number) => {
    try {
      await editChallenge({
        uuid: challenge.uuid,
        dataEdit: {
          progress: updatedProgress,
        },
      }).unwrap();
    } catch (error) {
      handleError(error, progress_error);
      setCurrentProgress(challenge.progress);
      throw error;
    }
  }, 500);

  const calculateDaysLeft = () => {
    if (challenge.finished_at != null) {
      const today = new Date();
      const endDate = new Date(challenge.finished_at);

      const diffTime = endDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return null;
  };
  const calculateDeadlinePeriod = () => {
    if (challenge.period_finished_at) {
      if (challenge.period === 'month') {
        return formatDate(challenge.period_finished_at, false);
      }
      if (challenge.period === 'week') {
        const endDatePeriod = new Date(challenge.period_finished_at) ?? null;
        return `by ${weekDays[endDatePeriod.getDay()]}`;
      }
    }
    return null;
  };

  const progress: number = (currentProgress / challenge.goal) * 100;
  const daysLeft: number | null = calculateDaysLeft();
  const deadlinePeriod: string | null = calculateDeadlinePeriod();

  if (isMinimal) {
    return (
      <div className={styles.minimalContainer}>
        <div className={styles.header}>
          <span className={`${styles.fraction} ${progress >= 100 ? styles.completed : ''}`}>
            {currentProgress} of {challenge.goal}
          </span>
          <span
            className={`${styles.fraction} ${progress >= 100 ? styles.completed : styles.inProgress}`}
          >
            {deadlinePeriod}
          </span>
        </div>
        <div className={styles.progressWrapper}>
          <div
            className={`${styles.progressBar} ${progress >= 100 ? styles.completed : styles.inProgress}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rowWrapper}>
      <Button type='button' text={'-'} color='round' onClick={() => handleProgressChange(false)} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.daysLeft}>
            {challenge.finished_at != null ? `${daysLeft} days left` : 'all time'}
          </span>
          <span className={styles.fraction}>
            {currentProgress} <span>of {challenge.goal}</span>
          </span>
        </div>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Button type='button' text={'+'} color='round' onClick={() => handleProgressChange(true)} />
      <ModalCongrats isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
