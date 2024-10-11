'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import instance from "@/lib/axios";

interface MypagePointProps {
  showHistoryButton?: boolean;
}

const MypagePoint = ({ showHistoryButton = true }: MypagePointProps) => {
  const router = useRouter();

  const [points, setPoints] = useState<number | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchPoint = async () => {
    try {
      const response = await instance.get(`/points/mypoint`, {

      });
      setPoints(response.data); 
    } catch (error) {
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
        <div className="spinner border-t-4 border-loginDarkGreen w-8 h-8 rounded-full animate-spin mt-20 mb-20"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="mt-4 shadow-custom-lg rounded-lg p-5 w-11/12 flex flex-col items-start">
        <div className="w-full text-left">
          <div className="mb-5">
            <p className="text-gray-500 text-sm mb-2">총 사용 가능 포인트</p>
            <p className="text-lightWalnutBrown text-2xl font-bold">
              {points !== null ? `${points.toLocaleString()} 포인트` : ''}
            </p>
          </div>
          <div className="flex justify-center gap-3 w-full">
            {showHistoryButton && (
              <button 
                className="bg-white text-mainDarkGreen border border-mainDarkGreen px-5 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-mainDarkGreen hover:text-white"
                onClick={handleViewPoints}
              >
                내역보기
              </button>
            )}
            <button 
              className="bg-white text-mainDarkGreen border border-mainDarkGreen px-5 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-mainDarkGreen hover:text-white"
              onClick={handleUsePoints}
            >
              사용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypagePoint;
