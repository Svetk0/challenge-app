'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useErrorHandler } from '@/shared/utils/hooks';
import { RootState } from '@/shared/lib/store';
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
} = staticData.challenge_info;

export function FinishedChallengeInfo({ isLoading, challenge }: Props) {
  const errorData = useSelector((state: RootState) => state.error.error);
  const { clearCurrentError } = useErrorHandler();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const wrapperRef = useOutsideClick(() => setIsChoosen(false));

  const scrollToCenter = () => {
    setTimeout(() => {
      const element = document.getElementById(`challenge-${challenge?.uuid}`);
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
    //period
  } = challenge;

  return (
    <div
      ref={wrapperRef}
      id={`challenge-${challenge?.uuid}`}
      className={isChoosen ? `${styles.wrapper} ${styles.wrapper__active}` : `${styles.wrapper}`}
      onClick={() => {
        setIsChoosen(true);
        scrollToCenter();

        clearCurrentError();
      }}
    >
      <div className={styles.rowWrapper}>
        <span className={styles.description}>{description}</span>
        <EditChallengeIconButton challenge={challenge} />
      </div>
      {/* <div className={styles.rowWrapper}>
        <div className={styles.period}>
          {isChoosen ? (
            ''
          ) : (
            <>
              {starts_at} <br /> {formatDate(challenge.started_at)}
            </>
          )}
        </div>
        <ProgressBar challenge={challenge} isMinimal={!isChoosen} />
      </div> */}
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
