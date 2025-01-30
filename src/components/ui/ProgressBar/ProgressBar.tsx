import { useState, useEffect } from 'react';
import { Button } from '@/components';
import styles from './progressBar.module.scss';

type Props = {
  finished_at: string | null;
  current: number;
  total: number;
};

export function ProgressBar({ finished_at, current, total }: Props) {
  const [currentProgress, setCurrentProgress] = useState<number>(current);
  useEffect(() => {
    if (currentProgress < 1) setCurrentProgress(0);
  }, [currentProgress]);
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
      <Button
        type='button'
        text={'-'}
        color='round'
        onClick={() => setCurrentProgress(currentProgress - 1)}
      />
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
      <Button
        type='button'
        text={'+'}
        color='round'
        onClick={() => setCurrentProgress(currentProgress + 1)}
      />
    </div>
  );
}
