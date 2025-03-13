'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useErrorHandler } from '@/shared/utils/hooks';
import { RootState } from '@/shared/lib/store';
import { formatDate } from '@/shared/utils';
import { useOutsideClick } from '@/shared/utils/hooks';
import { TChallenge } from '@/shared/types';

import { ModalDelete } from '@/features';
import {
  MakeActiveChallengeButton,
  EditChallengeIconButton,
} from '@/features/ManageChallenge/ManageChallenge';
import { Button, CardSkeleton } from '@/shared/ui';

import staticData from '@/shared/constants/data.json';
import styles from './FinishedChallengeInfo.module.scss';

type Props = {
  isLoading?: boolean;
  challenge?: TChallenge;
};
const {
  buttons: { remove },
  comments: { subtitle, actions_per, note_total_result },
  summary_labels: { summary_title, duration_days, total_result, productivity, finished, started },
} = staticData.challenge_info;

export function FinishedChallengeInfo({ isLoading, challenge }: Props) {
  const errorData = useSelector((state: RootState) => state.error.error);
  const { clearCurrentError } = useErrorHandler();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const wrapperRef = useOutsideClick(() => setIsChoosen(false));

  const scrollToCenter = () => {
    setTimeout(() => {
      const element = document.getElementById(`finished-${challenge?.uuid}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  };
  useEffect(() => {}, [errorData]);
  useEffect(() => {}, [challenge, isLoading]);
  useEffect(() => {}, [isChoosen, isModalOpened]);

  if (isLoading || !challenge) {
    return <CardSkeleton />;
  }
  const {
    description,
    period,
    goal,
    total_progress = 0,
    goal_progress = 1,
    duration = 0,
    started_at = 'unknown',
    finished_at = 'unknown',
  } = challenge;
  const performance: number =
    +goal_progress === 0 ? 0 : Math.round((+total_progress / +goal_progress) * 100);
  return (
    <div
      ref={wrapperRef}
      id={`finished-${challenge?.uuid}`}
      className={isChoosen ? `${styles.wrapper} ${styles.wrapper__active}` : `${styles.wrapper}`}
      onClick={() => {
        setIsChoosen(true);
        scrollToCenter();
        clearCurrentError();
      }}
    >
      <div className={styles.rowWrapper}>
        <div className={styles.columnWrapper}>
          <span className={styles.description}>{description}</span>
          <p className={styles.comments}>{`${subtitle} ${goal} ${actions_per} ${period}`}</p>
        </div>
        <EditChallengeIconButton challenge={challenge} />
      </div>
      {isChoosen ? (
        <ChallengeSummary
          duration={+duration}
          total_progress={+total_progress}
          goal_progress={+goal_progress}
          performance={performance}
          started_at={formatDate(started_at)}
          finished_at={finished_at ? formatDate(finished_at) : 'unknown'}
        />
      ) : null}
      {isChoosen ? (
        <div className={styles.rowWrapper}>
          {errorData && <div className={styles.error}> {errorData.user_message}</div>}
          <MakeActiveChallengeButton challenge={challenge} />
          <Button
            type='button'
            text={remove}
            color='control_red'
            onClick={() => setIsModalOpened(true)}
          />
        </div>
      ) : null}

      <ModalDelete
        isOpen={isModalOpened}
        onClose={() => {
          setIsModalOpened(false);
        }}
        challenge={challenge}
      />
    </div>
  );
}

type SummaryItemProps = {
  label: string;
  value: string | number;
};

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <div className={styles.rowWrapper}>
    <p className={styles.text}>{label}</p>
    <p className={styles.text}>{value}</p>
  </div>
);

const ChallengeSummary = ({
  duration,
  total_progress,
  goal_progress,
  performance,
  started_at,
  finished_at,
}: {
  duration: number;
  total_progress: number;
  goal_progress: number;
  performance: number;
  started_at: string;
  finished_at: string;
}) => {
  const summaryData = [
    { label: duration_days, value: `${Math.abs(duration)} days` },
    {
      label: total_result,
      value: `${Math.abs(total_progress)} of ${Math.abs(goal_progress)}`,
      comment: `${note_total_result}`,
    },
    { label: productivity, value: `${performance}%` },
    { label: started, value: ` ${started_at} ` },
    { label: finished, value: ` ${finished_at} ` },
  ];

  return (
    <div className={`${styles.columnWrapper} ${styles.summary}`}>
      <span className={styles.subtitle}>{summary_title}</span>
      {summaryData.map((item) => (
        <>
          <SummaryItem key={item.label} {...item} />
          {item.comment && <p className={styles.note}>{item.comment}</p>}
        </>
      ))}
    </div>
  );
};
