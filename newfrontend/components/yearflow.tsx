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
  const [showRatio, setShowRatio] = useState(false);
  const mainGreen = "#9bc2a0";
  const lightWalnutBrown = "#A68A6D";
  const coralRed = "#e57373";

  // 에코 소비 비율 계산
  const ecoSpendRatioData = ecoSpendData.map(
    (ecoSpend, index) => (ecoSpend / totalSpendData[index]) * 100
  );

  const commonAxisOptions = {
    grid: {
      display: true,
      drawBorder: true,
      drawTicks: false,
    },
    ticks: {
      font: {
        family: "'Noto Sans KR', sans-serif",
        size: 12,
        weight: "bold" as "bold", // "bold"를 as "bold"로 명시적으로 지정하여 타입 오류 수정
      },
      color: "#333",
      rotation: 0,
    },
    border: {
      color: "#333",
      width: 2,
    },
  };

  const lineChartData = {
    labels: ["9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8"], // 짧은 레이블 사용
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
            yAxisID: "y1",
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
            yAxisID: "y",
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
            yAxisID: "y",
          },
        ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        type: "linear" as const,
        ...commonAxisOptions,
        display: !showRatio, // showRatio가 false일 때만 y축을 표시
        title: {
          display: !showRatio, // showRatio가 false일 때만 제목을 표시
          text: "소비 금액",
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 14,
            weight: "bold" as "bold",
          },
          color: "#333",
        },
      },
      y1: {
        type: "linear" as const,
        ...commonAxisOptions,
        display: showRatio, // showRatio가 true일 때만 y1축을 표시
        title: {
          display: showRatio, // showRatio가 true일 때만 제목을 표시
          text: "에코 소비 비율 (%)",
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 14,
            weight: "bold" as "bold",
          },
          color: "#333",
        },
      },
      x: {
        ...commonAxisOptions,
        title: {
          display: true, 
          text: "월",
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 14,
            weight: "bold" as "bold",
          },
          color: "#333",
        },
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: "bold" as "bold",
          },
          color: "#333",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  

  return (
    <div className="h-64">
      <div className="mx-4 mb-4 flex justify-between">
        {[
          {
            label: "소비 내역 보기",
            isActive: !showRatio,
            onClick: () => setShowRatio(false),
          },
          {
            label: "소비 비율 보기",
            isActive: showRatio,
            onClick: () => setShowRatio(true),
          },
        ].map(({ label, isActive, onClick }, index) => (
          <button
            key={index}
            onClick={onClick}
            className={`px-4 py-2 rounded shadow-md ${
              isActive
                ? "bg-lightWalnutBrown text-white font-bold"
                : "bg-mainGreen text-black font-extrabold"
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
