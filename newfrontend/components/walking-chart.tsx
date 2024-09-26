import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { BiRun, BiHappy } from "react-icons/bi";

import commonAxisOptions from "./chart-options";

Chart.register(annotationPlugin, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WalkingChartProps {
  labels: string[];
  walkData: number[];
  target: number;
  average?: number;
  barColor: string[];
  axis?: 'x' | 'y';
  title: string;
  showAnnotations?: boolean;
  showEmoticons?: boolean;
  stepSize?: number;
}

const WalkingChart = ({
  labels,
  walkData,
  target,
  average,
  barColor,
  axis = 'y',
  title,
  showAnnotations = true,
  showEmoticons = false, // 이모티콘 표시 여부 추가
}: WalkingChartProps) => {

  const data = {
    labels,
    datasets: [
      {
        label: "걸음 수",
        data: walkData,
        backgroundColor: barColor,
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: axis, // 가로/세로 방향 설정
    maintainAspectRatio: false,
    aspectRatio: 3,
    scales: {
      x: {
        beginAtZero: true,
        max: Math.floor(Math.max(...walkData, target) * 1.15),
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
        ticks: {
          ...commonAxisOptions.ticks,
          stepSize: 2000,
        },
        title: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      ...(showAnnotations && {
        annotation: {
          annotations: {
            targetLine: {
              type: 'line',
              yMin: target,
              yMax: target,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [5, 5],
            },
            ...(average && {
              averageLine: {
                type: 'line',
                yMin: average,
                yMax: average,
                borderColor: 'green',
                borderWidth: 2,
                borderDash: [5, 5],
              },
            }),
          },
        },
      }),
    },
  };

  
  
  return (
    <div className="box-style">
      <div>
        <p className="small-title">{title}</p>
      </div>
      <div className="flex items-center">
        <div className={`h-[${axis === 'y' ? 130 : 60}px] w-80`}>
          <Bar data={data} options={options} />
        </div>
        {showEmoticons && (
          <div className="pb-4">
            {walkData[0] < target ? (
              <BiRun className="text-coralRed text-3xl" />
            ) : (
              <BiHappy className="text-mainGreen text-3xl" />
            )}
          </div>
        )}
      </div>
      <div className="my-2">
        {showAnnotations && (
          <p className="font-bold text-center text-sm">
            <span className="text-coralRed">목표 걸음 수: {target}</span>
            {average && (
              <>
                {" | "}
                <span className="text-green-700">평균 걸음 수: {average}</span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default WalkingChart;
