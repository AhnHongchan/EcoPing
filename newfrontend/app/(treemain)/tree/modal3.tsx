'use client';

import React, { useEffect, useState } from 'react';
import instance from "@/lib/axios";

// Badge 정보 인터페이스
interface BadgeInfo {
  id: number;
  type: number;
}

// 모달 속성 인터페이스
interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  const [badgeData, setBadgeData] = useState<BadgeInfo[]>([]);

  const treeNames = [
    "가시오갈피나무", 
    "개가시나무", 
    "무주나무", 
    "산분꽃나무", 
    "섬개야광나무", 
    "구상나무", 
    "섬국수나무", 
    "섬향나무", 
    "암매"
  ];

  useEffect(() => {
    // 모달이 열릴 때 API에서 데이터 가져오기
    const fetchBadgeData = async () => {
      try {
        const response = await instance.get<BadgeInfo[]>('/badge/info');
        setBadgeData(response.data);
      } catch (error) {
        console.error('Badge 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchBadgeData();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={onClose}
    >
      <div
        className="p-4 rounded flex flex-col items-center w-80 text-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: "url('./assets/emptypaper.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-xl font-bold mb-4 mt-6">도감</h2>
        
        <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
            const badge = badgeData.find((b) => b.type === num);
            const imgSrc = badge ? `./assets/tree-${num}.png` : './assets/question.jpg';
            const treeName = badge ? treeNames[num - 1] : "?";
            return (
              <div key={num} className="flex flex-col items-center">
                <img 
                  src={imgSrc} 
                  alt={`badge-${num}`} 
                  className="w-16 h-16 rounded-full"
                />
                <span className="mt-2 text-sm">{treeName}</span>
              </div>
            );
          })}
        </div>
        <button 
          onClick={onClose} 
         
          className="px-4 py-2 mb-8 bg-lightWalnutBrown text-white rounded hover:bg-hoverlightWalnutBrown focus:outline-none"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
