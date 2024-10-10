import {useState, useEffect} from 'react';

import instance from '@/lib/axios';
import PieChart from '../pie-chart';

const WeeklyConsumption = (): JSX.Element => {
  const [weeklyData, setWeeklyData] = useState<{ totalSpend: number; ecoSpend: number; previousRatio: number; } | null>(null);

  const fetchWeeklyData = async () => {
    try {
      const response = await instance.get('statistics/7');
      const data = response.data
      console.log(data)
      setWeeklyData(data); 
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const weeklyConsumption = weeklyData ? weeklyData.totalSpend : 0;
  const weeklyEcoConsumption = weeklyData ? weeklyData.ecoSpend : 0;
  const previousRatio = weeklyData ? weeklyData.previousRatio * 100 : 0;
  console.log(previousRatio)
  const percentageCompare = ((weeklyEcoConsumption / weeklyConsumption) * 100 - previousRatio).toFixed(2);

  return (
    <PieChart 
      labels={['에코 소비', '기타 소비']}
      data={[weeklyEcoConsumption, weeklyConsumption - weeklyEcoConsumption]}
      percentageCompare={parseFloat(percentageCompare)}
      title="주간 에코 소비 비율"
      period="weekly"
    />
  );
};

export default WeeklyConsumption;
