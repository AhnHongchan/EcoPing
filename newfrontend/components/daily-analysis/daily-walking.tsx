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

import commonAxisOptions from "../chart-options";

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
  const today = new Date();
  const formattedDate = today.toISOString().substring(5, 10);

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

  const options = {
    responsive: true,
    indexAxis: "y" as const, // Bar chart를 가로로 만듦
    maintainAspectRatio: false, // 고정된 비율을 유지하지 않음
    aspectRatio: 3, // 가로:세로 비율을 3:1로 설정
    scales: {
      x: {
        beginAtZero: true,
        max: Math.floor(Math.max(walkData, target) * 1.15), // 최대 값을 기준보다 조금 크게 설정
        ...commonAxisOptions,
        ticks: {
          ...commonAxisOptions.ticks,
          stepSize: 2000,
        },
        title: {
          display: false,
        },
      },
      y: {
        ...commonAxisOptions,
        title: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
  <div className="flex flex-col items-center box-style">
    <div>
      <p className="small-title">걸음 수</p>
    </div>
    <div className="flex items-center">
      <div className="h-[130px] w-80">
        <Bar data={data} options={options} />
      </div>
      <div className="pb-4">
        {walkData < target ? (
          <BiRun className="text-coralRed text-3xl" /> // 달리기 아이콘
        ) : (
          <BiHappy className="text-mainGreen text-3xl" /> // 웃는 얼굴 아이콘
        )}
      </div>
    </div>
    <div className="my-2">
      <p className="text-center text-sm font-bold">걸음 수: {walkData}</p>
    </div>
  </div>
  );
};

export default DailyWalking;
