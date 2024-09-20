import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { ChartOptions, LegendItem, Chart, TooltipItem } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 플러그인 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyConsumption = () => {
  const consumptions: number[] = [3000, 1800, 2400, 4000, 4500, 3100, 9000];
  const ecoConsumptions: number[] = [1000, 500, 700, 1200, 1500, 1800, 2000];
  const sumConsumptions: number = consumptions.reduce((acc, value) => acc + value, 0)
  const sumEcoConsumptions: number = ecoConsumptions.reduce((acc, value) => acc + value, 0)
  const lastWeekEcoAverageConsumption: number = 30;
  const percentageCompare: number = parseFloat(((sumEcoConsumptions / sumConsumptions) * 100 - lastWeekEcoAverageConsumption).toFixed(2));

  const data = {
    labels: ["에코 소비", "기타 소비"], // 각 요일에 대한 라벨
    datasets: [
      {
        data: [sumEcoConsumptions, sumConsumptions-sumEcoConsumptions], // 실제 소비 데이터를 전달
        backgroundColor: ['#bcebc4', '#e57373'], // 각 조각의 색상 설정
        hoverOffset: 20,
        offset: 10,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            weight: 'bold' as const,
            size: 12,
          },
          color: '#333',
          generateLabels: (chart): LegendItem[] => {
            const pieChart = chart as Chart<'pie'>;
            const data = pieChart.data;
            const datasets = data.datasets as Array<{ backgroundColor: string; data: number[] }>;
            return data.labels!.map((label: string | unknown, index: number) => {
              const total = datasets[0].data.reduce((acc, value) => acc + value, 0);
              const value = datasets[0].data[index];
              const percentage = ((value as number) / total * 100).toFixed(2);
              const backgroundColorArray = datasets[0].backgroundColor;

              return {
                text: `${label}: ${percentage}%`,
                fillStyle: backgroundColorArray[index], // 차트 조각 색상
                hidden: false,
                index,
                strokeStyle: "#fff",
                lineWidth: 2,
              } as LegendItem;
            });
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'pie'>) {
            const label = tooltipItem.label || ''; // 라벨이 없을 경우 처리
            const value = (tooltipItem.raw as number)?.toLocaleString(); // 천 단위 콤마 추가
            return `${label}: ${value}원`;
          },
        },
      },
    },
  };

  return (
    <div className="box-style">
      <div>
        <p className="tsmall-title">에코 소비 비율</p>
      </div>
      <div className="h-60 w-60 mx-auto">
        <Pie data={data} options={options} />
      </div>
      <div>
        <p className="text-md font-bold text-center">
          지난 주 대비{' '}
          <span className={percentageCompare >= 0 ? 'text-green-500' : 'text-red-500'}>
            {percentageCompare}%p
          </span>{' '}
          {percentageCompare >= 0 ? '증가' : '감소'}
        </p>      
      </div>
    </div>
  );
};

export default WeeklyConsumption;
