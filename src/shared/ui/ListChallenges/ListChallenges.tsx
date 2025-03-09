'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { TChallenge } from '@/shared/types';

import styles from './ListChallenges.module.scss';

type Props = {
  children: React.ReactElement;
  displayData: TChallenge[] | undefined;
};
export function ListChallenges({ children, displayData }: Props) {
  const [currentData, setCurrentData] = useState(displayData);
  useEffect(() => {
    setCurrentData(displayData);
  }, [displayData]);
  return (
    <>
      {currentData?.length !== 0 && (
        <ol className={styles.list}>
          {currentData?.map((item: TChallenge) => (
            <li key={`challenge-${item.uuid}`}>
              {' '}
              {React.cloneElement(children, { challenge: item })}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
