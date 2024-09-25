'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import instance from '../../../lib/axios';
import { investList } from './dummy';

interface StockItem {
  stockId: string;
  stockName: string;
  currentPrice: number;
  priceDifference: string;
  rateDifference: number;
  isInterested: boolean;
}

const Investment = (): JSX.Element => {
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);


  // 주석으로 남겨둔 코드: API를 통한 주식 목록 가져오는 함수
  // const fetchStockData = async () => {
  //   try {
  //     const response = await instance.get('stock/list')
  //     // 여기에서 주식 데이터를 설정하는 로직을 추가할 수 있습니다.
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // }

  // 주식 상세 페이지로 이동하는 함수
  const handleClick = (stock: StockItem): void => {
    setSelectedStock(stock); // 선택된 주식 데이터를 상태에 저장
    router.push(`/invest/${stock.stockId}`); // 동적 라우팅으로 이동
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = (scrollRef.current.offsetWidth); 
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = (scrollRef.current.offsetWidth);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  

  return (
    <div>
      <div>
        <p className='text-center text-2xl'>모의 주식</p>
      </div>
      <br />
      <div>
        <p className='small-title'>관심 종목</p>
      </div>
      {/* 관심 종목 리스트: 가로 스크롤 */}
      <div className="grid grid-cols-[2fr_8fr_2fr] gap-4 items-center">
        <button onClick={scrollLeft} className="p-2 bg-gray-200 rounded">{"<"}</button>
        <div ref={scrollRef} className='flex overflow-x-auto scrollbar-hide h-40 my-2 pb-2'>
          {investList
            .filter(stock => stock.isInterested)
            .map((stock) => (
              <div 
                key={stock.stockId} 
                onClick={() => handleClick(stock)}  
                className="stock-item bg-green-50 cursor-pointer box-style flex-shrink-0 w-11/12 mx-1/24"
              >
                <p className="text-lg font-semibold line-clamp-2 min-h-14">{stock.stockName}</p>
                <p>현재가: {stock.currentPrice}</p>
                <p>내 수익률</p>
              </div>
            ))}
        </div>
        <button onClick={scrollRight} className="p-2 bg-gray-200 rounded">{">"}</button>
      </div>
      <br />
      <div>
        <p className='small-title'>전체 종목</p>
      </div>
      <br />
      {/* 전체 종목 리스트: 세로 스크롤 */}
      <div className='grid grid-cols-2 gap-4 pb-4 h-80 overflow-y-scroll scrollbar-hide'>
        {investList.map((stock) => (
          <div 
            key={stock.stockId} 
            onClick={() => handleClick(stock)}  
            className="stock-item bg-green-50 cursor-pointer box-style"
          >
            <p className="text-lg font-semibold line-clamp-2 min-h-14">{stock.stockName}</p>
            <p>현재가: {stock.currentPrice}</p>
            <p>전일 대비: <span className={stock.rateDifference > 0 ? 'text-red-500' : 'text-blue-700'}>{stock.rateDifference}%</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Investment;