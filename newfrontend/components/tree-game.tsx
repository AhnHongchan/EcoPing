import React from 'react';
import Link from 'next/link';

const TreeGame = ():JSX.Element => (
  <div>
    <div className="mb-4">
      <p className="text-black pl-1 pb-4 font-bold text-3xl">포인트 사용</p>
    </div>
    <div className="flex justify-between items-center mb-8 bg-loginLightGreen shadow-lg p-4 rounded-lg text-center">
      <div className="flex flex-col items-center">
        <p className="text-2xl w-40 text-black font-semibold mb-2 text-center">
          나무 키우기
        </p>
        <Link href="/tree">
          <button className="bg-mainDarkGreen text-white py-2 px-4 shadow-lg rounded-md font-bold mt-2">
            게임 바로가기
          </button>
        </Link>
      </div>
      <img className="h-40 w-40 object-cover" src="/assets/treetree.png" alt="Tree Image" />
    </div>
  </div>
);

export default TreeGame;
