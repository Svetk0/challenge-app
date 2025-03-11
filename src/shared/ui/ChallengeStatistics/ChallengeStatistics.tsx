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
    <>
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
          <h3 className={styles.subtitle}> {challenge?.description}</h3>
          <div>
            Status: in-progress; <br /> Periodicity: weekly;
            <br /> Successfully periods: 9;
            <br /> Missed periods: 1;
          </div>
        </div>
      )}
    </>
  );
}
