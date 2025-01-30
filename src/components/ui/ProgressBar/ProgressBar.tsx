//'use client';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useEditChallengeMutation } from '@/api/content';
import { TChallenge } from '@/types';
import { Button } from '@/components';
import styles from './progressBar.module.scss';

type Props = {
  finished_at: string | null;
  current: number;
  total: number;
  challenge: TChallenge;
};

export function ProgressBar({ finished_at, current, total, challenge }: Props) {
  const [editChallenge] = useEditChallengeMutation();
  const [currentProgress, setCurrentProgress] = useState<number>(current);

  const handleProgressChange = (increment: boolean) => {
    setCurrentProgress((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
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
    if (finished_at != null) {
      const today = new Date();
      const endDate = new Date(finished_at);
      const diffTime = endDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return null;
  };
  const progress = (currentProgress / total) * 100;
  const daysLeft = calculateDaysLeft();
  return (
    <div className={styles.rowWrapper}>
      <Button type='button' text={'-'} color='round' onClick={() => handleProgressChange(false)} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.daysLeft}>
            {finished_at != null ? `${daysLeft} days left` : 'all time'}
          </span>
          <span className={styles.fraction}>
            {currentProgress} <span>of {total}</span>
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
