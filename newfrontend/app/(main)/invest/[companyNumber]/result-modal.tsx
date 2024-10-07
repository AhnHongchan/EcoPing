'use client';

import { useRouter } from 'next/navigation';
import StockDetailData from '@/app/types/stock-detail';

interface ModalProps {
  onClose: () => void;
  stockData: StockDetailData;
}

const ResultModal = ({ onClose, stockData }: ModalProps) => {
  const router = useRouter();

  const handleResult = () => {
    router.push('/invest');
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded" onClick={(e) => e.stopPropagation()}>
        <p>거래가 체결되었습니다!</p>
        <button onClick={handleResult}>확인</button>
      </div>
    </div>
  );
}

export default ResultModal;
