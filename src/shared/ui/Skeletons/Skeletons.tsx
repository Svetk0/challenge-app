import styles from './Skeletons.module.scss';

export function CardSkeleton() {
  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.description}></div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className={`${styles.chartWrapper} `}>
      <div className={`${styles.wrapper} ${styles.wrapper__transparent} `}>
        <div className={styles.description}></div>
        <div className={styles.description}></div>
      </div>
      <div className={styles.chartDescription}></div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className={`${styles.wrapper} ${styles.wrapper__list}  `}>
      <div className={styles.description}></div>
      <div className={styles.description}></div>
      <div className={styles.description}></div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className={`${styles.container} `}>
      <ListSkeleton />
      <ChartSkeleton />
    </div>
  );
}
