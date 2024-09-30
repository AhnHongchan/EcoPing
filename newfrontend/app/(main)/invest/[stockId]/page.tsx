"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidHeart } from "react-icons/bi";

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
      return "text-green-500";
    } else {
      return "text-black";
    }
  };

  if (!stockData) {
    return <p>해당하는 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center text-center">
        <BiSolidHeart className={`${stockData.Isinterested ? '' : 'opacity-0'} text-md text-red-500`}/>
        <p className='small-title ml-2'>
          {stockData.stockName}
        </p>
      </div>
      <br />
      <div className="box-style bg-loginLightGreen">
        <p>현재가: {stockData.currentPrice.toLocaleString()}</p>
        <p>52주 최저가: {stockData.min52.toLocaleString()}원</p>
        <p>52주 최고가: {stockData.max52.toLocaleString()}원</p>
      </div>
      <br />
      <div className="box-style bg-loginLightGreen">
        <p>친환경 지수: {stockData.envPoint}</p>
        <p>추천 순위: {stockData.recommendRank}위</p>
      </div>
      <br />
      <div className="text-center">
        <p>보다 많은 주식 정보는?
          <span className="cursor-pointer text-red-500 ml-3" onClick={handleClick}>여기!</span>
        </p>
      </div>
    </div>
  );
};

export default StockDetail;
