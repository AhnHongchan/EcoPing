import React from 'react';
import PieChart from '../pie-chart';

const DailyConsumption = () => {
  const todayConsumption = 2500;
  const todayEcoConsumption = 980;

  return (
    <PieChart 
      labels={['에코 소비', '기타 소비']}
      data={[todayEcoConsumption, todayConsumption - todayEcoConsumption]}
      title="일간 에코 소비 비율"
      period="daily"
    />
  );
};

export default DailyConsumption;
