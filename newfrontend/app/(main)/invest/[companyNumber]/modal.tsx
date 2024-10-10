import React, { useEffect, useState } from 'react';
import FinalModal from './final-modal';
import instance from '@/lib/axios';
import StockDetailData from '@/app/types/stock-detail';
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose: () => void;
  stockData: StockDetailData;
}

const Modal = ({ onClose, stockData }: ModalProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [inputValue, setInputValue] = useState('0'); // 입력 필드를 위한 문자열 상태 추가
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
  const [myPoint, setMyPoint] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 문자열, '-', 또는 숫자 형식의 입력만 허용
    if (value === '' || value === '-' || /^-?[0-9]*$/.test(value)) {
      setInputValue(value);

      // 숫자로 변환 가능한 경우에만 `quantity` 업데이트
      if (value === '-' || value === '') {
        setQuantity(0); // '-' 또는 빈 문자열인 경우 `quantity`를 0으로 설정
      } else {
        setQuantity(parseInt(value, 10));
      }
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const totalPoints = stockData.currentPrice * quantity / 100;
  const formattedPoints = totalPoints.toLocaleString();

  const getMyPoint = async () => {
    const response = await instance.get('points/mypoint');

    const data = response.data;
    setMyPoint(data);
  };

  useEffect(() => {
    if (quantity > 0 && totalPoints > myPoint) {
      setErrorMessage('포인트를 초과하여 매수할 수 없습니다.');
    } else if (quantity < 0 && Math.abs(quantity) > stockData.hold) {
      setErrorMessage('보유량을 초과하여 매도할 수 없습니다.');
    } else if (quantity == 0) {
      setErrorMessage('거래량을 입력해주세요');
    } 
    else {
      setErrorMessage('');
    }
  }, [quantity, totalPoints, myPoint, stockData.hold]);

  const handleFinalModal = () => {
    if (errorMessage) return;
    
    // 최종 확인 모달 열기만 수행
    setIsFinalModalOpen(true);
  };

  const handleTransaction = async () => {
    const endpoint = quantity > 0 
      ? `transaction/stock/${stockData.companyNumber}/buy` 
      : `transaction/stock/${stockData.companyNumber}/sell`;
  
    try {
      const response = await instance.post(
        endpoint,
        {
          quantity: Math.abs(quantity),
          currentPrice: stockData.currentPrice / 100,
        },
        {}
      );
    } catch (error) {
      router.push('')
    }
  };

  useEffect(() => {
    getMyPoint();
  }, []);

  const closeFinalModal = () => {
    setIsFinalModalOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
      onClick={onClose}
    >
      <div 
        className="bg-loginLightGreen p-4 w-60 rounded" 
        onClick={handleContentClick}
      >
        <p className='text-center mb-1'>거래하기</p>
        <p className='text-center mb-2'>거래 주식 수</p>
        <div className='flex gap-4 justify-center mb-4'>
          <button className='bg-green-500 w-6 shadow-md rounded-md' onClick={handleDecrease}>-</button>
          <input 
            className='rounded-md w-24 text-center appearance-none' 
            type="text"
            value={inputValue} // `inputValue`로 입력 필드 관리
            onChange={handleChange}
          />
          <button className='bg-green-500 w-6 shadow-md rounded-md' onClick={handleIncrease}>+</button>
        </div>
        <div className='flex flex-col items-center justify-center text-center'>
          {quantity !== 0 && (
            <div className='mb-2'>
              <p>{quantity > 0 ? '필요 포인트' : '획득 포인트'}</p>
              <p>{quantity > 0 ? formattedPoints : Math.abs(totalPoints).toLocaleString()} 포인트</p>
            </div>
          )}
          <div>
            <p>포인트 총액 </p>
            <p>{(myPoint - totalPoints).toLocaleString()} 포인트</p>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}

        <div className='flex gap-4 justify-center mt-4'>
          <button 
            onClick={handleFinalModal} 
            className="p-2 bg-green-500 text-white rounded-md text-sm"
            disabled={!!errorMessage} // 에러 메시지가 있으면 비활성화
          >
            확인
          </button>
          <button onClick={onClose} className="p-2 bg-red-500 text-white rounded-md text-sm">닫기</button>        
        </div>
      </div>
      {isFinalModalOpen && <FinalModal 
      onClose={closeFinalModal} 
      stockData={stockData} 
      onConfirm={handleTransaction}
      quantity={quantity} 
      totalPoints={totalPoints}
      myPoint={myPoint}
      />}
    </div>
  );
};

export default Modal;
