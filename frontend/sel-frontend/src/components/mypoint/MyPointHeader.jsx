'use client';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './MyPointHeader.module.css';
import axios from 'axios';

const MyPointHeader = () => {

  const navigate = useNavigate();
  // const points = 1251;
  const dummyUser = 1; // 유저 ID를 설정 (예시)
  const [points,setPoint] = useState([]); 

  const fetchPoint = async () => {
    try {
      const response = await axios.get(`/api/points/mypoint`, {
        headers: {
          'Content-Type': 'application/json',
          userId: dummyUser, // 헤더에 유저 ID 추가
        },
      });
      console.log(response.data);
      setPoint(response.data); // API에서 받은 데이터 설정
    } catch (error) {
      console.log(error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 fetching 실행
  useEffect(() => {
    fetchPoint();
  }, []);
  const handleViewPoints = () => {
    navigate('/mypoint', { state: { total: points } }); 
  };

  const handleUsePoints = () => {
    navigate('/');
  };
  return (
    <div className={styles.allcontainer}>
    <div className={styles.headerBottom}>
      <div className={styles.userInfoBox}>
      <div className={styles.pointInfo}>
        <p className={styles.pointLabel}>총 사용 가능 포인트</p>
        <p className={styles.pointAmount}>{points.toLocaleString()} 포인트</p>
      </div>
        <div className={styles.buttonGroup}>
          <button className={styles.historyButton} onClick={handleViewPoints}>내역보기</button>
          <button className={styles.chargeButton} onClick={handleUsePoints}>사용하기</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyPointHeader;
