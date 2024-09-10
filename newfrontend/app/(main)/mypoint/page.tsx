"use client";

import React, { useState } from "react";
import FilterPopup from "@/components/mypage-component/mypage-filterpopup";
import PointHistory from "@/components/mypage-component/mypage-pointhistory";
import styles from "./MyPoint.module.css";
import MypagePoint from "@/components/mypage-component/mypage-point";

interface Filter {
  period: string;
  category: string;
  sort: string;
}

const MyPoint = () => {
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({
    period: "1개월",
    category: "전체",
    sort: "최신",
  });

  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const applyFilter = (newFilter: Filter) => {
    setFilter(newFilter);
    setShowFilterPopup(false);
  };

  return (
    <div className={styles.fullBackGroundColor}>
      <div className={styles.myPage}>
        <div className={styles.header}>
          <div className={styles.headerTop}>마이페이지</div>
          <MypagePoint showHistoryButton={false} />
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
