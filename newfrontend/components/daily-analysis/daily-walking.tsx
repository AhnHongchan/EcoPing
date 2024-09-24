import React from 'react';
import WalkingChart from '../walking-chart';

const DailyWalking = (): JSX.Element => {
  const walkData = [4026];
  const target = 6000;
  const today = new Date().toISOString().substring(5, 10);
  const barColor = walkData[0] < target ? "#e57373" : "#bcebc4";

  return (
    <WalkingChart
      labels= {[today]} 
      walkData = {walkData}
      target = {target}
      barColor = {[barColor]}
      axis = "y"
      title = "일간 걷기 데이터"
      showAnnotations = {true} // 목표 걸음 수 표시
      showEmoticons = {true}
    />
  );
};

export default DailyWalking;
