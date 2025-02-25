import Image from 'next/image';
import staticData from '@/shared/constants/data.json';
import styles from './Loading.module.scss';
const { loading } = staticData.root;
export function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Image src='/images/logo.svg' alt='Logo' width={150} height={150} className={styles.logo} />
      </div>
      <h2>{loading}</h2>
    </div>
  );
}
