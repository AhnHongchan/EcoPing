"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import instance from "@/lib/axios";
import useStockStore from "@/app/store/stock-store";
import Company from "@/app/types/company";
import { BiSolidHeart } from "react-icons/bi";

interface StockItem {
  stockName: string;
  companyNumber: string;
  rateDifference: string;
  priceDifference: string;
  currentPrice: string;
  holdAmount?: number; 
}

const Investment = (): JSX.Element => {
  const [stockList, setStockList] = useState<StockItem[]>([]);
  const [nameList, setNameList] = useState<{ [key: string]: { name: string; ecoScore: number; ranking: number } }>({});
  const [holdList, setHoldList] = useState<{ [key: string]: { hold: number } }>({});
  const { companyStoreDict, setCompanyStoreDict } = useStockStore();
  const router = useRouter();

  // 데이터를 가져오는 함수
  const fetchWholeStockData = async () => {
    try {
      // const initialResponse = await instance.get("/stock/initial-data");
      const nameResponse = await instance.get("/stock/list");
      const holdResponse = await instance.get("holdings/list");
      
      // const initialData = initialResponse.data.data;
      const nameData = nameResponse.data.data;
      const holdData = holdResponse.data;
      // console.log(initialData)
      // nameList와 holdList 설정
      const companyDict = nameData.reduce((acc: { [key: string]: { name: string; ecoScore: number; ranking: number } }, item: Company) => {
        acc[item.companyNumber] = {
          name: item.companyName,
          ecoScore: item.ecoScore,
          ranking: item.ranking,
        };
        return acc;
      }, {});

      const holdDict = holdData.reduce((acc: { [key: string]: { hold: number } }, item) => {
        acc[item.companyNumber] = {
          hold: item.holdAmount,
        };
        return acc;
      }, {});
      // console.log(initialData)
      // setStockList(initialData);
      setCompanyStoreDict(companyDict);
      setNameList(companyDict);
      setHoldList(holdDict);
    } catch (error) {
      console.error("데이터 가져오기 중 오류:", error);
    }
  };

  // WebSocket 연결 및 데이터 처리 함수
  const initializeWebSocket = () => {
    const socket = new WebSocket("ws://localhost:8080/websocket/stock");

    socket.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.header?.tr_id === "PINGPONG") {
          return;
        }

        let updatedStockList = [];
        if (Array.isArray(data)) {
          updatedStockList = data;
        } else if (data !== null && typeof data === "object") {
          updatedStockList = [data];
        } else {
          updatedStockList = [...stockList];
        }

        // holdList 정보를 각 stockItem에 추가
        updatedStockList = updatedStockList.map((stock) => ({
          ...stock,
          holdAmount: holdList[stock.companyNumber]?.hold || 0,
        }));
        setStockList(updatedStockList);
      } catch (error) {
        console.error("WebSocket 메시지 처리 중 오류:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket 연결 종료");
    };

    return () => {
      socket.close();
    };
  };

  useEffect(() => {
    fetchWholeStockData();
    const cleanupWebSocket = initializeWebSocket();
    return cleanupWebSocket;
  }, []);

  const handleClick = (stock: StockItem): void => {
    router.push(`/invest/${stock.companyNumber}`);
  };

  return (
    <div>
      <div>
        <p className="text-center text-2xl">모의 투자</p>
      </div>
      <br />
      <div>
        <p className="font-bold text-xl pl-2">보유 종목</p>
      </div>
      <div className="items-center">
        <div className="overflow-y-scroll scrollbar-hide my-2 pb-2 max-h-[320px]">
          {stockList
            .filter((stock) => stock.holdAmount && stock.holdAmount > 0) // holdAmount가 0보다 큰 종목만 표시
            .map((stock) => (
              <div
                key={stock.companyNumber}
                onClick={() => handleClick(stock)}
                className="grid grid-cols-12 text-left items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md justify-between bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
              >
                <div className="shrink-0 col-span-7">
                  <p className="text-black font-bold text-base leading-normal">
                    {nameList[stock.companyNumber]?.name || stock.companyNumber}
                  </p>
                </div>
                <div className="flex flex-col justify-center col-span-5">
                  <p className="text-black text-base font-bold leading-normal line-clamp-1">
                    현재가: {parseInt(stock.holdAmount!.toString()).toLocaleString()}
                  </p>
                  <p className="text-[#93a7c8] text-sm font-medium leading-normal line-clamp-2">
                    내 수익률: 5%
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <br />
      <div>
        <p className="font-bold text-xl pl-2">전체 종목</p>
      </div>
      <div className="my-2 gap-4 pb-4 h-80 overflow-y-scroll scrollbar-hide">
        {stockList.map((stock) => (
          <div
            key={stock.companyNumber}
            onClick={() => handleClick(stock)}
            className="flex justify-between items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
          >
            <div className="text-left flex items-center min-h-12">
              {stock.holdAmount && stock.holdAmount > 0 && <BiSolidHeart />}
              <p className="text-md text-center font-bold ml-2">
                {nameList[stock.companyNumber]?.name || stock.companyNumber}
              </p>
            </div>
            <div className="text-right">
              <p>현재가: {parseInt(stock.currentPrice).toLocaleString()}원</p>
              <p>
                전일 대비:{" "}
                <span
                  className={
                    parseFloat(stock.rateDifference) > 0 ? "text-red-500" : "text-blue-700"
                  }
                >
                  {stock.rateDifference}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investment;
