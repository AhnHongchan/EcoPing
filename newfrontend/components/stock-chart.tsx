import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface StockChartProps {
  stockGraphData: Array<{ stckBsopDate: string; stckClpr: number }>;
}

// 차트 데이터의 타입 정의
type DataType = ChartData<'line', number[], string>;

const Stockchart = ({ stockGraphData }: StockChartProps) => {
  const [chartData, setChartData] = useState<DataType>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (stockGraphData && stockGraphData.length > 0) {
      const reversedData = [...stockGraphData].reverse(); // 데이터 역순으로 변경
  
      const labels = reversedData.map(stock => stock.stckBsopDate); // X축에 날짜
      const data = reversedData.map(stock => stock.stckClpr); // Y축에 가격
  
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Stock Price',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)', // 꺾은선 색
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // 영역 색
            fill: true, // 영역 채우기
            tension: 0.3, // 곡선의 굴곡 정도
            pointRadius: 5, // 포인트 크기
          },
        ]
      });
    }
  }, [stockGraphData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // 범례 표시
      },
      title: {
        display: true,
        text: 'Stock Price Over Time', // 차트 제목
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date', // X축 제목
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price', // Y축 제목
        },
        beginAtZero: false, // Y축 0부터 시작하지 않음
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Stockchart;
