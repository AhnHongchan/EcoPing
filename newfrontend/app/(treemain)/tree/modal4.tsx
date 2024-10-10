'use client';

import React, { useEffect, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  treeNum: number | null; 
}

const Modal4 = ({ onClose, treeNum }: ModalProps) => {

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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded flex flex-col items-center w-80 text-center"  
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-bold  mt-6">축하합니다.</h2>
        <h2 className="text-xl font-bold mb-4">새로운 나무를 발견했습니다. </h2>
        
        <div className="flex flex-col items-center mb-4 mt-6">
          <img 
            src={`./assets/tree-${treeNum}.png`} 
            alt={`Tree ${treeNum}`}
            className="w-52 h-52 rounded-full"
          />
          {treeNum && <p className="mt-2 text-lg">{treeNames[treeNum - 1]}</p>} 
        </div>
        
        <button 
          onClick={onClose} 
          className="px-4 py-2 mt-6 mb-8 bg-lightWalnutBrown text-white rounded hover:bg-hoverlightWalnutBrown focus:outline-none"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal4;
