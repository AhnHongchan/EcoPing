import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartOptions, LegendItem, Chart, TooltipItem } from "chart.js";

interface PieChartProps {
  labels: string[];
  data: number[];
  percentageCompare?: number;
  title: string;
  period: 'daily' | 'weekly' | 'monthly'; // 기간에 따라 문구 변경
}

const PieChart = ({ labels, data, percentageCompare, title, period }: PieChartProps) => {

  const chartData = {
    labels, 
    datasets: [
      {
        data, 
        backgroundColor: ['#bcebc4', '#e57373'], 
        hoverOffset: 20,
        offset: 10,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            weight: 'bold' as const,
            size: 12,
          },
          color: '#333',
          generateLabels: (chart): LegendItem[] => {
            const pieChart = chart as Chart<'pie'>;
            const data = pieChart.data.datasets[0].data;
            const total = data.reduce((acc, value) => acc + value, 0);
            return pieChart.data.labels!.map((label, index) => {
              const value = data[index];
              const percentage = ((value as number) / total * 100).toFixed(2);
              return {
                text: `${label}: ${percentage}%`,
                fillStyle: Array.isArray(pieChart.data.datasets[0].backgroundColor) && pieChart.data.datasets[0].backgroundColor[index]
                ? pieChart.data.datasets[0].backgroundColor[index]
                : '#000', // 기본값 설정
                hidden: false,
                index,
                strokeStyle: "#fff",
                lineWidth: 2,
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>) => {
            const label = tooltipItem.label || '';
            const value = (tooltipItem.raw as number)?.toLocaleString();
            return `${label}: ${value}원`;
          },
        },
      },
    },
  };

  // 기간에 따른 텍스트 변경
  const periodTextMap: { [key: string]: string } = {
    weekly: '지난 주 대비',
    monthly: '지난 달 대비'
  };

  return (
    <div className="box-style">
      <div>
        <p className="small-title">{title}</p>
      </div>
      <div className="h-60 w-60 mx-auto">
        <Pie data={chartData} options={options} />
      </div>
      {percentageCompare !== undefined && (
        <div>
          <p className="small-title">
            {periodTextMap[period]}{' '}
            <span className={percentageCompare >= 0 ? 'text-green-500' : 'text-red-500'}>
              {percentageCompare}%p
            </span>{' '}
            {percentageCompare >= 0 ? '증가' : '감소'}
          </p>      
        </div>
      )}
    </div>
  );
};

export default PieChart;
