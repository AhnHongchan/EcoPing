import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  const [pageNum, setPageNum] = useState(0); 

  const handleNext = () => {
    setPageNum((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPageNum((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" 
      onClick={onClose}
    >
      <div 
        className="bg-white p-4 rounded flex flex-col items-center w-80 text-center"  
        onClick={(e) => e.stopPropagation()} 
      >
        {pageNum === 0 && (
          <>
            <h2 className='text-2xl mt-8'>나무 키우기</h2>
            <p className='mt-4'>물을 주려면 500Pt가 필요해요.<br/>포인트를 모아 나무를 키워보세요.</p>
            <img src="./assets/choicewater.png" alt="Water Choice" className="w-60 mt-4  h-[270px] " />
            <button onClick={handleNext} className="mt-6 mb-4 p-2 bg-blue-500 text-white rounded">다음</button>
          </>
        )}
        {pageNum === 1 && (
          <>
             <h2 className='text-2xl mt-8'>도감 확인하기</h2>
             <p className='mt-4'>나무가 끝까지 성장하면 수집할 수 있고<br/> 수집한 나무는 도감에서 확인가능해요.</p>
            <img src="./assets/choicecollection.png" alt="Collection Choice" className="w-60 mt-4  h-[270px]" />
            <div className="flex gap-2 mt-6 mb-4">
              <button onClick={handlePrev} className="p-2 bg-gray-400 text-white rounded">이전</button>
              <button onClick={handleNext} className="p-2 bg-blue-500 text-white rounded">다음</button>
            </div>
          </>
        )}
        {pageNum === 2 && (
          <>
            <h2 className='text-2xl mt-8'>도감 속 나무</h2>
            <p className='mt-4'>성장하는 나무들은 멸종 위기종 나무예요.<br/>나무를 수집하면서 도감을 채워봐요.</p>
            <img src="./assets/examplecollection.png" alt="Example Collection" className="w-60 mt-4  h-[270px]" />
            <div className="flex gap-2 mt-6 mb-4">
              <button onClick={handlePrev} className="p-2 bg-gray-400 text-white rounded">이전</button>
              <button onClick={onClose} className="p-2 bg-red-500 text-white rounded">닫기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
