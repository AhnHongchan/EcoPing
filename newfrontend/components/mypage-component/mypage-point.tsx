'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './mypage-point.module.css';
import instance from "@/lib/axios";

interface MypagePointProps {
  showHistoryButton?: boolean; // 버튼 표시 여부를 위한 props
}

const MypagePoint = ({ showHistoryButton = true }: MypagePointProps) => {
  const router = useRouter();
  const dummyUser: number = 1;  

  const [points, setPoints] = useState<number | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchPoint = async () => {
    try {
      const response = await instance.get(`/points/mypoint`, {
        headers: {
          userId: dummyUser, 
        },
      });
      setPoints(response.data); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };    

  useEffect(() => {
    fetchPoint();
  }, []);

  const handleViewPoints = () => {
    router.push('/mypoint'); 
  };

  const handleUsePoints = () => {
    router.push('/dashboard');
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={styles.allcontainer}>
      <div className={styles.headerBottom}>
        <div className={styles.userInfoBox}>
          <div className={styles.pointInfo}>
            <p className={styles.pointLabel}>총 사용 가능 포인트</p>
            <p className={styles.pointAmount}>
              {points !== null ? `${points.toLocaleString()} 포인트` : ''}
            </p>
          </div>
          <div className={styles.buttonGroup}>
          {showHistoryButton && (
              <button className={styles.historyButton} onClick={handleViewPoints}>
                내역보기
              </button>
            )}
            <button className={styles.chargeButton} onClick={handleUsePoints}>사용하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypagePoint;
