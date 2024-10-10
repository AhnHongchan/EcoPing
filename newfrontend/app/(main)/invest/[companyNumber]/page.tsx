"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";
import axios from "axios";

import useStockStore from "@/app/store/stock-store";
import Company from "@/app/types/company";
import StockDetailData from "@/app/types/stock-detail";
import Stockchart from "@/components/stock-chart";

import { BiSolidHeart } from "react-icons/bi";
import Modal from "./modal";
import dayjs from "dayjs";

const StockDetail = (): JSX.Element => {
  const router = useRouter();
  const { companyNumber } = useParams<{ companyNumber: string }>();
  const [stockData, setStockData] = useState<StockDetailData | null>(null);
  const [stockGraphData, setStockGraphData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companyStoreDict, setCompanyStoreDict } = useStockStore();

  const fetchData = async () => {
    const response = await instance.get(`stock/${companyNumber}`);
    const data = response.data.data;
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

  const handlePeriodChange = (period: string) => {
    let startDate, endDate;

    endDate = dayjs().format("YYYYMMDD");

    if (period === "D") {
      startDate = dayjs().subtract(3, "month").format("YYYYMMDD"); // 최근 3개월
    } else if (period === "W") {
      startDate = dayjs().subtract(1, "year").format("YYYYMMDD"); // 최근 1년
    } else if (period === "M") {
      startDate = dayjs().subtract(3, "year").format("YYYYMMDD"); // 최근 3년
    } else if (period === "Y") {
      startDate = dayjs().subtract(10, "year").format("YYYYMMDD"); // 최근 10년
    } else {
      startDate = dayjs().subtract(3, "month").format("YYYYMMDD"); // 최근 3개월
    }

    fetchGraph(startDate, endDate, period);
  };

  const fetchGraph = async (
    startDate: string,
    endDate: string,
    period: string
  ) => {
    try {
      const graphResponse = await instance.get(
        `stock/chart/${companyNumber}/${period}`,
        {
          params: { startDate, endDate },
        }
      );

      const graphData = graphResponse.data.data;
      setStockGraphData(graphData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      } else {
      }
    }
  };

  const handleClick = () => {
    router.push(
      `https://m.stock.naver.com/domestic/stock/${companyNumber}/total`
    );
  };

  const handleTrade = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  useEffect(() => {
    const initializeData = async () => {
      await handlePeriodChange("D");
      fetchData();
    };

    initializeData();
  }, [companyNumber]);

  if (!stockData) {
    return (
      <div>
        <p className="small-title ml-2">상세 정보를 불러옵니다</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center text-center">
        <BiSolidHeart
          className={`${
            stockData.hold > 0 ? "" : "hidden"
          } text-md text-red-500`}
        />
        <p className="small-title ml-2">
          {companyStoreDict[companyNumber]?.name}
        </p>
      </div>
      <br />
      <div className="flex gap-4 justify-end">
        <button
          className="font-bold rounded-md shadow-md px-2 py-1 bg-loginLightGreen"
          onClick={() => handlePeriodChange("D")}
        >
          일
        </button>
        <button
          className="font-bold rounded-md shadow-md px-2 py-1 bg-loginLightGreen"
          onClick={() => handlePeriodChange("W")}
        >
          주
        </button>
        <button
          className="font-bold rounded-md shadow-md px-2 py-1 bg-loginLightGreen"
          onClick={() => handlePeriodChange("M")}
        >
          월
        </button>
        <button
          className="font-bold rounded-md shadow-md px-2 py-1 bg-loginLightGreen"
          onClick={() => handlePeriodChange("Y")}
        >
          년
        </button>
      </div>
      <br />
      <div>
        <Stockchart stockGraphData={stockGraphData} />
      </div>
      <br />
      <div className="box-style bg-loginLightGreen">
        <div className="flex justify-between">
          <p>현재가: </p>
          <p>{Number(stockData.currentPrice).toLocaleString()}원</p>
        </div>
        <div className="flex justify-between">
          <p>52주 최저가: </p>
          <p>{Number(stockData.min52).toLocaleString()}원</p>
        </div>
        <div className="flex justify-between">
          <p>52주 최고가: </p>
          <p>{Number(stockData.max52).toLocaleString()}원</p>
        </div>
        <div className="flex justify-between">
          <p>전일 대비: </p>
          <p
            className={
              parseFloat(stockData.priceDifference) > 0
                ? "text-red-500 font-bold"
                : "text-blue-700 font-bold"
            }
          >
            {Math.abs(parseFloat(stockData.priceDifference)).toLocaleString()}원
            ({parseFloat(stockData.rateDifference).toLocaleString()}%)
            {parseFloat(stockData.priceDifference) > 0 ? " 상승" : " 하락"}
          </p>
        </div>
      </div>
      <br />
      <div className="box-style bg-loginLightGreen">
        <div className="flex justify-between">
          <p>친환경 지수:</p>
          <p>{companyStoreDict[companyNumber]?.ecoScore.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>추천 순위: </p>
          <p>{companyStoreDict[companyNumber]?.ranking}위</p>
        </div>
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
              <p>
                {(
                  (stockData.currentPrice * stockData.hold) /
                  100
                ).toLocaleString()}
                포인트
              </p>
            </div>
          </div>
          <br />
        </div>
      )}
      <div className="flex justify-center">
        <button
          className="text-center bg-loginLightGreen w-28 rounded-lg py-2 shadow-md"
          onClick={handleTrade}
        >
          매도 / 매수
        </button>
      </div>
      <br />
      <div className="text-center">
        <p>
          보다 많은 주식 정보는?
          <span
            className="cursor-pointer text-red-500 ml-3 font-bold"
            onClick={handleClick}
          >
            여기!
          </span>
        </p>
      </div>

      {isModalOpen && <Modal onClose={closeModal} stockData={stockData} />}
    </div>
  );
};

export default StockDetail;
