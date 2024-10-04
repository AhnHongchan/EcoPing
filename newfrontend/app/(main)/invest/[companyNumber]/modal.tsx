import React, { useState } from 'react';
import FinalModal from './final-modal';

interface StockDetailData {
  stockId: string;
  stockName: string;
  currentPrice: number;
  priceDifference: string;
  rateDifference: number;
  min52: number;
  max52: number;
  Isinterested: boolean;
  envPoint: string;
  recommendRank: number;
  hold: number;
}

interface ModalProps {
  onClose: () => void;
  stockData: StockDetailData;
}

const Modal = ({ onClose, stockData }: ModalProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => prev - 1);
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  // 포인트 계산
  const totalPoints = stockData.currentPrice * quantity / 100;
  const formattedPoints = totalPoints.toLocaleString();

  const handleFinalModal = () => {
    setIsFinalModalOpen(true);
  }


  const closeFianlModal = () => {
    setIsFinalModalOpen(false);
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
      onClick={onClose}
    >
      <div 
        className="bg-loginLightGreen p-4 rounded" 
        onClick={handleContentClick}
      >
        <p className='text-center mb-2'>거래하기</p>
        <p className='text-center'>거래 주식 수</p>
        <br />
        <div className='flex gap-4'>
          <button className='bg-green-500 w-6 shadow-md rounded-md' onClick={handleDecrease}>-</button>
          <input 
            className='rounded-md w-24 text-center appearance-none' 
            type="text"
            value={quantity}
            onChange={handleChange}
          />
          <button className='bg-green-500 w-6 shadow-md rounded-md' onClick={handleIncrease}>+</button>
        </div>
        <div>
          {quantity !== 0 && (
            <div>
              <p>{quantity > 0 ? '필요 포인트:' : '획득 포인트:'}</p>
              <p>{quantity > 0 ? formattedPoints : Math.abs(totalPoints).toLocaleString()}</p>
            </div>
          )}
          <div>
            <p>포인트 총액:</p>
            <p>현재 포인트 - {formattedPoints}</p>
          </div>
        </div>
        <br />
        <div className='flex gap-4 justify-center'>
          <button onClick={handleFinalModal} className="mt-2 p-2 bg-green-500 text-white rounded-md text-sm">확인</button>
          <button onClick={onClose} className="mt-2 p-2 bg-red-500 text-white rounded-md text-sm">닫기</button>        
        </div>
      </div>
      {isFinalModalOpen && <FinalModal onClose={closeFianlModal} stockData={stockData}/>}
    </div>
  );
};

export default Modal;
