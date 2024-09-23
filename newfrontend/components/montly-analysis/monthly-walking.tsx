'use client'; // 클라이언트 컴포넌트로 지정

import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartOptions
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-plugin-annotation';
import dayjs from 'dayjs';
import { useState } from 'react';
import commonAxisOptions from "../chart-options";

// Chart.js에 필요한 요소 및 플러그인 등록
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, annotationPlugin);

const MonthlyWalking = (): JSX.Element => {
  const date = new Date();

  // 연도와 월 추출
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로 표시
  const currentMonth = dayjs(`${year}-${month}-01`); // 1일로 설정
  const startOfMonth = currentMonth.startOf('month'); // 이번 달의 첫 날
  const endOfMonth = currentMonth.endOf('month'); // 이번 달의 마지막 날

  // 걷기 데이터를 주별로 나눔
  const monthlyData = [10000, 10300, 5700, 8000, 9500]; // 임시 데이터 (각 주에 대응)

  const target = 6000; // 목표 걸음 수
  const average = Math.floor(monthlyData.reduce((acc, curr) => acc + curr, 0) / monthlyData.length); // 평균 계산
  const barColor = monthlyData.map((value) => value < target ? "#e57373" : "#bcebc4"); // 목표 걸음 수보다 적으면 빨간색, 많으면 녹색

  // 월요일 기준으로 주별 구간을 나누는 함수 (목요일 포함 첫째 주 설정)
  const getWeeklyRanges = () => {
    const weeks = [];
    
    // 첫째 주 찾기: 첫 번째 목요일을 포함하는 주의 월요일 구하기
    let firstThursday = startOfMonth;
    while (firstThursday.day() !== 4) { // 목요일이 될 때까지 이동
      firstThursday = firstThursday.add(1, 'day');
    }

    let startOfWeek = firstThursday.startOf('week').add(1, 'day'); // 첫 번째 월요일
    let endOfWeek = startOfWeek.endOf('week').add(1, 'day'); // 그 주 일요일

    while (startOfWeek.isBefore(endOfMonth)) {
      // 해당 주의 목요일 확인
      const thursdayOfWeek = startOfWeek.add(3, 'day'); // 목요일 찾기
      
      // 목요일이 다음 달에 속하면 해당 주는 처리하지 않고 종료
      if (thursdayOfWeek.isAfter(endOfMonth)) {
        break;
      }

      weeks.push({
        start: startOfWeek.format('YYYY-MM-DD'),
        end: endOfWeek.isAfter(endOfMonth) ? endOfMonth.format('YYYY-MM-DD') : endOfWeek.format('YYYY-MM-DD'),
      });

      // 다음 주로 이동
      startOfWeek = startOfWeek.add(1, 'week');
      endOfWeek = startOfWeek.endOf('week').add(1, 'day');
    }

    return weeks;
  };

  const weeklyRanges = getWeeklyRanges(); // 주별 구간

  // 주 라벨 설정
  const weekLabels = weeklyRanges.map((week, index) => `${index + 1}주`);

  // 그래프 하단에 표시할 annotation 정보를 상태로 저장
  const [annotationsInfo] = useState({
    targetLine: `목표 걸음 수: ${target}`,
    averageLine: `평균 걸음 수: ${average}`,
  });

  // Chart.js에 넘길 데이터를 준비
  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: "걸음 수",
        data: monthlyData,
        backgroundColor: barColor,
        borderWidth: 1,
        barThickness: 20,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3,
    scales: {
      x: {
        ...commonAxisOptions,
      },
      y: {
        ...commonAxisOptions,
        max: Math.floor(Math.max(Math.max(...monthlyData), target) * 1.15), // y축 최대값 설정
        title: {
          display: false,
        },
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          targetLine: {
            type: 'line' as const,
            yMin: target,
            yMax: target,
            borderColor: '#e57373',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: '목표 걸음 수',
              enabled: true,
              position: 'end',
              backgroundColor: '#e57373',
              color: 'white',
              padding: 6,
            }
          },
          averageLine: {
            type: 'line' as const,
            yMin: average,
            yMax: average,
            borderColor: 'green',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: '평균 걸음 수',
              enabled: true,
              position: 'end',
              backgroundColor: '#bcebc4',
              color: 'black',
              padding: 6,
            }
          }
        }
      } as any
    }
  };

  return (
    <div className="box-style">
      <div>
        <p className="small-title">월간 걷기 데이터</p>
      </div>
      <div>
        <Bar data={data} options={options} />
      </div>
      <div>
        <p className="font-bold text-center text-sm">
          <span className="text-coralRed">{annotationsInfo.targetLine}</span>
          {" | "}
          <span className="text-green-700">{annotationsInfo.averageLine}</span>
        </p>
      </div>
    </div>
  );
};

export default MonthlyWalking;
