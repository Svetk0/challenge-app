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
    note?: string | null;
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
      {nomination.note && <p className={styles.note}>{nomination.note}</p>}
      {isMore && <ChallengeSummary challenge={challenge} />}
    </div>
  );
}

const ChallengeSummary = ({ challenge }: { challenge: TChallenge | null }) => {
  const summaryData = [
    { label: 'Status', value: challenge?.is_finished ? 'Finished' : 'In-progress' },
    { label: 'Periodicity', value: `every ${challenge?.period}` },
    {
      label: ' total_result',
      value: `${Math.abs(challenge?.total_progress || 0)} of ${Math.abs(challenge?.goal_progress || 0)}`,
      comment: `${'note_total_result'}`,
    },
    { label: 'duration_days', value: `${Math.abs(challenge?.duration || 0)} days` },
    { label: 'Started from', value: ` ${formatDate(challenge?.started_at || 'unknown')} ` },
    {
      label: 'Finished at',
      value: challenge?.finished_at ? ` ${formatDate(challenge?.finished_at)} ` : 'unknown',
    },
  ];

  return (
    <div className={styles.columnWrapper}>
      <span className={styles.subtitle}>{challenge?.description}</span>
      {summaryData.map((item) => (
        <>
          <SummaryItem key={item.label} {...item} />
          {item.comment && <p className={styles.note}>{item.comment}</p>}
        </>
      ))}
    </div>
  );
};
