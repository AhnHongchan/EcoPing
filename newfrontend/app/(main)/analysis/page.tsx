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

  const [selectedButton, setSelectedButton] = useState<string>("월간");
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
  const ecoSpendData: number[] = [200, 300, 250, 220, 350, 280, 400, 450, 380, 500, 420, 460];

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
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center relative w-[390px] h-[844px]">
        {/* 상단 콘텐츠 */}
        <div className="flex flex-col items-center justify-center w-full mt-6 pb-5 border-b-2 border-blue-100">
          <div className="text-2xl font-bold text-black shadow-sm">
            내 소비 보기
          </div>
          <LineChart totalSpendData={totalSpendData} ecoSpendData={ecoSpendData}/>
          <img
            src="../../public/assets/analyticsMain.png"
            alt="Analytics Logo"
            className="h-36 mt-0 rounded-full"
          />
        </div>

        <div className="flex flex-col items-center w-[90%] mt-6">
          {/* 버튼 섹션 */}
          <div className="flex justify-between w-full mb-5">
            {["일간", "주간", "월간"].map((button) => (
              <button
                key={button}
                className={`flex-1 px-5 py-2 bg-yellow-400 text-black rounded-lg shadow-md font-bold mx-1 ${
                  selectedButton === button ? "bg-yellow-800 text-white" : ""
                }`}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ))}
          </div>

          {/* 차트 섹션 */}
          <div className="flex justify-between w-full mb-5">
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
              <div className="absolute bottom-2 left-5 right-5 flex justify-between">
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
          </div>

          {/* 나머지 섹션들 ... */}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
