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
  const [customPeriod, setCustomPeriod] = useState<string>(''); // 사용자 입력값
  const [isPeriodValid, setIsPeriodValid] = useState(true); // 입력값 검증 상태
  const [applyAfterChange, setApplyAfterChange] = useState(false); // 상태 업데이트 후 적용하기 위한 상태

  const handleChange = (key: keyof Filter, value: string) => {
    setLocalFilter({ ...localFilter, [key]: value });
  };

  const handleApply = () => {
    if (isCustomInput && customPeriod) {
      handleChange('period', `${customPeriod}개월`);
      setApplyAfterChange(true); // 상태 업데이트 후 적용하도록 설정
    } else {
      onApply(localFilter);
    }
  };

  const validatePeriod = (value: string) => {
    const periodNumber = parseInt(value, 10);
    if (!isNaN(periodNumber) && periodNumber >= 13) {
      setIsPeriodValid(false); // 13개월 이상일 경우 경고
    } else {
      setIsPeriodValid(true); // 13개월 미만일 경우 유효
    }
  };

  useEffect(() => {
    if (applyAfterChange) {
      onApply(localFilter);
      setApplyAfterChange(false); // 적용 후 초기화
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
                    setIsCustomInput(false); // 기존 버튼을 클릭하면 직접입력 비활성화
                  }}
                >
                  {period}
                </button>
              ))}
              <button
                className={`${styles.filterButton} ${isCustomInput ? styles.active : ''}`}
                onClick={() => setIsCustomInput(true)} // 직접입력 활성화
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
                      validatePeriod(e.target.value); // 입력값 검증 함수 호출
                    }}
                    placeholder="개월 입력"
                    className={styles.customInput}
                  />
                  {!isPeriodValid && (
                    <p className={styles.errorMessage}>1년 이하만 조회 가능합니다</p> // 경고 메시지 표시
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
            disabled={!isPeriodValid} // 유효하지 않을 경우 비활성화
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default MypageFilterPopup;
