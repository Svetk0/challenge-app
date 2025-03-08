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
import ChartDataLabels, { Context as DataLabelsContext } from 'chartjs-plugin-datalabels';
import dataset from './mockDatasets.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
type ExtendedContext = DataLabelsContext & {
  dataIndex: number;
};
export const options = {
  plugins: {
    legend: {
      display: false,
      position: 'bottom' as const,
    },
    datalabels: {
      display: false,
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
      stacked: true,
      ticks: {
        stepSize: 1,
      },
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
      backgroundColor: 'rgb(176, 244, 162)',
      barPercentage: 0.8,
      borderRadius: 5,
      stack: 'Stack 0',
      datalabels: {
        display: true,
        anchor: 'end' as const,
        align: 'end' as const,
        textAlign: 'center' as const,
        formatter: (value: number, context: ExtendedContext) => {
          const allData = context.chart.data.datasets.find((dataset) => dataset.label === 'missed');
          if (allData) {
            const total = Number(allData.data[context.dataIndex] || 0) + Number(value);
            const successRate = total ? (value / +total) * 100 : 0;
            return `${successRate.toFixed(0)}%`;
          }
          return value;
        },
        color: '#fff',
      },
    },

    {
      label: 'missed',
      data: labels.map((label) => dt.missed[label as keyof typeof dt.successfully]),
      backgroundColor: 'rgb(75, 192, 192,0.2)',
      barPercentage: 0.8,
      borderRadius: 10,
      borderWidth: 0,
      borderColor: 'rgb(122, 144, 255)',
      stack: 'Stack 0',
    },
  ],
};

export function BarStackedChart() {
  return <Bar options={options} data={data} />;
}
