import { useState } from "react";
import ResultModal from "./result-modal";


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


const FinalModal = ({onClose, stockData}: ModalProps) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleResultModal = () => {
    setIsResultModalOpen(true);
  }
  
  return (
  <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
  onClick={onClose}
  >
    <div className="bg-white p-4 rounded" onClick={(e) => e.stopPropagation()}>
      <p>거래 내용 맞습니까?</p>
      <button onClick={handleResultModal}>예</button>
      <button onClick={onClose}>아니오</button>
    </div>
    {isResultModalOpen && <ResultModal onClose={onClose} stockData={stockData} />}
  </div>
  )
}

export default FinalModal;