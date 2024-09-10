'use client';

import React, { useEffect, useState } from 'react';
import styles from './mypage-pointhistory.module.css';
import { useSearchParams } from 'next/navigation'; // Next.js에서는 useSearchParams 사용
import instance from "@/lib/axios";

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

const MypagePointHistory = ({ filter }) => {
  const dummyUser = 1;
  const searchParams = useSearchParams();
  const finalTotalFromParams = searchParams.get('total');
  const finalTotal = finalTotalFromParams ? parseInt(finalTotalFromParams, 10) : 0;

  const [pointData, setPointData] = useState<PointHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dummyData: PointHistoryItem[] = [
    {
      pointsId: 1,
      userId: 123,
      operation: 'EARN',
      description: '에코 소비',
      createdTime: '2023-08-26T02:08:17',
      amount: 100,
    },
    {
      pointsId: 2,
      userId: 123,
      operation: 'SPEND',
      description: '나무 물 주기',
      createdTime: '2024-08-26T02:08:17',
      amount: 500,
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
      setPointData(dummyData)
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

  const sortedData = [...pointData].sort(
    (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
  );

  const calculateTotals = (data: PointHistoryItem[]) => {
    let currentTotal = finalTotal;
    return data.map((item) => {
      const newTotal = currentTotal;
      currentTotal -= item.operation === 'EARN' ? item.amount : -item.amount;
      const [date, time] = item.createdTime.split('T');
      return {
        date: date.replace(/-/g, '.'),
        time: time.split('.')[0],
        action: item.description,
        points: item.operation === 'EARN' ? item.amount : -item.amount,
        total: newTotal,
      };
    });
  };

  const processedData = calculateTotals(sortedData);

  const groupedData = processedData.reduce((acc: Record<string, any[]>, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  const dates = Object.keys(groupedData);

  if (loading) return (     <div className="flex justify-center items-center">
    <div className="spinner border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
  </div>);
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.pointHistory}>
      {dates.map((date, dateIndex) => (
        <div key={date} className={styles.dateGroup}>
          <div className={styles.dateLabel}>{date}</div>
          {groupedData[date].map((item, index) => (
            <div
              key={index}
              className={`${styles.historyItem} ${index < groupedData[date].length - 1 ? styles.itemBorder : ''}`}
            >
              <div className={styles.time}>{item.time}</div>
              <div className={styles.actionPointsContainer}>
                <div className={styles.action}>{item.action}</div>
                <div className={styles.pointsContainer}>
                  <div className={`${styles.points} ${item.points > 0 ? styles.positive : styles.negative}`}>
                    {item.points > 0 ? '+' : ''}{item.points} 포인트
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
