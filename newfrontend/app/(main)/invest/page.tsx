"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import instance from "@/lib/axios";

import { BiSolidHeart } from "react-icons/bi";

interface StockItem {
  stockName: string;
  companyNumber: string;
  rateDifference: string;
  priceDifference: string;
  currentPrice: string;
}

const Investment = (): JSX.Element => {
  const [stockList, setStockList] = useState<StockItem[]>([]);
  const [nameList, setNameList] = useState<{ [key: string]: string }>({});
  const [holdList, setHoldList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // 웹소켓 연결 설정
    const socket = new WebSocket("ws://localhost:8080/websocket/stock");

    const fetchWholeStockData = async () => {
      const nameResponse = await instance.get("/stock/list");
      const holdResponse = await instance.get("holdings/list");

      const nameData = nameResponse.data.data;
      const holdData = holdResponse;
      const companyDict = nameData.reduce((acc, item) => {
        // 각 객체에서 companyNumber와 companyName을 추출하고 딕셔너리에 추가
        acc[item.companyNumber] = item.companyName;
        return acc;
      }, {}); // 초기값을 빈 객체로 설정

      setNameList(companyDict);
      setHoldList(holdData);

      // 웹소켓이 열렸을 때
      socket.onopen = () => {
        console.log("WebSocket 연결 성공");
      };

      // 웹소켓을 통해 메시지를 받을 때
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data?.header?.tr_id === "PINGPONG") {
            return;
          }

          // 데이터가 배열인지 확인하고 상태 업데이트
          if (Array.isArray(data)) {
            setStockList(data);
          } else if (data !== null && typeof data === "object") {
            // 데이터가 객체인 경우 배열로 감싸기
            setStockList([data]);
          } else {
            setStockList((prevList) => [...prevList]); // 기존 상태 유지
          }
        } catch (error) {}
      };

      // 웹소켓 연결이 닫힐 때
      socket.onclose = () => {
        console.log("WebSocket 연결 종료");
      };

      // 컴포넌트 언마운트 시 웹소켓 연결 닫기
      return () => {
        socket.close();
      };
    };

    fetchWholeStockData();
  }, []);

  // 주식 상세 페이지로 이동하는 함수
  const handleClick = (stock: StockItem): void => {
    router.push(`/invest/${stock.companyNumber}`); // 동적 라우팅으로 이동
  };

  return (
    <div>
      <div>
        <p className="text-center text-2xl">모의 투자</p>
      </div>
      <br />
      {/* <div>
        <p className="font-bold text-xl pl-2">보유 종목</p>
      </div>
      <div className="items-center">
        <div className="overflow-y-scroll scrollbar-hide my-2 pb-2 max-h-[320px]">
          {holdList.map((stock) => (
            <div
              key={stock.companyNumber}
              onClick={() => handleClick(stock)}
              className="grid grid-cols-12 text-left items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md justify-between bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
            >
              <div className="shrink-0 col-span-7">
                <p className="text-black font-bold text-base leading-normal">
                  {stock.companyName}
                </p>
              </div>
              <div className="flex flex-col justify-center col-span-5">
                <p className="text-black text-base font-bold leading-normal line-clamp-1">
                  현재가: {parseInt(stock.hold).toLocaleString()}
                </p>
                <p className="text-[#93a7c8] text-sm font-medium leading-normal line-clamp-2">
                  내 수익률: 5%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <br />
      <div>
        <p className="font-bold text-xl pl-2">전체 종목</p>
      </div>
      <div className="my-2 gap-4 pb-4 h-80 overflow-y-scroll scrollbar-hide">
        {stockList.map((stock) => (
          <div
            key={stock.companyNumber}
            onClick={() => handleClick(stock)}
            className="grid grid-cols-12 text-left items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md justify-between bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
          >
            <div className="col-span-7 flex items-center min-h-12">
              <p className="text-sm text-center font-bold ml-2">
                {nameList[stock.companyNumber] || stock.companyNumber}
              </p>
            </div>
            <div className="col-span-5">
              <p>현재가: {parseInt(stock.currentPrice).toLocaleString()}</p>
              <p>
                전일 대비:{" "}
                <span
                  className={
                    parseFloat(stock.rateDifference) > 0
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
