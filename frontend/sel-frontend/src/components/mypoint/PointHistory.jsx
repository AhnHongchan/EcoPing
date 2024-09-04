import React, { useEffect, useState } from 'react';
import styles from './PointHistory.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PointHistory = ({ filter }) => {
  // 최종 포인트를 주어진 값으로 설정합니다.
  const dummyUser = 1; // 유저 ID를 설정
  const location = useLocation();
  const { total: finalTotalFromState } = location.state || {};
  const finalTotal = finalTotalFromState || 0; // 기본값을 설정
  const [pointData, setPointData] = useState([]); // API 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // 데이터 fetching 함수
  const fetchPointHistory = async () => {
    try {
      const response = await axios.get(`/api/points-history/info`, {
        headers: {
          'Content-Type': 'application/json',
          userId: dummyUser, // 헤더에 유저 ID 추가
        },
      });
      console.log(response.data);

      const data = response.data;
      setPointData(data.PointHistory); // API에서 받은 데이터 설정
    } catch (error) {
      setError(error.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 false로 설정
    }
  };

  // 컴포넌트가 마운트될 때 데이터 fetching 실행
  useEffect(() => {
    fetchPointHistory();
  }, []);

  // 날짜별로 데이터를 정렬합니다 (최신 날짜 순).
  const sortedData = [...pointData].sort(
    (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
  );

  // 포인트를 역산하여 각 항목의 `total`을 계산합니다.
  const calculateTotals = (data) => {
    let currentTotal = finalTotal;
    return data.map((item) => {
      const newTotal = currentTotal;

      // createdTime이 있는지 확인하고, 없으면 기본값으로 설정합니다.
      if (!item.createdTime) {
        console.warn('Invalid createdTime:', item); // 잘못된 데이터 경고
        return {
          date: 'Invalid Date',
          time: 'Invalid Time',
          action: item.description || 'Unknown Action',
          points: item.operation === 'EARN' ? item.amount : -item.amount,
          total: newTotal,
        };
      }

      const [date, time] = item.createdTime.split('T'); // 'YYYY-MM-DD'와 'HH:MM:SS'로 분리
      const formattedDate = date ? date.replace(/-/g, '.') : 'Invalid Date'; // YYYY.MM.DD 형식으로 변환
      const formattedTime = time ? time.split('.')[0] : 'Invalid Time'; // HH:MM:SS 형식으로 변환

      currentTotal -= item.operation === 'EARN' ? item.amount : -item.amount; // EARN일 때 포인트 추가, SPEND일 때 포인트 차감
      return {
        date: formattedDate,
        time: formattedTime,
        action: item.description,
        points: item.operation === 'EARN' ? item.amount : -item.amount,
        total: newTotal,
      };
    });
  };

  const processedData = calculateTotals(sortedData);

  // 데이터를 날짜별로 그룹화합니다.
  const groupedData = processedData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  const dates = Object.keys(groupedData);

  if (loading) return <div>Loading...</div>;
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

export default PointHistory;
