//'use client';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useEditChallengeMutation } from '@/api/content';
import { TChallenge } from '@/types';
import { Button } from '@/components';
import styles from './progressBar.module.scss';

type Props = {
  challenge: TChallenge;
  isMinimal?: boolean;
};

export function ProgressBar({ challenge, isMinimal = false }: Props) {
  const [editChallenge] = useEditChallengeMutation();
  const [currentProgress, setCurrentProgress] = useState<number>(challenge.progress);

  const handleProgressChange = (increment: boolean) => {
    const newValue: number = increment ? currentProgress + 1 : currentProgress - 1;
    if (newValue < 0) return 0;

    setCurrentProgress(newValue);
    return newValue;
  };

  const updateProgress = useDebouncedCallback(async (updatedProgress: number) => {
    try {
      await editChallenge({
        id: challenge.id,
        dataEdit: {
          description: challenge.description,
          goal: challenge.goal,
          period: challenge.period,
          started_at: challenge.started_at,
          finished_at: challenge.finished_at,
          progress: updatedProgress,
          is_finished: false,
        },
      }).unwrap();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }, 2000);

  useEffect(() => {
    updateProgress(currentProgress);
  }, [currentProgress]);

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
    if (challenge.period != 'day') {
      const endDate = new Date(challenge.started_at);

      if (challenge.period === 'week') {
        const weekDays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        return `by ${weekDays[endDate.getDay()]}`;
      }
      if (challenge.period === 'month') {
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const end = endDate.getMonth() + 1 > 11 ? 0 : endDate.getMonth() + 1;
        return `${endDate.getDate()}th ${monthNames[end]}`;
      }
    }
    return null;
  };
  const progress = (currentProgress / challenge.goal) * 100;
  const daysLeft = calculateDaysLeft();
  const deadlinePeriod = calculateDeadlinePeriod();

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
    </div>
  );
}
