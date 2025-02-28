import Image from 'next/image';
import staticData from '@/shared/constants/data.json';
import styles from './Loading.module.scss';
const { loading } = staticData.root;
export function Loading() {
  return (
    <div className={styles.wrapper}>
      <Image src='/images/logo.svg' alt='Logo' width={100} height={100} className={styles.logo} />
      <h2>{loading}</h2>
    </div>
  );
}
