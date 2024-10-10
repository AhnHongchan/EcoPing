import React, { useState } from 'react';
import instance from "@/lib/axios";

interface ModalProps {
  onClose: () => void;
  onResetTree: () => void;
}

const Modal = ({ onClose, onResetTree }: ModalProps) => {
  const [selectedGift, setSelectedGift] = useState<string | null>(null); 

  const choiceGift = async (gift: string) => {
    try {
      const response = await instance.put(`/tree/gifticon`);
      console.log("Watering successful:", response.data);
      setSelectedGift(gift); 
    } catch (error) {
      onClose();
    }
  };

  const handleClose = () => {
    if (selectedGift) {
      onResetTree();
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" 
      onClick={handleClose} 
    >
      <div 
        className="bg-white p-4 rounded flex flex-col items-center w-80 justify-center   h-[535px]" 
        onClick={(e) => e.stopPropagation()} 
      >
        {selectedGift ? (
          <>
            <h2 className='text-2xl mt-8'>축하합니다!</h2>
            <img src={`./assets/${selectedGift}.jpg`} className='mt-8 w-40 m-8' alt={selectedGift} />
            <div className='flex gap-4 mb-4'>
              <a 
                className="mt-2 p-2 bg-loginDarkGreen text-white rounded-md text-sm" 
                href={`./assets/${selectedGift}.jpg`} 
                download={`${selectedGift}.jpg`} 
                onClick={onResetTree} 
              >
                저장하기
              </a>
              <button onClick={handleClose} className="mt-2 p-2 bg-gray-400 text-white rounded-md text-sm">
                닫기
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className='text-lg mt-8'>축하합니다! 나무가 다 자랐어요</h2>
            <img src="./assets/tree4.png" className='mt-8 w-40 h-40 m-8' alt="Tree" />
            <p className='text-2xl mt-4'>보상을 선택하세요</p>
            <div className='flex gap-6 justify-center m-8'>
              <button onClick={() => choiceGift("커피")} className="p-2 w-16 bg-loginDarkGreen text-white rounded-md text-sm">
                커피
              </button>
              <button onClick={() => choiceGift("간식")} className="p-2 w-16 bg-loginDarkGreen text-white rounded-md text-sm">
                간식
              </button>
              <button onClick={() => choiceGift("빵")} className="p-2 w-16 bg-loginDarkGreen text-white rounded-md text-sm">
                빵
              </button>
            </div>       
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
