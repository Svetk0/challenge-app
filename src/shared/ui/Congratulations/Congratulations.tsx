'use client';

import { Button } from '@/shared/ui';
import { HeroHappyIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';
import styles from './Congratulations.module.scss';

type Props = {
  onClose?: () => void;
};
const {
  congratulations: { title, message },
  buttons: { congrats },
} = staticData.root;
export function Congratulations({ onClose }: Props) {
  return (
    <div className={styles.container}>
      <HeroHappyIcon />
      <section className={styles.wrapper}>
        <h2>{title}</h2>
        <blockquote className={styles.content}>
          <code>{message}</code>
        </blockquote>
      </section>

      <Button type='button' text={congrats} color='mini' onClick={onClose} />
    </div>
  );
}
