import React from 'react';
import PieChart from '../pie-chart';

const MonthlyConsumption = ():JSX.Element => {
  const consumptions = [38000, 45000, 51000, 41000];
  const ecoConsumptions = [8000, 14500, 20000, 13500];
  const sumConsumptions = consumptions.reduce((acc, value) => acc + value, 0);
  const sumEcoConsumptions = ecoConsumptions.reduce((acc, value) => acc + value, 0);
  const lastWeekEcoAverageConsumption = 30;
  const percentageCompare = ((sumEcoConsumptions / sumConsumptions) * 100 - lastWeekEcoAverageConsumption).toFixed(2);

  return (
    <PieChart 
      labels = {['에코 소비', '기타 소비']}
      data = {[sumEcoConsumptions, sumConsumptions - sumEcoConsumptions]}
      percentageCompare = {parseFloat(percentageCompare)}
      title = "월간 에코 소비 비율"
      period = "monthly"
    />
  );
};

export default MonthlyConsumption;
