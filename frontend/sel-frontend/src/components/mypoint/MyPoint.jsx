"use client";
import React, { useState } from "react";
import FilterPopup from "./PointFilterPop";
import PointHistory from "./PointHistory";
import styles from "./MyPoint.module.css";
import MyPointHeader from "./MyPointHeader";

const MyPoint = () => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filter, setFilter] = useState({
    period: "1개월",
    category: "전체",
    sort: "최신",
  });

  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const applyFilter = (newFilter) => {
    setFilter(newFilter);
    setShowFilterPopup(false);
  };

  return (
    <div className={styles.fullBackGroundColor}>
      <div className={styles.myPage}>
        <div className={styles.header}>
          <div className={styles.headerTop}>마이페이지</div>
          <MyPointHeader />
        </div>

        <div className={styles.filterSection}>
          <button onClick={toggleFilterPopup} className={styles.filterButton}>
            {`${filter.period} · ${filter.category} · ${filter.sort}`}
          </button>
        </div>

        <div className={styles.pointHistory}>
          <PointHistory filter={filter} />
        </div>

        {showFilterPopup && (
          <FilterPopup
            currentFilter={filter}
            onApply={applyFilter}
            onClose={toggleFilterPopup}
          />
        )}
      </div>
    </div>
  );
};

export default MyPoint;
