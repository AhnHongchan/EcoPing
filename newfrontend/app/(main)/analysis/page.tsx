"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import instance from "../../../lib/axios";

import LineChart from "@/components/year-flow";
import DailyAnalysis from "@/components/daily-analysis/daily-analysis";
import WeeklyAnalysis from "@/components/weekly-analysis/weekly-analysis";
import MonthlyAnalysis from "@/components/montly-analysis/montly-analysis";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Analysis = (): JSX.Element => {
  const [statistics, setStatistics] = useState([]);
  const [selectedButton, setSelectedButton] = useState<string>("일간");
  const totalSpendData: number[] = [1200, 1500, 1800, 1400, 1600, 1700, 1900, 2100, 2000, 2300, 2200, 2400];
  const ecoSpendData: number[] = [200, 300, 250, 220, 350, 280, 400, 450, 680, 500, 620, 860];

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const fetchStatistics = async () => {
    try {
      const response = await instance.get("statistics/year", {
      });
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="">
      <div className="my-6 pb-8 border-b-4 m-auto border-mainGreen">
        <div className="text-2xl font-bold text-black text-center shadow-sm pb-3 mb-5 border-b-4 m-auto border-mainGreen">
          내 소비 보기
        </div>
        <LineChart totalSpendData={totalSpendData} ecoSpendData={ecoSpendData}/>
      </div>

      <div className="mt-6">
        <div className="flex justify-around mb-5">
          {["일간", "주간", "월간"].map((button) => (
            <button
              key={button}
              className={`px-5 py-2 rounded-lg shadow-md font-bold mx-1 ${
                selectedButton === button ? "bg-lightWalnutBrown text-white" : "bg-mainGreen text-black"
              }`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
        <div>
          {selectedButton === "일간" && <DailyAnalysis />}
          {selectedButton === "주간" && <WeeklyAnalysis />}
          {selectedButton === "월간" && <MonthlyAnalysis />}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
