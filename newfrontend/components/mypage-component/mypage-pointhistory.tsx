'use client';

import React, { useEffect, useState } from 'react';
import styles from './mypage-pointhistory.module.css';
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
  const searchParams = useSearchParams();
  const finalTotalFromParams = searchParams.get('total');
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
  ];

  const fetchPointHistory = async () => {
    try {
      const response = await instance.get<ApiResponse>('/points-history/info', {
        headers: {
          userId: dummyUser,
        },
      });
      console.log(response.data);
      setPointData(response.data.PointHistory); 
      setPointData(dummyData); // 더미데이터 테스터용 나중에 지우기
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
    console.log(filter);
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
        <div className="spinner border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.pointHistory}>
      {dates.map((date, dateIndex) => (
        <div key={date} className={styles.dateGroup}>
          <div className={styles.dateLabel}>{date}</div>
          {groupedData[date].map((item, index) => (
            <div
              key={index}
              className={`${styles.historyItem} ${
                index < groupedData[date].length - 1 ? styles.itemBorder : ''
              }`}
            >
              <div className={styles.time}>{dayjs(item.createdTime).format('HH:mm')}</div>
              <div className={styles.actionPointsContainer}>
                <div className={styles.action}>{item.description}</div>
                <div className={styles.pointsContainer}>
                  <div
                    className={`${styles.points} ${
                      item.operation === 'EARN' ? styles.positive : styles.negative
                    }`}
                  >
                    {item.operation === 'EARN' ? '+' : '-'}
                    {item.amount} 포인트
                  </div>
                  <div className={styles.total}>{item.total} 포인트</div>
                </div>
              </div>
            </div>
          ))}
          {dateIndex < dates.length - 1 && <div className={styles.dateSeparator}></div>}
        </div>
      ))}
    </div>
  );
};

export default MypagePointHistory;
