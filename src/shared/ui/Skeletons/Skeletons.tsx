import styles from './Skeletons.module.scss';

export function CardSkeleton() {
  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.description}></div>
    </div>
  );
}
