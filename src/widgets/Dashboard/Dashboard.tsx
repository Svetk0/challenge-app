'use client';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BarStackedChart, BarChart } from '@/features';
import { Button, ToastError } from '@/shared/ui';
import { ArrowIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';
import styles from './Dashboard.module.scss';

const {
  title,
  summary: {
    periods: { title: periods_subtitle, comment: periods_comment },
    challenges: { title: challenges_subtitle, comment: challenges_comment },
  },
  errors: { get_all: err_get_all },
} = staticData.dashboard;

const error = {
  status: 500,
  message: "Server doesn't response",
};

export function Dashboard() {
  //const [errorCatched, setErrorCatched] = useState<string | null>(null);
  const [isMore, setIsMore] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        //setErrorCatched(`${error.status}: Server doesn't response`);
        const timer = setTimeout(() => {
          const notify = () =>
            toast.custom(
              <ToastError message={`${error.status}: Server doesn't response` || err_get_all} />
            );
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
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>Overview</h3>
        <div className={styles.rowWrapper}>
          <p className={styles.comments}>The longest challenge:</p>
          <p className={styles.comments}>92 days</p>
          <Button
            type='button'
            text={<ArrowIcon />}
            color='icon'
            //onClick={(e) => handleOpenInfo(e)}
          />
        </div>

        <div className={styles.rowWrapper}>
          <p className={styles.comments}>The most effective challenge:</p>
          <p className={styles.comments}>89%</p>
          <Button
            type='button'
            text={<ArrowIcon />}
            color='icon'
            onClick={() => setIsMore(!isMore)}
          />
        </div>
        {isMore && (
          <div className={styles.columnWrapper}>
            <h3 className={styles.subtitle}>Challenge: Gym 2 times per week</h3>
            <div>
              Status: in-progress; <br /> Periodicity: weekly;
              <br /> Successfully periods: 9;
              <br /> Missed periods: 1;
            </div>
          </div>
        )}
      </div>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>{periods_subtitle}</h3>
        <p className={styles.comments}>{periods_comment}</p>
        <BarStackedChart />
      </div>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>{challenges_subtitle}</h3>
        <p className={styles.comments}>{challenges_comment}</p>
        <BarChart />
      </div>

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
