'use client';

import { useEffect, useState } from 'react';
import styles from './switcher.module.scss';

export default function Switcher() {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {}, [isActive]);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div
      className={isActive ? `${styles.switcher} ${styles.switcher_active}` : `${styles.switcher}`}
      onClick={handleToggle}
    >
      <div className={`${styles.switcherThumb} ${isActive ? styles.active : ''}`}> </div>
    </div>
  );
}
