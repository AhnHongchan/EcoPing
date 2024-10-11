// components/navbar/Navbar.ts
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BiSolidHome, BiHome, BiSolidBarChartAlt2, BiBarChartAlt2, BiJoystick, BiSolidJoystick, BiUser, BiSolidUser } from 'react-icons/bi';


interface NavItemProps {
  href: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  isActive: boolean;
}

const NavItem = ({ href, activeIcon, inactiveIcon, isActive }: NavItemProps) => {
  return (
    <Link href={href} className="p-2">
      {isActive ? activeIcon : inactiveIcon}
    </Link>
  );
};

const Navbar = (): JSX.Element => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", activeIcon: <BiSolidHome className="text-black text-2xl" />, inactiveIcon: <BiHome className="text-gray-500 text-2xl" /> },
    { href: "/analysis", activeIcon: <BiSolidBarChartAlt2 className="text-black text-2xl" />, inactiveIcon: <BiBarChartAlt2 className="text-gray-500 text-2xl" /> },
    { href: "/tree", activeIcon: <BiSolidJoystick className="text-black text-2xl" />, inactiveIcon: <BiJoystick className="text-gray-500 text-2xl" /> },
    { href: "/mypage", activeIcon: <BiSolidUser className="text-black text-2xl" />, inactiveIcon: <BiUser className="text-gray-500 text-2xl" /> },
  ];

  return (
    <header className="fixed bottom-0 w-full bg-loginLightGreen flex justify-around items-center h-16 border-t">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          activeIcon={item.activeIcon}
          inactiveIcon={item.inactiveIcon}
          isActive={pathname === item.href}
        />
      ))}
    </header>
  );
};

export default Navbar;
