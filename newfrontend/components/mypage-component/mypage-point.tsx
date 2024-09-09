'use client';


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './mypage-point.module.css';
import instance from "@/lib/axios";


const MyPointHeader = () => {
  const router = useRouter();
  const dummyUser: number = 1;  

  const [points, setPoints] = useState<number>(0); 

  const fetchPoint = async () => {
    try {
      const response = await instance.get(`/points/mypoint`, {
        headers: {
          userId: dummyUser, 
        },
      });
      console.log(response);
      setPoints(response.data.totalPoints); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoint();
  }, []);

//   const handleViewPoints = () => {
//     router.push('/mypoint', { query: { total: points } }); 
//   };

//   const handleUsePoints = () => {
//     router.push('/');
//   };

  return (
    <div className={styles.allcontainer}>
        {points}
      {/* <div className={styles.headerBottom}>
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
      </div> */}
    </div>
  );
};

export default MyPointHeader;
