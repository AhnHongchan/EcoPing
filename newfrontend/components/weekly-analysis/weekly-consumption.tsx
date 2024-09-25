import React from 'react';
import PieChart from '../pie-chart';

const WeeklyConsumption = (): JSX.Element => {
  const consumptions = [3000, 1800, 2400, 4000, 4500, 3100, 9000];
  const ecoConsumptions = [1000, 500, 700, 1200, 1500, 1800, 2000];
  const sumConsumptions = consumptions.reduce((acc, value) => acc + value, 0);
  const sumEcoConsumptions = ecoConsumptions.reduce((acc, value) => acc + value, 0);
  const lastWeekEcoAverageConsumption = 30;
  const percentageCompare = ((sumEcoConsumptions / sumConsumptions) * 100 - lastWeekEcoAverageConsumption).toFixed(2);

  return (
    <PieChart 
      labels={['에코 소비', '기타 소비']}
      data={[sumEcoConsumptions, sumConsumptions - sumEcoConsumptions]}
      percentageCompare={parseFloat(percentageCompare)}
      title="주간 에코 소비 비율"
      period="weekly"
    />
  );
};

export default WeeklyConsumption;
