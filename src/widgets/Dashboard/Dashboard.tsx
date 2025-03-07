'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dataset from './mockDatasets.json';

import styles from './Dashboard.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
    legend: {
      display: false,
      position: 'bottom' as const,
    },
  },
  responsive: true,
  aspectRatio: 1,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
    },
  },
};

const labels = ['daily', 'weekly', 'monthly'];
const dt = dataset.periods;
export const data = {
  labels,

  datasets: [
    {
      label: 'successfully',
      data: labels.map((label) => dt.successfully[label as keyof typeof dt.successfully]),
      backgroundColor: 'rgb(255, 99, 132)',
      barPercentage: 0.8,
      borderRadius: 5,
      stack: 'Stack 1',
    },

    {
      label: 'missed',
      data: labels.map((label) => dt.missed[label as keyof typeof dt.successfully]),
      backgroundColor: 'rgb(53, 162, 235)',
      barPercentage: 0.8,
      borderRadius: 5,
      stack: 'Stack 0',
    },
    {
      label: 'all',
      data: labels.map((label) =>
        String(
          Number(dt.missed[label as keyof typeof dt.successfully]) +
            Number(dt.successfully[label as keyof typeof dt.successfully])
        )
      ),
      backgroundColor: 'rgb(75, 192, 192,0.2)',
      barPercentage: 1,
      stack: 'Stack 0',
    },
    {
      label: 'all',
      data: labels.map((label) =>
        String(
          Number(dt.missed[label as keyof typeof dt.successfully]) +
            Number(dt.successfully[label as keyof typeof dt.successfully])
        )
      ),
      backgroundColor: 'rgb(75, 192, 192,0.2)',
      barPercentage: 1,
      stack: 'Stack 1',
    },
  ],
};

export function Dashboard() {
  return (
    <section className={styles.container}>
      <Bar options={options} data={data} />
    </section>
  );
}
