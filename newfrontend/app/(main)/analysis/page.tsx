"use client";

import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
import { useRouter } from "next/navigation";
import LineChart from "@/components/yearflow";
import { BiCheckCircle, BiDownArrow, BiUpArrow } from "react-icons/bi";
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

interface Statistics {
  totalSpend: number;
  ecoSpend: number;
  previousMonthCompare: number;
  averageCompare: number;
  campaignPoint: number;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  route: string;
}



const Analysis: React.FC = () => {
  
  const [myPoint, setMypoint] = useState<number>(0);
  const [statistics, setStatistics] = useState<Statistics>({
    totalSpend: 0,
    ecoSpend: 0,
    previousMonthCompare: 0,
    averageCompare: 0,
    campaignPoint: 0,
  });

  const [selectedButton, setSelectedButton] = useState<string>("일간");
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: 1,
      text: "출석체크 하기(100p)",
      completed: false,
      route: "/calendar",
    },
    { id: 2, text: "나무 키우기", completed: false, route: "/tree" },
    {
      id: 3,
      text: "친환경 캠페인 참여하기",
      completed: false,
      route: "/campaignList",
    },
    { id: 4, text: "친환경 퀴즈 참여하기", completed: false, route: "/quiz" },
    { id: 5, text: "친환경 기부하기", completed: false, route: "/campaign" },
    { id: 6, text: "6000보 걷기(100p)", completed: false, route: "/item6" },
    { id: 7, text: "영수증 인증하기(100p)", completed: false, route: "/item7" },
  ]);

  const [showSavedCostList, setShowSavedCostList] = useState<boolean>(false);
  const router = useRouter();

  const totalSpendData: number[] = [1200, 1500, 1800, 1400, 1600, 1700, 1900, 2100, 2000, 2300, 2200, 2400];
  const ecoSpendData: number[] = [200, 300, 250, 220, 350, 280, 400, 450, 680, 500, 620, 860];

  // 차트 데이터 및 옵션 정의
  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Last 7 Days Consumption",
        data: [30, 45, 60, 50, 70, 90, 100],
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "Footsteps",
        data: [3000, 5000, 7000, 6000, 8000, 10000, 9000],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["에코", "일반"],
    datasets: [
      {
        label: "에코 : 일반",
        data: [
          Math.round(statistics.ecoSpend),
          Math.round(statistics.totalSpend - statistics.ecoSpend),
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
    },
    elements: {
      point: { radius: 0 },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const barChartOptions = {
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "black", font: { size: 12 } },
      },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const doughnutChartOptions = {
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const toggleTodo = (id: number) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleSavedCostList = () => {
    setShowSavedCostList(!showSavedCostList);
  };

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const handleParticipateClick = (route: string) => {
    router.push(route);
  };

  const fetchStatistics = async () => {
    try {
      const response = await instance.get("/api/statistics", {
        headers: { userId: 11 },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error updating statistics:", error);
    }
  };

  const fetchStatistics30 = async () => {
    try {
      const response = await instance.get("/api/statistics/30", {
        headers: { userId: 11 },
      });
    } catch (error) {
      console.error("Error updating statistics for 30:", error);
    }
  };

  const fetchMypoint = async () => {
    try {
      const response = await instance.get("/api/points/mypoint", {
        headers: { userId: 5 },
      });
      setMypoint(response.data);
    } catch (error) {
      console.error("Error updating statistics for 30:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchStatistics30();
    fetchMypoint();
  }, []);

  return (
    <div className="">
      {/* 상단 콘텐츠 */}
      <div className="my-6 pb-8 border-b-4 m-auto border-mainGreen">
        <div className="text-2xl font-bold text-black text-center shadow-sm pb-3 mb-5 border-b-4 m-auto border-mainGreen">
          내 소비 보기
        </div>
        <LineChart totalSpendData={totalSpendData} ecoSpendData={ecoSpendData}/>
      </div>

      <div className="mt-6">
        {/* 버튼 섹션 */}
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
      
      {/* 선택된 버튼에 따른 컴포넌트 렌더링 */}
        <div>
          {selectedButton === "일간" && <DailyAnalysis />}
          {selectedButton === "주간" && <WeeklyAnalysis />}
          {selectedButton === "월간" && <MonthlyAnalysis />}
        </div>

        {/* 차트 섹션 */}
        {/* <div className="justify-between mb-5">
          <div className="relative h-[160px] bg-white rounded-lg p-5 shadow-md overflow-hidden w-1/3">
            <h4 className="absolute top-2 left-5 text-sm font-bold">
              6787 걸음
            </h4>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="relative h-[160px] bg-white rounded-lg p-5 shadow-md overflow-hidden w-1/3">
            <h4 className="absolute top-2 left-5 text-sm font-bold">
              내 에코 소비 비율
            </h4>
            <Doughnut
              data={doughnutChartData}
              options={doughnutChartOptions}
            />
            <div className="absolute bottom-2 left-5 right-5 justify-between">
              <div>
                <span className="inline-block w-3.5 h-3.5 bg-blue-400 mr-1"></span>{" "}
                에코
              </div>
              <div>
                <span className="inline-block w-3.5 h-3.5 bg-red-400 mr-1"></span>{" "}
                일반
              </div>
            </div>
          </div>
        </div> */}

        {/* 비교 섹션 */}
        {/* <div className="flex justify-between w-full mb-5">
          <div className="flex items-center w-[41%] h-[40px] p-2 bg-white rounded-lg shadow-md">
            <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-gray-200 mr-2">
              <BiCheckCircle className="text-green-500" size={32} />
            </div>
            <div className="flex flex-col">
              <p className="text-[8px] font-bold text-gray-500 m-0">또래보다 친환경적이에요.</p>
              <p className="text-[10px] font-bold m-0">
                <span className={statistics.averageCompare > 0 ? "text-green-500" : "text-red-500"}>
                  {statistics.averageCompare > 0 ? `+${statistics.averageCompare.toFixed(0)}` : `${statistics.averageCompare.toFixed(0)}`}
                </span>{" "}
                %의 친환경 소비
              </p>
            </div>
          </div>

          <div className="flex items-center w-[41%] h-[40px] p-2 bg-white rounded-lg shadow-md">
            <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-gray-200 mr-2">
              <BiDownArrow className="text-red-500" size={32} />
            </div>
            <div className="flex flex-col">
              <p className="text-[8px] font-bold text-gray-500 m-0">지난 달보다 줄었어요.</p>
              <p className="text-[10px] font-bold m-0">
                <span className={statistics.previousMonthCompare > 0 ? "text-green-500" : "text-red-500"}>
                  {statistics.previousMonthCompare > 0 ? `+${statistics.previousMonthCompare}` : `${statistics.previousMonthCompare}`}
                </span>{" "}
                % 전달 대비
              </p>
            </div>
          </div>
        </div> */}

        {/* 결제 섹션 */}
        {/* <div className="flex justify-between w-full mb-5">
          <div className="w-[41%] h-[40px] p-2 bg-white rounded-lg shadow-md flex flex-col justify-center relative">
            <div className="ml-2">
              <p className="text-[8px] font-bold text-gray-500 m-0">기부포인트 총액</p>
              <p className="text-[14px] font-bold m-0">{myPoint}P 기부</p>
              <p className="text-green-500 text-[10px] m-0">+23% 지난 주 대비</p>
            </div>
          </div>

          <div className="w-[41%] h-[40px] p-2 bg-white rounded-lg shadow-md flex items-center relative">
            <div className="flex items-center justify-between w-full ml-2">
              <div>
                <p className="text-[8px] font-bold text-gray-500 m-0">절약한 환경 비용</p>
                <p className="text-[14px] font-bold m-0">2,390만원</p>
              </div>
              <img src="/assets/icon/tree.png" alt="Tree Icon" className="w-[30px] h-[30px]" />
              <button onClick={toggleSavedCostList} className="p-0">
                {showSavedCostList ? <BiUpArrow size={24} /> : <BiDownArrow size={24} />}
              </button>
            </div>
            <ul
              className={`list-none pl-2 mt-2 text-[12px] absolute top-full left-0 right-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
                showSavedCostList ? "max-h-40 opacity-100 visible" : "max-h-0 opacity-0 invisible"
              }`}
            >
              <li>절약한 물 사용량: 120L</li>
              <li>절약한 전기 사용량: 100kWh</li>
              <li>절약한 CO2 배출량: 30kg</li>
            </ul>
          </div>
        </div> */}

        {/* 포인트 적립 섹션 */}
        {/* <div className="w-full">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold">포인트 적립하기</h3>
            <button className="px-3 py-1 bg-mainGreen text-white rounded-lg">:</button>
          </div>
          <div className="bg-white p-5 rounded-lg flex flex-col">
            {todoItems.map((item) => (
              <div key={item.id} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                  className="mr-2"
                />
                <div className="flex justify-between items-center w-full">
                  <label className="flex-grow">{item.text}</label>
                  <button
                    className="px-2 py-1 bg-[#FF5733] text-white rounded-lg"
                    onClick={() => handleParticipateClick(item.route)}
                  >
                    참여하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Analysis;
