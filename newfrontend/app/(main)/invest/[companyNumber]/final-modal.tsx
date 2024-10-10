import { useState } from "react";
import ResultModal from "./result-modal";
import StockDetailData from "@/app/types/stock-detail";

interface ModalProps {
  onClose: () => void;
  stockData: StockDetailData;
  onConfirm: () => Promise<void>;
  quantity: number;
  totalPoints: number;
  myPoint: number;
}


const FinalModal = ({onClose, stockData, onConfirm, quantity, totalPoints, myPoint }: ModalProps) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleResultModal = async () => {
    try {
      // 거래 요청 실행
      await onConfirm();
      
      // 거래 성공 시 결과 모달 열기
      setIsResultModalOpen(true);
    } catch (error) {
    }
  };
  
  return (
  <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
  onClick={onClose}
  >
    <div className="bg-green-50 px-6 py-4 rounded" onClick={(e) => e.stopPropagation()}>
      <p className="text-center mb-2">아래 거래 내용이 맞습니까?</p>
      <p className="">거래 주식수: {quantity}</p>
      <p className="">{quantity > 0 ? '필요 포인트' : '획득 포인트'}: {Math.abs(totalPoints).toLocaleString()} 포인트</p>
      <p className="mb-5">포인트 총액: {(myPoint - totalPoints).toLocaleString()} 포인트</p>

      <div className="flex gap-4 justify-center">
        <button className="bg-green-500 px-4 py-2 rounded text-white font-bold" onClick={handleResultModal}>예</button>
        <button className="bg-red-500 px-4 py-2 rounded text-white font-bold" onClick={onClose}>아니오</button>
      </div>

    </div>
    {isResultModalOpen && <ResultModal onClose={onClose} stockData={stockData} />}
  </div>
  )
}

export default FinalModal;