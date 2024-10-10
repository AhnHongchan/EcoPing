import React from 'react';
import Link from 'next/link'; 

import {BiUser, BiCreditCard, BiArchive, BiHelpCircle   } from "react-icons/bi";

const MypageUserButton = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white  rounded-lg p-5 mt-6 w-11/12 shadow-custom-lg">
        <div className="flex justify-evenly items-center">
          {/* <Link href="/profile" className="flex flex-col items-center text-sm text-gray-800">
          <BiUser className="mb-2 text-mainDarkGreen" size={24}/>
            내 정보
          </Link> */}
          <Link href="/cards" className="flex flex-col items-center text-sm text-gray-800">
          <BiCreditCard className="mb-2 text-mainDarkGreen" size={24}/>
            등록된 카드
          </Link>
          <Link href="/archive" className="flex flex-col items-center text-sm text-gray-800">
          <BiArchive className="mb-2 text-mainDarkGreen" size={24}/>
            보관함
          </Link>
          <Link href="/qna" className="flex flex-col items-center text-sm text-gray-800">
          <BiHelpCircle className="mb-2 text-mainDarkGreen" size={24}/>
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MypageUserButton;
