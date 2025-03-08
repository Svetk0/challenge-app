'use client';

import { BarStackedChart, BarChart } from '@/features';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>Summary of periods</h3>
        <p className={styles.comments}>Your successfully periods in all challenges</p>
        <BarStackedChart />
      </div>
      <div className={styles.columnWrapper}>
        <h3 className={styles.subtitle}>Summary of challenges</h3>
        <p className={styles.comments}>Your full statistics</p>
        <BarChart />
      </div>
    </section>
  );
}
