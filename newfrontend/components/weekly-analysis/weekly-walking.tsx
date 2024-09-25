import React from 'react';
import WalkingChart from '../walking-chart';

const WeeklyWalking = (): JSX.Element => {
  const walkDatas = [8600, 7200, 9500, 12000, 10600, 13800, 5100];
  const target = 6000;
  const average = Math.floor(walkDatas.reduce((acc, curr) => acc + curr, 0) / walkDatas.length);
  const daysofWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const todayIndex = new Date().getDay();
  const sortedLabels = [...daysofWeek.slice(todayIndex - 1), ...daysofWeek.slice(0, todayIndex - 1)];
  const barColor = walkDatas.map(value => value < target ? "#e57373" : "#bcebc4");

  return (
    <WalkingChart
      labels={sortedLabels}
      walkData={walkDatas}
      target={target}
      average={average}
      barColor={barColor}
      axis="x"
      title="주간 걷기 데이터"
      showAnnotations={true}
      showEmoticons = {false}
    />
  );
};

export default WeeklyWalking;
