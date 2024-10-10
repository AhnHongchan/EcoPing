"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  avgPrice: number;
  profitRate: number;
}

interface HoldItem {
  companyNumber: string;
  quantity: number;
  averagePurchasePrice: number;
}

const Investment = (): JSX.Element => {
  const [stockList, setStockList] = useState<StockItem[]>([]);
  const [nameList, setNameList] = useState<{
    [key: string]: { name: string; ecoScore: number; ranking: number };
  }>({});
  const [holdList, setHoldList] = useState<{
    [key: string]: { hold: number; avg: number };
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const holdListRef = useRef(holdList); // holdList를 참조하는 ref
  const { companyStoreDict, setCompanyStoreDict } = useStockStore();
  const router = useRouter();

  // holdList 변경 시 ref 업데이트
  useEffect(() => {
    holdListRef.current = holdList;
  }, [holdList]);

  // 데이터를 가져오는 함수
  const fetchWholeStockData = async () => {
    try {
      const nameResponse = await instance.get("/stock/list");
      const holdResponse = await instance.get("holdings/list");

      const nameData = nameResponse.data.data;
      const holdData = holdResponse.data;

      // nameList와 holdList 설정
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

      const holdDict = holdData.reduce(
        (
          acc: { [key: string]: { hold: number; avg: number } },
          item: HoldItem
        ) => {
          acc[item.companyNumber] = {
            hold: item.quantity,
            avg: item.averagePurchasePrice,
          };
          return acc;
        },
        {}
      );

      setCompanyStoreDict(companyDict);
      setNameList(companyDict);
      setHoldList(holdDict); // holdList 업데이트
    } catch (error) {}
  };

  // WebSocket 연결 및 데이터 처리 함수
  const initializeWebSocket = () => {
    const socket = new WebSocket(
      "wss://j11a304.p.ssafy.io/api/websocket/stock"
    );

    socket.onopen = () => {};

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

        // 최신 holdList 정보를 각 stockItem에 추가
        updatedStockList = updatedStockList.map((stock) => {
          const avgPrice = holdListRef.current[stock.companyNumber]?.avg ?? 0;
          const currentPrice = parseFloat(stock.currentPrice) / 100;
          const profitRate = ((avgPrice - currentPrice) / currentPrice) * 100;

          return {
            ...stock,
            holdAmount: holdListRef.current[stock.companyNumber]?.hold ?? 0, // 최신 holdList 참조
            avgPrice: avgPrice,
            profitRate: profitRate.toFixed(2), // 소수점 2자리까지 수익률 계산
          };
        });

        setStockList(updatedStockList);
        setIsLoading(false);
      } catch (error) {}
    };

    socket.onclose = () => {};

    return () => {
      socket.close();
    };
  };

  useEffect(() => {
    const fetchDataAndInitializeWebSocket = async () => {
      // 데이터 요청이 완료될 때까지 대기
      await fetchWholeStockData();

      // 데이터 요청이 완료된 후에 웹소켓 초기화
      const cleanupWebSocket = initializeWebSocket();
      return cleanupWebSocket;
    };

    // 비동기 함수를 호출
    const initialize = async () => {
      const cleanupWebSocket = await fetchDataAndInitializeWebSocket();

      // 컴포넌트 언마운트 시 웹소켓 정리
      return cleanupWebSocket;
    };

    const cleanup = initialize();

    return () => {
      cleanup.then((cleanupWebSocket) => {
        if (cleanupWebSocket) {
          cleanupWebSocket();
        }
      });
    };
  }, []);

  const handleClick = (stock: StockItem): void => {
    router.push(`/invest/${stock.companyNumber}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen">
        <p className="text-center text-2xl font-bold mb-32">모의 투자</p>
        <div className="flex justify-center items-center">
          <div className="spinner border-t-4 border-loginLightGreen w-8 h-8 rounded-full animate-spin mb-10"></div>
        </div>
        <p>실시간 주식 정보를 받아오는 중입니다</p>
        <br />
        <p className="text-xl font-bold text-green-600">
          1/100 가격으로 참여하는 모의 투자
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p className="text-center font-bold text-2xl">모의 투자</p>
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
                className="flex justify-between items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
              >
                <div className="shrink-0">
                  <p className="text-black font-bold text-base leading-normal ml-6">
                    {nameList[stock.companyNumber]?.name || stock.companyNumber}
                  </p>
                </div>
                <div className="text-left font-bold">
                  <p className="font-bold">
                    현재가: {parseInt(stock.currentPrice).toLocaleString()}원
                  </p>
                  <p className="text-black text-left font-bold leading-normal line-clamp-1">
                    보유 주식 수:{" "}
                    {stock.holdAmount ? stock.holdAmount.toLocaleString() : "0"}
                  </p>
                  <p
                    className={`text-sm text-left font-bold leading-normal line-clamp-2 ${
                      stock.profitRate > 0 ? "text-red-500" : "text-blue-700"
                    }`}
                  >
                    내 수익률: {stock.profitRate}%
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
              <BiSolidHeart
                className={`text-red-500 ${
                  stock.holdAmount && stock.holdAmount > 0 ? "" : "invisible"
                }`}
              />
              <p className="text-md text-center font-bold ml-2">
                {nameList[stock.companyNumber]?.name || stock.companyNumber}
              </p>
            </div>
            <div className="text-left font-bold">
              <p>현재가: {parseInt(stock.currentPrice).toLocaleString()}원</p>
              <p>
                전일 대비:{" "}
                <span
                  className={
                    parseFloat(stock.rateDifference) >= 0
                      ? "text-red-500"
                      : "text-blue-700"
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
