'use client';

import React, { useState, useEffect } from 'react';
import styles from './mypage-filterpopup.module.css';

interface Filter {
  period: string;
  category: string;
  sort: string;
}

interface MypageFilterPopupProps {
  currentFilter: Filter;
  onApply: (newFilter: Filter) => void;
  onClose: () => void;
}

const MypageFilterPopup = ({ currentFilter, onApply, onClose }: MypageFilterPopupProps) => {
  const [localFilter, setLocalFilter] = useState<Filter>(currentFilter);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customPeriod, setCustomPeriod] = useState<string>(''); 
  const [isPeriodValid, setIsPeriodValid] = useState(true); 
  const [applyAfterChange, setApplyAfterChange] = useState(false); 

  const handleChange = (key: keyof Filter, value: string) => {
    setLocalFilter({ ...localFilter, [key]: value });
  };

  const handleApply = () => {
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

  useEffect(() => {
    if (applyAfterChange) {
      onApply(localFilter);
      setApplyAfterChange(false);
    }
  }, [localFilter, applyAfterChange, onApply]);

  return (
    <div className={styles.overlay}>
      <div className={styles.filterPopup}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>
            X
          </button>
          <h2>조회 조건 선택</h2>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.filterBox}>
          <div className={styles.filterSection}>
            <h3>조회기간</h3>
            <div className={styles.filterButtons}>
              {['1개월', '3개월', '6개월'].map((period) => (
                <button
                  key={period}
                  className={`${styles.filterButton} ${
                    localFilter.period === period && !isCustomInput ? styles.active : ''
                  }`}
                  onClick={() => {
                    handleChange('period', period);
                    setIsCustomInput(false); 
                  }}
                >
                  {period}
                </button>
              ))}
              <button
                className={`${styles.filterButton} ${isCustomInput ? styles.active : ''}`}
                onClick={() => setIsCustomInput(true)} 
              >
                직접입력
              </button>
              {isCustomInput && (
                <>
                  <input
                    type="number"
                    value={customPeriod}
                    onChange={(e) => {
                      setCustomPeriod(e.target.value);
                      validatePeriod(e.target.value);
                    }}
                    placeholder="개월 입력"
                    className={styles.customInput}
                  />
                  {!isPeriodValid && (
                    <p className={styles.errorMessage}>1년 이하만 조회 가능합니다</p> 
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>거래구분</h3>
            <div className={styles.filterButtons}>
              {['전체', '적립', '사용'].map((category) => (
                <button
                  key={category}
                  className={`${styles.filterButton} ${
                    localFilter.category === category ? styles.active : ''
                  }`}
                  onClick={() => handleChange('category', category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>조회기준</h3>
            <div className={styles.filterButtons}>
              {['최신순', '과거순'].map((sort) => (
                <button
                  key={sort}
                  className={`${styles.filterButton} ${
                    localFilter.sort === sort ? styles.active : ''
                  }`}
                  onClick={() => handleChange('sort', sort)}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.applyBtn}
            onClick={handleApply}
            disabled={!isPeriodValid}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default MypageFilterPopup;
