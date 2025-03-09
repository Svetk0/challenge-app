'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NavigationItem } from './NavigationItem';
import { ChartIcon, ClipboardIcon, HomeIcon } from '@/shared/ui/Icons';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname);

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const item = e.currentTarget.getAttribute('data-list-item');
    if (item) setSelected(item);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navigation}>
        <ul>
          <NavigationItem
            href='/challenges'
            icon={<HomeIcon size={20} />}
            text='Challenges'
            onClick={handleClick}
            isSelected={selected === '/challenges'}
            dataListItem='/challenges'
          />
          <NavigationItem
            href='/dashboard'
            icon={<ChartIcon size={20} />}
            text='Progress'
            onClick={handleClick}
            isSelected={selected === '/dashboard'}
            dataListItem='/dashboard'
          />
          <NavigationItem
            href='/finished'
            icon={<ClipboardIcon size={20} />}
            text='Finished'
            onClick={handleClick}
            isSelected={selected === '/finished'}
            dataListItem='/finished'
          />
          <div className={styles.indicator}></div>
        </ul>
      </div>
    </div>
  );
};
