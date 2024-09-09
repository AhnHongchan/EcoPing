import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  totalSpendData: number[]; // 각 월의 총 소비 데이터
  ecoSpendData: number[]; // 각 월의 친환경 소비 데이터
}

const LineChart = ({ totalSpendData, ecoSpendData }: LineChartProps) => {
  const lineChartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ], // 12개월 라벨
    datasets: [
      {
        label: "Total Spend",
        data: totalSpendData,
        borderColor: "rgba(54, 162, 235, 1)", // 파란색
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4, // 부드러운 라인
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 4, // 데이터 포인트 크기
      },
      {
        label: "Eco Spend",
        data: ecoSpendData,
        borderColor: "rgba(75, 192, 192, 1)", // 녹색
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // 부드러운 라인
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 4,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Spend (in units)", // 적절한 단위를 지정하세요.
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-md">
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
};

export default LineChart;
