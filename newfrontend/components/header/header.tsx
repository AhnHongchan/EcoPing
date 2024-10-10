'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Cookies from 'js-cookie';

import { BiMenu, BiSolidHome, BiLogIn, BiX, BiSolidUserCircle, BiWon, BiLineChart, BiSolidParty, BiCalendarCheck, BiSolidTree, BiSolidSchool, BiSolidDollarCircle } from "react-icons/bi";

// 메뉴 항목 데이터를 정의
const menuItems = [
  { href: "/dashboard", icon: BiSolidHome, text: "홈 화면" },
  { href: "/mypage", icon: BiSolidUserCircle, text: "내 정보" },
  { href: "/mypoint", icon: BiWon, text: "내 포인트" },
  { href: "/analysis", icon: BiLineChart, text: "나의 에코 소비 분석" },
  { href: "/campaignList", icon: BiSolidParty, text: "친환경 캠페인 보기" },
  { href: "/calendar", icon: BiCalendarCheck, text: "출석체크 하기" },
  { href: "/tree", icon: BiSolidTree, text: "나무 키우기" },
  // { href: "/todayquiz", icon: BiSolidSchool, text: "오늘의 퀴즈" },
  { href: "/invest", icon: BiSolidDollarCircle, text: "모의 투자"}
];

interface MenuItemProps {
  href: string;
  icon: React.ElementType;
  text: string;
  onClick: () => void;
}

const MenuItem = ({ href, icon: Icon, text, onClick }: MenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    onClick();
    router.push(href); // 페이지 이동
  };

  return (
    <div className={`flex items-center space-x-2 cursor-pointer hover:text-loginLightGreen`} onClick={handleClick}>
      <Icon className={`text-2xl`} />
      <span>{text}</span>
    </div>
  );
};

const Header = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter(); // router 변수를 정의

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleLogout = ()=> {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    router.push('/');
  };

  return (
    <div className="relative">
      <div className="relative">
        <BiMenu
          onClick={toggleMenu}
          className="absolute top-4 left-4 text-gray-700 text-3xl cursor-pointer z-50"
        />
          <BiLogIn onClick = {handleLogout} className="absolute top-4 right-4 text-gray-700 text-3xl cursor-pointer z-50 mr-2"/>
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto scrollbar-hide`}
      >
        <div className="flex items-center justify-between p-4 border-b ">
          <h2 className="text-xl font-bold">Menu</h2>
          <BiX onClick={toggleMenu} className="text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.text}
              onClick={toggleMenu}
            />
          ))}
        </div>
      </div>

      {showMenu && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleMenu}></div>}
    </div>
  );
};

export default Header;
