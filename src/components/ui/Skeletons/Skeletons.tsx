// Loading animation
import styles from './Skeletons.module.scss';

export function CardSkeleton() {
  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.description}></div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}
