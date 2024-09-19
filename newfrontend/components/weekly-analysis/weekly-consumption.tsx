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

const WeeklyConsumption = () => {
  const weeklyConsumption = 2500
  const todayEcoConsumption = 980
  const data = {
    labels: ['오늘의 에코 소비'],
    datasets: [{
      label: '총 소비',
      data: todayConsumption,
    }]
  }
  return (
    <div>
        {/* <Bar data={data} options={options} /> */}
    </div>
  )
}

export default WeeklyConsumption;