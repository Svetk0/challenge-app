'use client';
// import Image from 'next/image';
// import staticData from '@/shared/constants/data.json';
import styles from './Toasts.module.scss';
//const { loading } = staticData.root;

type Props = {
  message: string;
};
export function ToastSuccess({ message }: Props) {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
    </div>
  );
}
