"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";

import useStockStore from "@/app/store/stock-store";
import Company from "@/app/types/company";
import StockDetailData from "@/app/types/stock-detail";

import { BiSolidHeart } from "react-icons/bi";
import Modal from './modal';

const StockDetail = (): JSX.Element => {
  const router = useRouter();
  const { companyNumber } = useParams();
  const [stockData, setStockData] = useState<StockDetailData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companyStoreDict, setCompanyStoreDict } = useStockStore();

  const fetchData = async () => {
    const response = await instance.get(`stock/${companyNumber}`)
    const data = response.data.data
    setStockData(data);

    if (!companyStoreDict[data.companyNumber]) {

      const nameResponse = await instance.get("/stock/list");
      const nameData = nameResponse.data.data;
      const companyDict = nameData.reduce(
        (
          acc: {
            [key: string]: { name: string; ecoScore: number; ranking: number };
          },
          item: Company
        ) => {
          acc[item.companyNumber] = {
            name: item.companyName,
            ecoScore: item.ecoScore,
            ranking: item.ranking,
          };

          return acc;
        },
        {}
      );
  
      setCompanyStoreDict(companyDict);
    }
  };


  

  const handleClick = () => {
    router.push(`https://m.stock.naver.com/domestic/stock/${companyNumber}/total`);
  };

  const handleTrade = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  useEffect(() => {
    fetchData();
  }, [companyNumber]);

  if (!stockData) {
    return <p>해당하는 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center text-center">
        <BiSolidHeart className={`${stockData.Isinterested ? '' : 'hidden'} text-md text-red-500`}/>
        <p className='small-title ml-2'>
          {companyStoreDict[companyNumber]?.name}
        </p>
      </div>
      <br />
      <div className="box-style bg-loginLightGreen">
        <p>현재가: {Number(stockData.currentPrice).toLocaleString()}원</p>
        <p>52주 최저가: {Number(stockData.min52).toLocaleString()}원</p>
        <p>52주 최고가: {Number(stockData.max52).toLocaleString()}원</p>

        <p>
          전일 대비:{" "}
          <span
            className={parseFloat(stockData.priceDifference) > 0 ? "text-red-500" : "text-blue-700"}
          >
            {Math.abs(parseFloat(stockData.priceDifference)).toLocaleString()}원{" "}
            ({parseFloat(stockData.rateDifference).toLocaleString()}%)
            {parseFloat(stockData.priceDifference) > 0 ? " 상승" : " 하락"}
          </span>
        </p>
        <p></p>
      </div>
      <br />
      <div className="box-style bg-loginLightGreen">
        <p>친환경 지수: {companyStoreDict[companyNumber]?.ecoScore.toFixed(2)}</p>
        <p>추천 순위: {companyStoreDict[companyNumber]?.ranking}위</p>
      </div>
      <br />
      {stockData.hold > 0 && (
        <div>
          <div className="box-style bg-loginLightGreen">
            <div className="flex justify-between">
              <p>보유 주식 수:</p>
              <p>{stockData.hold.toLocaleString()}개</p>
            </div>
            <div className="flex justify-between">
              <p>보유 가치:</p>
              <p>{(stockData.currentPrice * stockData.hold / 100).toLocaleString()}포인트</p>
            </div>
          </div>
          <br />
        </div>
      )}
      <div className="flex justify-center">
        <button className="text-center bg-loginLightGreen w-28 rounded-lg py-2 shadow-md" onClick={handleTrade}>매도 / 매수</button>
      </div>
      <br />
      <div className="text-center">
        <p>보다 많은 주식 정보는?
          <span className="cursor-pointer text-red-500 ml-3" onClick={handleClick}>여기!</span>
        </p>
      </div>

      {isModalOpen && <Modal onClose={closeModal} stockData={stockData}/>}
    </div>
  );
};

export default StockDetail;
