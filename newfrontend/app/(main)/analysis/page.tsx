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

interface Recommend {
  query: string;
  similarProduct: string;
  manufacturer: string;
  similarity: number;
}

const Analysis = (): JSX.Element => {
  const [statistics, setStatistics] = useState<
    { totalSpend: number; ecoSpend: number }[]
  >([]);
  const [recommends, setRecommends] = useState<Recommend[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>("월간");
  const totalSpendData = statistics.map((stat) => stat.totalSpend);
  const ecoSpendData = statistics.map((stat) => stat.ecoSpend);

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const fetchStatistics = async () => {
    try {
      const response = await instance.get("statistics/year", {});
      setStatistics(response.data);
    } catch (error) {}
  };

  const fetchRecommend = async () => {
    try {
      const response = await instance.get("/consumption/");
      const data = response.data;
      setRecommends(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchStatistics();
    fetchRecommend();
  }, []);

  return (
    <div className="">
      <div className="my-6 pb-8 border-b-4 m-auto border-loginLightGreen">
        <div className="text-2xl font-bold text-mainDarkGreen text-center shadow-sm pb-3 mb-5 border-b-4 m-auto border-loginLightGreen">
          내 소비 보기
        </div>
        <LineChart
          totalSpendData={totalSpendData}
          ecoSpendData={ecoSpendData}
        />
      </div>
      <div className="my-2 pb-6 border-b-4 m-auto border-loginLightGreen">
        <p className="text-center font-bold text-2xl mb-5 text-mainDarkGreen">
          추천 상품
        </p>
        {recommends.length > 0 ? (
          <ul>
            {recommends.map((recommend, index) => (
              <li key={index} className="px-5 py-4 border-b">
                <p className="text-left">
                  주 사용 상품:{" "}
                  <span className="font-bold">{recommend.query}</span>
                </p>
                <p className="text-left">
                  제조사:{" "}
                  <span className="font-bold">{recommend.manufacturer}</span>
                </p>
                <p className="text-left">
                  유사 상품:{" "}
                  <span className="font-bold">{recommend.similarProduct}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-20 py-4 flex flex-col justify-center w-auto">
            <p className="text-left">
              주 사용 상품: <span className="font-bold">옥수수수염차</span>
            </p>
            <p className="text-left">
              제조사: <span className="font-bold">광동(주)</span>
            </p>
            <p className="text-left">
              유사 상품: <span className="font-bold">옥수수수염차</span>
            </p>
          </div>
        )}
      </div>
      <div className="mt-6">
        <div className="flex justify-around mb-5">
          {["일간", "주간", "월간"].map((button) => (
            <button
              key={button}
              className={`px-5 py-2 rounded-lg shadow-md font-bold mx-1 ${
                selectedButton === button
                  ? "bg-lightWalnutBrown text-white"
                  : "bg-loginLightGreen text-mainDarkGreen"
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
