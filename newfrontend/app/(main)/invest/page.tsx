'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import instance from '../../../lib/axios';
import { investList } from './dummy';
import { BiSolidHeart } from 'react-icons/bi';

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

  
  return (
    <div>
      <div>
        <p className='text-center text-2xl'>모의 주식</p>
      </div>
      <br />
      <div>
        <p className='font-bold text-xl pl-2'>보유 종목</p>
      </div>
      <div className="items-center">
        <div className='overflow-y-scroll scrollbar-hide my-2 pb-2 max-h-[320px]'>
          {investList
            .filter(stock => stock.isInterested)
            .map((stock) => (
              <div 
                key={stock.stockId} 
                onClick={() => handleClick(stock)}  
                className="grid grid-cols-12 text-left items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md justify-between bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
              >
                <div className='shrink-0 col-span-7'>
                  <p className="text-black font-bold text-base leading-normal">{stock.stockName}</p>
                </div>
                <div className='flex flex-col justify-center col-span-5'>
                  <p className='text-black text-base font-bold leading-normal line-clamp-1'>현재가: {stock.currentPrice.toLocaleString()}</p>
                  <p className='text-[#93a7c8] text-sm font-medium leading-normal line-clamp-2'>내 수익률: 5%</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <br />
      <div>
        <p className='font-bold text-xl pl-2'>전체 종목</p>
      </div>
      <div className='my-2 gap-4 pb-4 h-80 overflow-y-scroll  scrollbar-hide'>
        {investList.map((stock) => (
          <div 
            key={stock.stockId} 
            onClick={() => handleClick(stock)}  
            className=" grid grid-cols-12 text-left items-center gap-4 px-4 py-2 my-2 min-h-[72px] rounded-md justify-between bg-white w-full cursor-pointer flex-shrink-0 border-2 border-loginLightGreen"
          >
            <div className='col-span-7 flex items-center min-h-12'>
              <BiSolidHeart color="red" className={`${stock.isInterested ? '' : 'opacity-0'} text-md`} />
              <p className="text-sm text-center font-bold ml-2">    
                {stock.stockName}
              </p>
            </div>
            <div className='col-span-5'>
              <p>현재가: {stock.currentPrice.toLocaleString()}</p>
              <p>전일 대비: <span className={stock.rateDifference > 0 ? 'text-red-500' : 'text-blue-700'}>{stock.rateDifference}%</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Investment;