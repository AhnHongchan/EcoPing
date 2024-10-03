'use client';

import React, { useState, Suspense } from "react";

import MypageFilterPopup from "@/components/mypage-component/mypage-filterpopup";
import PointHistory from "@/components/mypage-component/mypage-pointhistory";
import MypagePoint from "@/components/mypage-component/mypage-point";

import dayjs from 'dayjs';
import {BiChevronDown    } from "react-icons/bi";
import 'bootstrap-icons/font/bootstrap-icons.css';

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

  const currentDate = dayjs(); 
  const periodValue = parseInt(filter.period.replace('개월', ''), 10); 
  const pastDate = currentDate.subtract(periodValue, 'month').format('YYYY-MM-DD'); 
  const formattedCurrentDate = currentDate.format('YYYY-MM-DD'); 

  return (
    <div>
      <div className="header">
        <div className="headerTop">마이페이지</div>
      </div>
      <MypagePoint showHistoryButton={false} />
        <div>

          <div className="mt-12 justify-end text-right">
            <button onClick={toggleFilterPopup} className="filterButton flex items-center justify-end w-full">
              {`${filter.period} · ${filter.category} · ${filter.sort}`} <BiChevronDown />
            </button>
          </div>

          <div className="flex justify-center">
            <p className="w-[calc(98%-20px)]  mt-3 text-sm pb-2 border-b border-gray-300">{`${pastDate} ~ ${formattedCurrentDate}`}</p> 
          </div>

          <Suspense fallback={<div>Loading...</div>}>
          <div className="mt-2">
            <PointHistory filter={filter} />
          </div>
          </Suspense>

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
