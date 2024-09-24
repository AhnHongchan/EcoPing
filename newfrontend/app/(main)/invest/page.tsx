'use client';

import { useEffect, useState } from 'react';
import instance from "@/lib/axios";
import { RiChatDeleteFill } from 'react-icons/ri';

interface InvestItem {
  stockId: string;
  stockName: string;
  currentPrice: number;
  priceDifference: string;
  rateDifference: number;
  isInterested: boolean;
}

const Investment = (): JSX.Element => {
  const investList: InvestItem[] = [
    {
      stockId: "005930",           // 주식 종목 번호 (삼성전자)
      stockName: "Samsung Electronics",  // 주식 이름 (삼성전자)
      currentPrice: 72100,         // 주식 현재가
      priceDifference: "-200",     // 전일 대비 가격 증감 (음수면 하락)
      rateDifference: -0.28,       // 전일 대비 등락률 (음수면 하락)
      isInterested: true           // 사용자가 해당 종목을 관심 종목으로 등록했는지 여부
    },
    {
      stockId: "000660",           // 주식 종목 번호 (SK하이닉스)
      stockName: "SK Hynix",
      currentPrice: 123000,
      priceDifference: "500",
      rateDifference: 0.41,
      isInterested: false          // 관심 종목에 등록되지 않은 상태
    }
  ];

  // 상승/하락에 따른 텍스트와 색상을 동적으로 설정하는 함수
  const getRateDifferenceClass = (rateDifference: number) => {
    return rateDifference > 0 ? 'text-green-700' : 'text-red-700';
  };

  return (
    <div>
      <div>
        <p className='text-center text-2xl'>모의 주식</p>
      </div>
      <br />
      <div>
        {investList.map((stock) => {
          const differenceClass = getRateDifferenceClass(stock.rateDifference);
          const differenceText = stock.rateDifference > 0 
            ? `${stock.rateDifference} 상승` 
            : `${stock.rateDifference} 하락`;

          return (
            <div key={stock.stockId} className="stock-item mb-4 p-4 border rounded-lg shadow">
              <h3 className="text-lg font-semibold">{stock.stockName}</h3>
              <p>현재가: {stock.currentPrice}</p>
              <p>
                전일 대비: {stock.priceDifference} (
                <span className={differenceClass}>{differenceText}</span>
                )
              </p>
              <p>관심 종목: {stock.isInterested ? 'Yes' : 'No'}</p>
            </div>
          );
        })}
      </div>
    </div>

  );
}

export default Investment;
