import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import commonAxisOptions from "./chart-options";
import dayjs from "dayjs";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface StockChartProps {
  stockGraphData: Array<{ stckBsopDate: string; stckClpr: number }>;
}

const Stockchart = ({ stockGraphData }: StockChartProps) => {
  const chartRef = useRef(null);
  const reversedData = [...stockGraphData].reverse();

  const labels = reversedData.map((stock) =>
    dayjs(stock.stckBsopDate).format("YY.MM.DD")
  );
  const data = reversedData.map((stock) => stock.stckClpr);

  const firstPrice = data[0] || 0; 
  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const standardPrice = formatNumber(firstPrice);
  
  

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "주가",
        data: data,
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1.5,
        fill: {
          target: { value: firstPrice }, // 기준점을 target으로 설정
          above: "rgba(255, 0, 0, 0.8)", // 빨간색 채우기 (위쪽)
          below: "rgba(0, 0, 255, 0.8)", // 파란색 채우기 (아래쪽)
        },
        backgroundColor: "transparent", // 투명 배경
        tension: 0.3,
        pointRadius: 0,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      annotation: {
        annotations: {
          line1: {
            type: "line" as const,
            yMin: firstPrice,
            yMax: firstPrice,
            borderColor: "rgba(0, 0, 0, 0.8)",
            borderWidth: 2,
            borderDash: [7, 3],
            label: {
              enabled: true,
              content: `기준 가격: ${firstPrice}`,
              position: "end" as const,
            },
          },
        },
      },
    },
    scales: {
      x: {
        ...commonAxisOptions,
        title: {
          display: true,
          text: "날짜",
          color: "#000",
          font: {
            weight: "bold" as const,
          },
        },
      },
      y: {
        ...commonAxisOptions,
        title: {
          display: true,
          text: "주가(원)",
          color: "#000",
          font: {
            weight: "bold" as const,
          },
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={options} />
      <p className="text-center font-bold">
        기준 가격: {standardPrice}원
      </p>
    </div>
  );
};

export default Stockchart;
