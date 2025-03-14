import styles from './SummaryItem.module.scss';
type SummaryItemProps = {
  label: string;
  value: string | number;
};

export const SummaryItem = ({ label, value = '' }: SummaryItemProps) => (
  <div className={styles.rowWrapper}>
    <p className={styles.text}>{label}</p>
    <p className={styles.text}>{value}</p>
  </div>
);
