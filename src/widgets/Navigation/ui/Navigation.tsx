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
            href='/history'
            icon={<ClipboardIcon size={20} />}
            text='Completed'
            onClick={handleClick}
            isSelected={selected === '/history'}
            dataListItem='/history'
          />
          {/* <ListItem
          href="/pagefour"
          icon={<IoCameraOutline />}
          text="Photos"
          onClick={handleClick}
          isSelected={selected === "/pagefour"}
          dataListItem="/pagefour"
        />
        <ListItem
          href="/pagefive"
          icon={<IoSettingsOutline />}
          text="Settings"
          onClick={handleClick}
          isSelected={selected === "/pagefive"}
          dataListItem="/pagefive"
        /> */}
          <div className={styles.indicator}></div>
        </ul>
      </div>
    </div>
  );
};
