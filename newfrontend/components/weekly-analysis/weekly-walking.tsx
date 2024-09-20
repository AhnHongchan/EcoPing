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
import { useState } from 'react';
import commonAxisOptions from "../chart-options";

// Chart.js에 필요한 요소 및 플러그인 등록
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, annotationPlugin);

const WeeklyWalking = (): JSX.Element => {
  const walkDatas = [8600, 7200, 9500, 12000, 10600, 13800, 5100];
  const target = 6000;
  const average = Math.floor(walkDatas.reduce((acc, curr) => acc + curr, 0) / walkDatas.length);
  const barColor = walkDatas.map((value) => value < target ? "#e57373" : "#bcebc4");
  const daysofWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const todayIndex = new Date().getDay();
  const sortedLabels = [...daysofWeek.slice(todayIndex - 1), ...daysofWeek.slice(0, todayIndex - 1)];

  // 그래프 하단에 표시할 annotation 정보를 상태로 저장
  const [annotationsInfo] = useState({
    targetLine: `목표 걸음 수: ${target}`,
    averageLine: `평균 걸음 수: ${average}`,
  });

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "걸음 수",
        data: walkDatas,
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
        max: Math.floor(Math.max(Math.max(...walkDatas), target) * 1.15),
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
        <p className="small-title">걸음 수</p>
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

export default WeeklyWalking;
