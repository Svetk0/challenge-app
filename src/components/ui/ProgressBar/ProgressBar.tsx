import styles from './progressBar.module.scss';

type Props = {
  daysLeft: number;
  current: number;
  total: number;
};

export function ProgressBar({ daysLeft, current, total }: Props) {
  const progress = (current / total) * 100;

  return (
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
  );
}
