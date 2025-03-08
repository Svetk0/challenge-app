'use client';
import {
  //useState,
  useEffect,
} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BarStackedChart, BarChart } from '@/features';
import { ToastError } from '@/shared/ui';
import styles from './Dashboard.module.scss';
const error = {
  status: 500,
  message: "Server doesn't response",
};
export function Dashboard() {
  //const [errorCatched, setErrorCatched] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        //setErrorCatched(`${error.status}: Server doesn't response`);
        const timer = setTimeout(() => {
          const notify = () =>
            toast.custom(<ToastError message={`${error.status}: Server doesn't response` || ''} />);
          notify();
          //setErrorCatched(null);
        }, 400);
        return () => clearTimeout(timer);
        // throw new Error(`${error.status}: Server doesn't response`);
      }
      //throw error;
    }
  }, [error]);
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>Summary of periods</h3>
        <p className={styles.comments}>Your successfully periods in all challenges</p>
        <BarStackedChart />
      </div>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>Summary of challenges</h3>
        <p className={styles.comments}>Your full statistics</p>
        <BarChart />
      </div>
      {/* <div className={styles.bottom}>
        {errorCatched && <div className={styles.error}> {errorCatched}</div>}
      </div> */}
      <Toaster
        containerClassName={styles.toastsWrapper}
        toastOptions={{
          duration: 5000,
          position: 'bottom-center',
        }}
      />
    </section>
  );
}
