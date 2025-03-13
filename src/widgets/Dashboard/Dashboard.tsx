'use client';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {} from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/store';
import { TChallenge } from '@/shared/types';
import { setPeriods } from '@/shared/lib/features/statistics/statisticsSlice';
import { useGetOverallStatisticsQuery } from '@/shared/api/content';
import { BarStackedSingleChart } from '@/features';
import { ChallengeStatistics, ToastError } from '@/shared/ui';
import staticData from '@/shared/constants/data.json';
import styles from './Dashboard.module.scss';

const {
  title,
  summary: {
    periods: { title: periods_subtitle, comment: periods_comment },
    //challenges: { title: challenges_subtitle, comment: challenges_comment },
  },
  errors: { get_all: err_get_all },
} = staticData.dashboard;

export function Dashboard() {
  const dispatch = useDispatch();
  const {
    data,
    error,
    //isLoading
  } = useGetOverallStatisticsQuery(undefined, {
    skip: false,
  });

  useEffect(() => {
    if (data?.periods) {
      dispatch(setPeriods(data.periods));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        //setErrorCatched(`${error.status}: Server doesn't response`);
        const timer = setTimeout(() => {
          const notify = () =>
            toast.custom(<ToastError message={`${error.status}: ${err_get_all}` || err_get_all} />);
          notify();
          //setErrorCatched(null);
        }, 400);
        return () => clearTimeout(timer);
        //throw new Error(`${error.status}: Server doesn't response`);
      }
      //throw error;
    }
  }, [error]);
  const {
    challenges: { all = 0, completed = 0 } = {},
    effective_challenge: { percent = 0, challenge: challenge_effective = {} } = {},
    longest_challenge: { duration = 0, challenge: challenge_longest = {} } = {},
  } = data || {};
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>Overview</h3>
        <div className={styles.rowWrapper}>
          <p className={styles.comments}>Total completed challenges:</p>
          <p className={styles.comments}>
            {completed} of {all}
          </p>
        </div>
        <ChallengeStatistics
          nomination={{ title: 'The most effective challenge', result: `${percent * 100}%` }}
          challenge={challenge_effective as TChallenge}
        />
        <ChallengeStatistics
          nomination={{ title: 'The most longest challenge', result: `${duration} days` }}
          challenge={challenge_longest as TChallenge}
        />
      </div>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>{periods_subtitle}</h3>
        <p className={styles.comments}>{periods_comment}</p>
        <div className={styles.chartsContainer}>
          <ChartsSummary />
        </div>
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

const ChartsSummary = () => {
  const periods = useSelector((state: RootState) => state.statistics.periods);
  const summaryData = [
    {
      label: 'daily',
      successfully: periods.successful_periods.day,
      all: periods.all_periods.day,
    },
    {
      label: 'weekly',
      successfully: periods.successful_periods.week,
      all: periods.all_periods.week,
    },
    {
      label: 'monthly',
      successfully: periods.successful_periods.month,
      all: periods.all_periods.month,
    },
  ];

  return (
    <>
      {summaryData.map((item) => (
        <BarStackedSingleChart
          key={item.label}
          label={[item.label]}
          dataset={{
            successfully: item.successfully,
            all: item.all,
          }}
        />
      ))}
    </>
  );
};
