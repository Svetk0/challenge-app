'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/shared/utils';
import { useOutsideClick } from '@/shared/utils/hooks';
import { TChallenge } from '@/shared/types';
import { Button, SummaryItem } from '@/shared/ui';
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
  const wrapperRef = useOutsideClick(() => setIsMore(false));
  useEffect(() => {
    setCurrentData(challenge);
  }, [challenge]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.container} ${isMore ? styles.container__active : ''}`}
      onClick={() => setIsMore(!isMore)}
    >
      <div className={styles.rowWrapper}>
        <p className={styles.comments}>{nomination.title}</p>
        <p className={styles.comments}>{nomination.result}</p>
        <Button
          type='button'
          text={
            <div className={`${styles.arrowIcon} ${isMore ? styles.arrowIcon__active : ''}`}>
              <ArrowIcon />
            </div>
          }
          color='icon'
          onClick={() => setIsMore(!isMore)}
        />
      </div>
      {/* {isMore ?
        (<div className={`${styles.columnWrapper}` >
        </div>)
        : null} */}
      {isMore && <ChallengeSummary challenge={challenge} />}
    </div>
  );
}

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
    { label: 'Started from', value: ` ${formatDate(challenge?.started_at || 'unknown')} ` },
    { label: 'Finished at', value: ` ${formatDate(challenge?.finished_at || 'unknown')} ` },
    // { label: duration_days, value: `${Math.abs(duration)} days` },
    // { label: total_result, value: `${Math.abs(total_progress)} of ${Math.abs(goal_progress)}` },
    // { label: productivity, value: `${performance}%` },
  ];

  return (
    <div className={styles.columnWrapper}>
      <span className={styles.subtitle}>{challenge?.description}</span>
      {summaryData.map((item) => (
        <SummaryItem key={item.label} {...item} />
      ))}
    </div>
  );
};
