import React, { useState, useEffect } from 'react';
import instance from '@/lib/axios';
import PieChart from '../pie-chart';

const DailyConsumption = (): JSX.Element => {
  const [dailyData, setDailyData] = useState<{ totalSpend: number; ecoSpend: number; previousRatio: number; } | null>(null);

  const fetchDailyData = async () => {
    try {
      const response = await instance.get('statistics/1');
      setDailyData(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchDailyData();
  }, []);

  const todayConsumption = dailyData ? dailyData.totalSpend : 0;
  const todayEcoConsumption = dailyData ? dailyData.ecoSpend : 0;

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
