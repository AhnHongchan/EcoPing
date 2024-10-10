'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import instance from "@/lib/axios";

import dayjs from 'dayjs';

interface PointHistoryItem {
  pointsId: number;
  userId: number;
  createdTime: string;
  description: string;
  amount: number;
  operation: 'EARN' | 'SPEND';
}

interface ApiResponse {
  PointHistory: PointHistoryItem[];
}

interface Filter {
  period: string;
  category: string;
  sort: string;
}

interface MypagePointHistoryProps {
  filter: Filter;
}

const MypagePointHistory = ({ filter }: MypagePointHistoryProps) => {
  const dummyUser = 1;
  
  const SuspendedSearchParamsComponent = () => {
    const searchParams = useSearchParams();
    return { finalTotalFromParams: searchParams.get('total') };
  };

  const { finalTotalFromParams } = SuspendedSearchParamsComponent();
  const initialTotal = finalTotalFromParams ? parseInt(finalTotalFromParams, 10) : 0;

  const [pointData, setPointData] = useState<PointHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dummyData: PointHistoryItem[] = [
    {
      pointsId: 1,
      userId: 123,
      operation: 'EARN',
      description: '에코 소비',
      createdTime: '2024-08-26T02:08:17',
      amount: 100,
    },
    {
      pointsId: 2,
      userId: 123,
      operation: 'SPEND',
      description: '나무 물 주기',
      createdTime: '2024-08-05T02:08:17',
      amount: 500,
    },
    {
      pointsId: 3,
      userId: 123,
      operation: 'EARN',
      description: '에코 소비',
      createdTime: '2024-08-01T02:08:17',
      amount: 200,
    },
    {
      pointsId: 4,
      userId: 123,
      operation: 'EARN',
      description: '에코 소비',
      createdTime: '2024-08-01T01:08:17',
      amount: 200,
    },
  ];

  const fetchPointHistory = async () => {
    try {
      const response = await instance.get<ApiResponse>('/points-history/info', {
      });
      setPointData(response.data.PointHistory);
      // setPointData(dummyData); // 더미데이터 테스터용 나중에 지우기
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPointHistory();
  }, []);

  const calculateTotals = (data: PointHistoryItem[]) => {
    let currentTotal = initialTotal;
    return data.map((item) => {
      const newTotal = currentTotal;
      currentTotal -= item.operation === 'EARN' ? -item.amount : item.amount;
      return { ...item, total: newTotal };
    });
  };

  const filterByPeriod = (data: PointHistoryItem[]) => {
    const periodMonths = parseInt(filter.period.replace('개월', ''), 10);
    const currentDate = dayjs();
    const filteredData = data.filter((item) => {
      const itemDate = dayjs(item.createdTime);
      return itemDate.isAfter(currentDate.subtract(periodMonths, 'month'));
    });
    return filteredData;
  };

  const filterByCategory = (data: PointHistoryItem[]) => {
    if (filter.category === '전체') {
      return data;
    }
    return data.filter((item) =>
      filter.category === '적립' ? item.operation === 'EARN' : item.operation === 'SPEND'
    );
  };

  const sortData = (data: PointHistoryItem[]) => {
    if (filter.sort === '최신순') {
      return [...data].sort(
        (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
      );
    } else {
      return [...data].sort(
        (a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
      );
    }
  };

  const processedData = calculateTotals(sortData(filterByCategory(filterByPeriod(pointData))));

  const groupedData = processedData.reduce((acc: Record<string, PointHistoryItem[]>, item) => {
    const dateKey = dayjs(item.createdTime).format('YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {});

  const dates = Object.keys(groupedData);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div className="spinner border-t-4 border-loginDarkGreen w-8 h-8 rounded-full animate-spin mt-20"></div>
      </div>
    );
  if (error) return <div className='ml-4 mt-4'>서버 문제입니다.</div>;

  return (
    <div className="flex justify-center">
      <div className="w-[calc(98%-20px)] bg-white rounded-lg p-1 m-[1%]">
        {dates.length === 0 ? (
          <div className="text-center text-gray-600 py-4">
            조회된 결과가 없습니다.
          </div>
        ) : (
          dates.map((date, dateIndex) => (
            <div key={date} className="mb-5">
              <div className="text-lg font-bold mb-2 border-b-2 border-gray-800 pb-1 text-gray-800">
                {date}
              </div>
              {groupedData[date].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col py-2 ${
                    index < groupedData[date].length - 1 ? 'border-b border-gray-300' : ''
                  }`}
                >
                  <div className="text-xs text-gray-600 mb-1">
                    {dayjs(item.createdTime).format('HH:mm')}
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm text-gray-800">{item.description}</div>
                    <div className="flex flex-col items-end ml-5">
                    <div
  className={`text-sm font-bold ${
    item.operation === 'EARN' ? 'text-red-500' : 'text-blue-600'
  }`}
>
  {item.operation === 'EARN' ? '+' : '-'}
  {item.amount.toLocaleString()} 포인트
</div>

                    </div>
                  </div>
                </div>
              ))}
              {dateIndex < dates.length - 1 && <div className="border-t-2 border-gray-800 my-2"></div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
  
};

export default MypagePointHistory;
