import { Button } from '@/components';
import styles from './progressBar.module.scss';

type Props = {
  finished_at: string;
  current: number;
  total: number;
};

export function ProgressBar({ finished_at, current, total }: Props) {
  const calculateDaysLeft = () => {
    const today = new Date();
    const endDate = new Date(finished_at);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const progress = (current / total) * 100;
  const daysLeft = calculateDaysLeft();
  return (
    <div className={styles.rowWrapper}>
      <Button
        type='button'
        text={'-'}
        color='round'
        //onClick={() => router.push('/challenges/create')}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.daysLeft}>{daysLeft} days left</span>
          <span className={styles.fraction}>
            {current} <span>of {total}</span>
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
        //onClick={() => router.push('/challenges/create')}
      />
    </div>
  );
}
