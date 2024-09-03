"use client";
import React, { useState } from "react";
import styles from "./PointFilterPop.module.css";

const FilterPopup = ({ currentFilter, onApply, onClose }) => {
  const [localFilter, setLocalFilter] = useState(currentFilter);

  const handleChange = (key, value) => {
    setLocalFilter({ ...localFilter, [key]: value });
  };

  const handleApply = () => {
    onApply(localFilter);
  };

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
              {["1개월", "3개월", "6개월", "직접입력"].map((period) => (
                <button
                  key={period}
                  className={`${styles.filterButton} ${
                    localFilter.period === period ? styles.active : ""
                  }`}
                  onClick={() => handleChange("period", period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>거래구분</h3>
            <div className={styles.filterButtons}>
              {["전체", "적립", "사용"].map((category) => (
                <button
                  key={category}
                  className={`${styles.filterButton} ${
                    localFilter.category === category ? styles.active : ""
                  }`}
                  onClick={() => handleChange("category", category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>조회기준</h3>
            <div className={styles.filterButtons}>
              {["최신순", "과거순"].map((sort) => (
                <button
                  key={sort}
                  className={`${styles.filterButton} ${
                    localFilter.sort === sort ? styles.active : ""
                  }`}
                  onClick={() => handleChange("sort", sort)}
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
          <button className={styles.applyBtn} onClick={handleApply}>
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
