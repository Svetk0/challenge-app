//'use client';
import { useState } from 'react';
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
  //challenge.progress = 5;
  const [editChallenge] = useEditChallengeMutation();
  const [currentProgress, setCurrentProgress] = useState<number>(challenge.progress);

  const handleProgressChange = (increment: boolean) => {
    setCurrentProgress((prev) => {
      const newValue: number = increment ? prev + 1 : prev - 1;
      if (newValue < 0) return 0;
      return newValue;
    });
    updateProgress(currentProgress);
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
      console.log('updateProgress', updatedProgress);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }, 2000);

  const calculateDaysLeft = () => {
    if (challenge.finished_at != null) {
      const today = new Date();
      const endDate = new Date(challenge.finished_at);
      const diffTime = endDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return null;
  };
  const progress = (currentProgress / challenge.goal) * 100;
  const daysLeft = calculateDaysLeft();

  if (isMinimal) {
    return (
      <div className={styles.minimalContainer}>
        <div className={styles.header}>
          <span className={styles.fraction}>
            {currentProgress} of {challenge.goal}
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
          <div
            className={`${styles.progressBar} ${progress >= 100 ? styles.completed : styles.inProgress}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
      <Button type='button' text={'+'} color='round' onClick={() => handleProgressChange(true)} />
    </div>
  );
}
