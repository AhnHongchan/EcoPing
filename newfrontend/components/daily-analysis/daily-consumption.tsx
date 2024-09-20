import React from "react";
import { TooltipItem, LegendItem, Chart, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const DailyConsumption = () => {
  const todayConsumption = 2500;
  const todayEcoConsumption = 980;

  const data = {
    labels: ['에코 소비', '기타 소비'],
    datasets: [
      {
        data: [todayEcoConsumption, todayConsumption - todayEcoConsumption], // 실제 소비 데이터를 전달
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
        position: 'bottom' as const,
        labels: {
          font: {
            weight: 'bold' as const,
            size: 12,
          },
          color: '#333',
          generateLabels: (chart): LegendItem[] => {
            const pieChart = chart as Chart<'pie'>; // 명시적 캐스팅
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
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>) => {
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
        <p className="small-title">에코 소비 비율</p>
      </div>
      <div className="h-60 w-60 mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default DailyConsumption;
