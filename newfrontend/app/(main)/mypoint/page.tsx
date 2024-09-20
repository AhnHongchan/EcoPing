'use client';

import React, { useState } from "react";
import MypageFilterPopup from "@/components/mypage-component/mypage-filterpopup";
import PointHistory from "@/components/mypage-component/mypage-pointhistory";
import MypagePoint from "@/components/mypage-component/mypage-point";
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';

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
    sort: "최신순",
  });

  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const applyFilter = (newFilter: Filter) => {
    setFilter(newFilter);
    setShowFilterPopup(false);
  };

  const currentDate = dayjs(); // 현재 날짜
  const periodValue = parseInt(filter.period.replace('개월', ''), 10); // 필터의 기간 값 추출
  const pastDate = currentDate.subtract(periodValue, 'month').format('YYYY-MM-DD'); // 과거 날짜 계산
  const formattedCurrentDate = currentDate.format('YYYY-MM-DD'); // 현재 날짜 포맷팅

  return (
    <div>
      <div className="header">
        <div className="headerTop">마이페이지</div>
      </div>
      <MypagePoint showHistoryButton={false} />
        <div>

          <div className="mt-12 justify-end text-right">
            <button onClick={toggleFilterPopup} className="filterButton">
              {`${filter.period} · ${filter.category} · ${filter.sort}`} <i className="bi bi-chevron-down"></i>
            </button>
          </div>

          <div className="flex justify-center">
            <p className="w-[calc(98%-20px)]  mt-3 text-sm pb-2 border-b border-gray-300">{`${pastDate} ~ ${formattedCurrentDate}`}</p> 
          </div>

          <div className="mt-2">
            <PointHistory filter={filter} />
          </div>

          <MypageFilterPopup
            isOpen={showFilterPopup}
            currentFilter={filter}
            onApply={applyFilter}
            onClose={toggleFilterPopup}
          />
        </div>
    </div>
  );
};

export default MyPoint;
