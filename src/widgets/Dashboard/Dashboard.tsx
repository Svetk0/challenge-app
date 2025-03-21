'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/store';
import { TChallenge } from '@/shared/types';
import { setPeriods } from '@/shared/lib/features/statistics/statisticsSlice';
import { useGetOverallStatisticsQuery } from '@/shared/api/content';
import { BarStackedSingleChart, ChallengeStatistics } from '@/features';
import { DashboardSkeleton } from '@/shared/ui';
import staticData from '@/shared/constants/data.json';
import styles from './Dashboard.module.scss';

const {
  title,
  subtitle,
  summary: {
    periods: { title: periods_subtitle, comment: periods_comment },
  },
  nominations: {
    total_completed_challenges,
    most_effective_challenge,
    the_longest_challenge,
    notes,
  },
  errors: { get_all: err_get_all },
} = staticData.dashboard;

export function Dashboard() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetOverallStatisticsQuery(undefined, {
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
        throw new Error(`${error.status}: ${err_get_all}`);
      }
      throw error;
    }
  }, [error]);

  const {
    challenges: { all = 0, completed = 0 } = {},
    effective_challenge: { percent = 0, challenge: challenge_effective = {} } = {},
    longest_challenge: { duration = 0, challenge: challenge_longest = {} } = {},
  } = data || {};
  if (isLoading) return <DashboardSkeleton />;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <div className={styles.rowWrapper}>
          <p className={styles.comments}>{total_completed_challenges}</p>
          <p className={styles.comments}>
            {completed} of {all}
          </p>
        </div>
        <ChallengeStatistics
          nomination={{
            title: most_effective_challenge,
            result: `${Math.round(percent * 100)}%`,
            note: notes.effective_percent,
          }}
          challenge={challenge_effective as TChallenge}
        />
        <ChallengeStatistics
          nomination={{ title: the_longest_challenge, result: `${duration} days` }}
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
