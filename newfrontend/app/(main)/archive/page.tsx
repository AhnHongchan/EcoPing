import React from "react";
import Link from 'next/link';
import { BiChevronLeft } from "react-icons/bi";

const Archive = () => {
  return (
    <div className="p-6">
      <Link href="/mypage" className="flex items-center text-gray-700 mb-6">
        <BiChevronLeft className="w-6 h-6" />
        <span className="ml-2 text-lg font-semibold">뒤로가기</span>
      </Link>

      <div className="flex flex-col gap-6 ">
        <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
          <img src="./assets/빵.jpg" alt="빵" className="w-full h-[600px] object-cover" />
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
          <img src="./assets/커피.jpg" alt="커피" className="w-full h-[600px] object-cover" />
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
          <img src="./assets/간식.jpg" alt="간식" className="w-full h-[600px] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Archive;
