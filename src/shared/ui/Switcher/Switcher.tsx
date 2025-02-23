'use client';

import { Dispatch, useEffect } from 'react';
import styles from './Sswitcher.module.scss';

type Props = {
  label: string;
  isActive: boolean;
  setIsActive: Dispatch<boolean>;
};

export function Switcher({ label, isActive = false, setIsActive }: Props) {
  useEffect(() => {}, [isActive]);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={styles.rowWrapper}>
      <p className={styles.label}>{label}</p>

      <div
        className={isActive ? `${styles.switcher} ${styles.switcher_active}` : `${styles.switcher}`}
        onClick={handleToggle}
      >
        <div className={`${styles.switcherThumb} ${isActive ? styles.active : ''}`}> </div>
      </div>
    </div>
  );
}
