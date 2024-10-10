import {useState, useEffect} from 'react';
import instance from '@/lib/axios';
import PieChart from '../pie-chart';

const MonthlyConsumption = ():JSX.Element => {
  const [monthlyData, setMonthlyData] = useState<{ totalSpend: number; ecoSpend: number; previousRatio: number; } | null>(null);

  const fetchMonthlyData = async () => {
    const response = await instance.get('statistics/30');
    const data = response.data;
    setMonthlyData(data);
  }
  const monthlyConsumption = monthlyData ? monthlyData.totalSpend : 0;
  const monthlyEcoConsumption = monthlyData ? monthlyData.ecoSpend : 0;
  const previousRatio = monthlyData ? monthlyData.previousRatio * 100 : 0;
  const percentageCompare = ((monthlyEcoConsumption / monthlyConsumption) * 100 - previousRatio).toFixed(2);

  useEffect(() => {
    fetchMonthlyData();
  }, [])
  return (
    <PieChart 
      labels = {['에코 소비', '기타 소비']}
      data = {[monthlyEcoConsumption, monthlyConsumption - monthlyEcoConsumption]}
      percentageCompare = {parseFloat(percentageCompare)}
      title = "월간 에코 소비 비율"
      period = "monthly"
    />
  );
};

export default MonthlyConsumption;
