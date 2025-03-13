'use client';

import { useEffect, useState } from 'react';
import { TChallenge } from '@/shared/types';
import { Button } from '@/shared/ui';
import { ArrowIcon } from '@/shared/ui/Icons';

import styles from './ChallengeStatistics.module.scss';

type Props = {
  nomination: {
    title: string;
    result: string | null;
  };
  challenge: TChallenge | null;
};
export function ChallengeStatistics({ nomination, challenge = null }: Props) {
  const [_currentData, setCurrentData] = useState(challenge);
  const [isMore, setIsMore] = useState<boolean>(false);
  useEffect(() => {
    setCurrentData(challenge);
  }, [challenge]);

  return (
    <div className={styles.container} onClick={() => setIsMore(!isMore)}>
      <div className={styles.rowWrapper}>
        <p className={styles.comments}>{nomination.title}</p>
        <p className={styles.comments}>{nomination.result}</p>
        <Button
          type='button'
          text={<ArrowIcon />}
          color='icon'
          onClick={() => setIsMore(!isMore)}
        />
      </div>
      {isMore && (
        <div className={styles.columnWrapper}>
          {/* <h3 className={styles.subtitle}> {challenge?.description}</h3>
          <div>
            Status: in-progress; <br /> Periodicity: weekly;
            <br /> Successfully periods: 9;
            <br /> Missed periods: 1;
          </div> */}
          <ChallengeSummary challenge={challenge} />
        </div>
      )}
    </div>
  );
}

type SummaryItemProps = {
  label: string;
  value: string | number;
};

const SummaryItem = ({ label, value = '' }: SummaryItemProps) => (
  <div className={styles.rowWrapper}>
    <p className={styles.text}>{label}</p>
    <p className={styles.text}>{value}</p>
  </div>
);

const ChallengeSummary = ({
  challenge,
  //duration,
  // total_progress,
  // goal_progress,
  // performance,
}: {
  challenge: TChallenge | null;
  //duration: number;
  // total_progress: number;
  // goal_progress: number;
  // performance: number;
}) => {
  const summaryData = [
    { label: 'Status', value: challenge?.is_finished ? 'Finished' : 'In-progress' },
    { label: 'Periodicity:', value: `every ${challenge?.period}` },
    { label: 'Dates:', value: `from ${challenge?.started_at} to ${challenge?.finished_at} ` },
    // { label: started, value: ` ${started_at} ` },
    // { label: finished, value: ` ${finished_at} ` },
    // { label: duration_days, value: `${Math.abs(duration)} days` },
    // { label: total_result, value: `${Math.abs(total_progress)} of ${Math.abs(goal_progress)}` },
    // { label: productivity, value: `${performance}%` },
  ];

  return (
    <div className={`${styles.columnWrapper} ${styles.summary}`}>
      <span className={styles.subtitle}>{challenge?.description}</span>
      {summaryData.map((item) => (
        <SummaryItem key={item.label} {...item} />
      ))}
    </div>
  );
};
