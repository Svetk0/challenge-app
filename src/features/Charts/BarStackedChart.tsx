'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/store';
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

const labels = ['day', 'week', 'month'];

export function BarStackedChart() {
  const periods = useSelector((state: RootState) => state.statistics.periods);

  const data = {
    labels: ['daily', 'weekly', 'monthly'],
    datasets: [
      {
        label: 'successfully',
        data: labels.map(
          (label) => periods.successful_periods[label as keyof typeof periods.successful_periods]
        ),
        backgroundColor: 'rgb(75, 192, 192)',
        barPercentage: 0.8,
        borderRadius: 5,
        stack: 'Stack 0',
        datalabels: {
          display: true,
          anchor: 'end' as const,
          align: 'end' as const,
          textAlign: 'center' as const,
          labels: {
            value: {
              font: {
                size: 16,
              },
            },
          },
          formatter: (value: number, context: ExtendedContext) => {
            const allData = context.chart.data.datasets.find(
              (dataset) => dataset.label === 'missed'
            );
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
        data: labels.map(
          (label) =>
            periods.all_periods[label as keyof typeof periods.all_periods] -
            periods.successful_periods[label as keyof typeof periods.successful_periods]
        ),
        backgroundColor: 'rgb(75, 192, 192,0.2)',
        barPercentage: 0.8,
        borderRadius: 10,
        stack: 'Stack 0',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
