import React from 'react';
import Link from 'next/link'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const MypageUserButton = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-zinc-300 rounded-lg p-5 mt-6 w-11/12 shadow-custom-lg">
        <div className="flex justify-between">
          <Link href="/profile" className="flex flex-col items-center text-sm text-gray-800">
            <i className="bi bi-person text-2xl mb-1 text-mainDarkGreen"></i>
            내 정보
          </Link>
          <Link href="/cards" className="flex flex-col items-center text-sm text-gray-800">
            <i className="bi bi-credit-card text-2xl mb-1 text-mainDarkGreen"></i>
            등록된 카드
          </Link>
          <Link href="/archive" className="flex flex-col items-center text-sm text-gray-800">
            <i className="bi bi-archive text-2xl mb-1 text-mainDarkGreen"></i>
            보관함
          </Link>
          <Link href="/qna" className="flex flex-col items-center text-sm text-gray-800">
            <i className="bi bi-question-circle text-2xl mb-1 text-mainDarkGreen"></i>
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MypageUserButton;
