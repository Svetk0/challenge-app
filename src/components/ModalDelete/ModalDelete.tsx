'use client';
import { DeleteChallengeButton } from '@/shared/entities/ControlChallenge';
import { TChallenge } from '@/types';

import styles from './ModalDelete.module.scss';

type Props = {
  challenge: TChallenge;
};
export function ModalDelete({ challenge }: Props) {
  return (
    <div className={styles.wrapper}>
      <h3>Delete Challenge?</h3>
      <p>
        The challenge <br />
        <span>{challenge.description}</span>
        <br />
        and all its related progress will be removed. This action is irreversible!
      </p>

      <DeleteChallengeButton challenge={challenge} />
    </div>
  );
}
