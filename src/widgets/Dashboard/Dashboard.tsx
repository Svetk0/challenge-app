'use client';

import { BarStackedChart } from '@/features';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <BarStackedChart />
    </section>
  );
}
