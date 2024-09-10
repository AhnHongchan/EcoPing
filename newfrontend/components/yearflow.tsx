import React, { useState } from "react";
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
  totalSpendData: number[];
  ecoSpendData: number[];
}

const LineChart = ({ totalSpendData, ecoSpendData }: LineChartProps) => {
  const [showRatio, setShowRatio] = useState(false); // 현재 차트 상태 추적
  const mainGreen: string = "#9bc2a0";
  const lightWalnutBrown: string = "#A68A6D";
  const coralRed: string = "#e57373";

  // 에코 소비 비율 계산
  const ecoSpendRatioData = ecoSpendData.map(
    (ecoSpend, index) => (ecoSpend / totalSpendData[index]) * 100
  );

  const lineChartData = {
    labels: [
      "9월",
      "10월",
      "11월",
      "12월",
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
    ],
    datasets: showRatio
      ? [
          {
            label: "에코 소비 비율 (%)",
            data: ecoSpendRatioData,
            borderColor: coralRed,
            backgroundColor: coralRed,
            tension: 0.4,
            pointBackgroundColor: coralRed,
            pointBorderColor: coralRed,
            pointRadius: 2,
            yAxisID: "y1", // 두 번째 Y축
          },
        ]
      : [
          {
            label: "총 소비",
            data: totalSpendData,
            borderColor: lightWalnutBrown,
            backgroundColor: lightWalnutBrown,
            tension: 0.4,
            pointBackgroundColor: lightWalnutBrown,
            pointBorderColor: lightWalnutBrown,
            pointRadius: 2,
            yAxisID: "y", // 첫 번째 Y축
          },
          {
            label: "에코 소비",
            data: ecoSpendData,
            borderColor: mainGreen,
            backgroundColor: mainGreen,
            tension: 0.4,
            pointBackgroundColor: mainGreen,
            pointBorderColor: mainGreen,
            pointRadius: 2,
            yAxisID: "y", // 첫 번째 Y축
          },
        ],
  };

  const lineChartOptions = {
    scales: showRatio
      ? {
          y1: {
            type: "linear" as const,
            position: "left" as const,
            title: {
              display: true,
              text: "에코 소비 비율 (%)",
            },
          },
        }
      : {
          y: {
            type: "linear" as const,
            position: "left" as const,
            title: {
              display: true,
              text: "소비 금액",
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
    <div className="h-64">
      <div className="mx-4 mb-4 flex justify-between">
        {[
          { label: "소비 내역 보기", isActive: !showRatio, onClick: () => setShowRatio(false) },
          { label: "소비 비율 보기", isActive: showRatio, onClick: () => setShowRatio(true) },
        ].map(({ label, isActive, onClick }, index) => (
          <button
            key={index}
            onClick={onClick}
            className={`px-4 py-2 rounded shadow-md ${
              isActive ? "bg-lightWalnutBrown text-white font-bold" : "bg-mainGreen text-black font-extrabold"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="h-52">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
