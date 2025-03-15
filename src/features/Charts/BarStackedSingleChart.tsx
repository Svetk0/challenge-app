'use client';
import React from 'react';
import { useEffect } from 'react';
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

type Props = {
  label: string[];
  dataset: {
    successfully: number | undefined;
    all: number | undefined;
  };
};

export function BarStackedSingleChart({ label, dataset: { successfully = 0, all = 0 } }: Props) {
  const missedData = all - successfully;
  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom' as const,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: 10,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: all === 0 ? 1 : all,
        ticks: {
          stepSize: all > 10 ? 10 : 1,
          max: all === 0 ? 1 : all,
          min: 0,
        },
      },
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: 'done',
        data: [successfully],
        backgroundColor: 'rgb(75, 192, 192)',
        barPercentage: 0.9,
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
                size: 14,
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
        data: [missedData],
        backgroundColor: 'rgb(75, 192, 192,0.2)',
        barPercentage: 0.9,
        borderRadius: 8,
        stack: 'Stack 0',
      },
    ],
  };

  useEffect(() => {
    console.log('dataset', successfully, all);
  }, [all]);

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
