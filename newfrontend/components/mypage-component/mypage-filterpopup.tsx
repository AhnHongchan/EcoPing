'use client';

import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';

interface Filter {
  period: string;
  category: string;
  sort: string;
}

interface MypageFilterPopupProps {
  currentFilter: Filter;
  onApply: (newFilter: Filter) => void;
  onClose: () => void;
  isOpen: boolean; 
}

const MypageFilterPopup = ({ currentFilter, onApply, onClose, isOpen }: MypageFilterPopupProps) => {
  const [localFilter, setLocalFilter] = useState<Filter>(currentFilter);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customPeriod, setCustomPeriod] = useState<string>(''); 
  const [isPeriodValid, setIsPeriodValid] = useState(true); 
  const [applyAfterChange, setApplyAfterChange] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);

  const handleChange = (key: keyof Filter, value: string) => {
    setLocalFilter({ ...localFilter, [key]: value });
    if (key === 'period') {
      setIsPeriodValid(true); 
    }
  };

  const handleApply = () => {
    if (!isPeriodValid) {
      setShowInvalidMessage(true); 
      return;
    }

    if (isCustomInput && customPeriod) {
      handleChange('period', `${customPeriod}개월`);
      setApplyAfterChange(true); 
    } else {
      onApply(localFilter);
    }
  };

  const validatePeriod = (value: string) => {
    const periodNumber = parseInt(value, 10);
    if (!isNaN(periodNumber) && periodNumber >= 13) {
      setIsPeriodValid(false); 
    } else {
      setIsPeriodValid(true); 
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); 
  };

  useEffect(() => {
    if (applyAfterChange) {
      onApply(localFilter);
      setApplyAfterChange(false);
    }
  }, [localFilter, applyAfterChange, onApply]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={`bg-white rounded-t-lg p-5 w-full max-w-md mx-auto ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      contentLabel="Filter Modal"
      ariaHideApp={false} 
    >
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-bold">조회 조건 선택</h2>
      </div>
      <div className="border-t-2 border-gray-300 mt-2 mb-4"></div>
      
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">조회기간</h3>
        <div className="flex flex-wrap gap-2">
          {['1개월', '3개월', '6개월'].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 border rounded-lg ${localFilter.period === period && !isCustomInput ? 'border-lightWalnutBrown text-lightWalnutBrown' : 'border-gray-300 text-gray-600'}`}
              onClick={() => {
                handleChange('period', period);
                setIsCustomInput(false); 
                setCustomPeriod(''); 
              }}
            >
              {period}
            </button>
          ))}
          <button
            className={`px-4 py-2 border rounded-lg ${isCustomInput ? 'border-lightWalnutBrown text-lightWalnutBrown' : 'border-gray-300 text-gray-600'}`}
            onClick={() => {
              setIsCustomInput(true); 
              validatePeriod(customPeriod); 
            }} 
          >
            직접입력
          </button>
          {isCustomInput && (
            <div className="flex flex-col mt-2 w-full">
              <input
                type="number"
                value={customPeriod}
                onChange={(e) => {
                  setCustomPeriod(e.target.value);
                  validatePeriod(e.target.value);
                }}
                placeholder="개월 수 입력"
                className="px-4 py-2 border rounded-lg border-gray-300 text-gray-600"
              />
              {!isPeriodValid && (
                <p className={`text-red-600 text-sm mt-1 ${showInvalidMessage ? 'shake' : ''}`} onAnimationEnd={() => setShowInvalidMessage(false)}>
                  1년 이하만 조회 가능합니다
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">거래구분</h3>
        <div className="flex flex-wrap gap-2">
          {['전체', '적립', '사용'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 border rounded-lg ${localFilter.category === category ? 'border-lightWalnutBrown text-lightWalnutBrown' : 'border-gray-300 text-gray-600'}`}
              onClick={() => handleChange('category', category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-base font-semibold mb-2">조회기준</h3>
        <div className="flex flex-wrap gap-2">
          {['최신순', '과거순'].map((sort) => (
            <button
              key={sort}
              className={`px-4 py-2 border rounded-lg ${localFilter.sort === sort ? 'border-lightWalnutBrown text-lightWalnutBrown' : 'border-gray-300 text-gray-600'}`}
              onClick={() => handleChange('sort', sort)}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 w-1/4 text-sm" onClick={handleClose}>
          취소
        </button>
        <button
          className="bg-lightWalnutBrown text-white rounded-lg py-3 flex-1 text-sm"
          onClick={handleApply}
        >
          적용
        </button>
      </div>
    </Modal>
  );
};

export default MypageFilterPopup;
