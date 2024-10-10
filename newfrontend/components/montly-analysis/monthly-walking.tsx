import React from 'react';
import WalkingChart from '../walking-chart';
import dayjs from 'dayjs';

const MonthlyWalking = (): JSX.Element => {
  const monthlyData = [10000, 12300, 5700, 8000];
  const target = 6000;
  const average = Math.floor(monthlyData.reduce((acc, curr) => acc + curr, 0) / monthlyData.length);
  const weekLabels = [`1주`, `2주`, `3주`, `4주`];
  const barColor = monthlyData.map(value => value < target ? "#e57373" : "#bcebc4");
  
  return (
    <WalkingChart
      labels = {weekLabels}
      walkData = {monthlyData}
      target = {target}
      average = {average}
      barColor = {barColor}
      axis = "x"
      title = "월간 걷기 데이터"
      showAnnotations = {true}
      showEmoticons = {false}
    />
  );
};

export default MonthlyWalking;
