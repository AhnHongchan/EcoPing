import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BiRun, BiHappy } from "react-icons/bi"; // Boxicons 아이콘 가져오기

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailyWalking = (): JSX.Element => {
  const walkData = 4026; // 오늘의 걸음 수
  const target = 6000; // 기준 걸음 수
  const [showRatio, setShowRatio] = useState(false); // 비율 보기 토글
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  // 걸음 수가 기준 미만이면 빨간색, 이상이면 초록색으로 설정
  const barColor = walkData < target ? "#e57373" : "#bcebc4";

  const data = {
    labels: [formattedDate],
    datasets: [
      {
        label: "걸음 수",
        data: [walkData],
        backgroundColor: [barColor],
        borderColor: [barColor.replace("0.6", "1")],
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

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
        weight: "bold" as "bold",
      },
      color: "#333",
      rotation: 0,
    },
    border: {
      color: "#333",
      width: 2,
    },
  };

  const options = {
    indexAxis: "y" as const, // Bar chart를 가로로 만듦
    maintainAspectRatio: false, // 고정된 비율을 유지하지 않음
    aspectRatio: 3, // 가로:세로 비율을 3:1로 설정
    scales: {
      x: {
        beginAtZero: true,
        max: Math.floor(Math.max(walkData, target) * 1.15), // 최대 값을 기준보다 조금 크게 설정
        ...commonAxisOptions,
        title: {
          display: true,
          text: "걸음 수",
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 14,
            weight: "bold" as "bold",
          },
          color: "#333",
        },
      },
      y: {
        ...commonAxisOptions,
        title: {
          display: true,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 14,
            weight: "bold" as "bold",
          },
          color: "#333",
        },
      },
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
  };

  return (
    <div className="flex items-center">
      <div className="h-[130px] w-80">
        <Bar data={data} options={options} />
      </div>
      {/* 걸음 수에 따라 적절한 아이콘 표시 */}
      <div className="pb-4">
        {walkData < target ? (
          <BiRun className="text-coralRed text-3xl" /> // 달리기 아이콘
        ) : (
          <BiHappy className="text-mainGreen text-3xl" /> // 웃는 얼굴 아이콘
        )}
      </div>
    </div>
  );
};

export default DailyWalking;
