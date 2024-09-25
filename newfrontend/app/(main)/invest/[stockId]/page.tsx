"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface StockDetailData {
  stockId: string;
  stockName: string;
  currentPrice: number;
  priceDifference: string;
  rateDifference: number;
  min52: number;
  max52: number;
  Isinterested: boolean;
  envPoint: string;
  recommendRank: number;
}

const StockDetail = (): JSX.Element => {
  const router = useRouter();
  const { stockId } = useParams();
  const [stockData, setStockData] = useState<StockDetailData | null>(null);
  const fetchData = {
    stockId: stockId as string,
    stockName: "Samsung Electronics",
    currentPrice: 72100,
    priceDifference: "-200",
    rateDifference: -0.28,
    min52: 60000,
    max52: 80000,
    Isinterested: true,
    envPoint: "A+",
    recommendRank: 1,
  };

  // const fetchStockDetail = async () => {
  //   try {
  //     const response = await instance.get('stock/list')

  //   } catch {

  // }
  // }

  const handleClick = () => {
    router.push(`https://m.stock.naver.com/domestic/stock/${stockId}/total`);
  };

  useEffect(() => {
    setStockData(fetchData);
  }, [stockId]);

  const isInterestedColor = () => {
    if (stockData?.Isinterested) {
      return "text-green-700";
    } else {
      return "text-red-700";
    }
  };

  if (!stockData) {
    return <p>해당하는 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <div>
        <p className="small-title">
          Stock Detail for{" "}
          <span className={isInterestedColor()}>{stockData.stockName}</span>
        </p>
        <br />
        <p>현재가: {stockData.currentPrice}</p>
        <p>52주 최저가: {stockData.min52.toLocaleString()}원</p>
        <p>52주 최고가: {stockData.max52.toLocaleString()}원</p>
      </div>
      <br />
      <div>
        <p>친환경 지수: {stockData.envPoint}</p>
        <p>추천 순위: {stockData.recommendRank}위</p>
      </div>
      <br />
      <div className="cursor-pointer" onClick={handleClick}>
        추가 주식 정보 확인하기
      </div>
    </div>
  );
};

export default StockDetail;
