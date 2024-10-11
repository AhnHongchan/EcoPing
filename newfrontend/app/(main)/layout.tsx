import type { Metadata } from "next";
import "../../styles/globals.css";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import ClientLayout from "@/components/client-layout";
import { useEffect } from "react";

// 메타데이터 설정
export const metadata: Metadata = {
  title: "EcoPing",
  description: "Eco-friendly financial App",
  icons: {
    icon: 'icons/icon.png'
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <ClientLayout>
      <div className="min-h-screen flex flex-col items-center relative">
        <div className="w-full h-16 bg-loginLightGreen z-20 fixed top-0 left-0">
            <Header />
        </div>
        <main className="px-4 py-24 w-[400px] mx-auto relative z-10 overflow-x-hidden">
          {children}
        </main>
        <div className="w-full fixed bottom-0 left-0 z-20">
          <Navbar />
        </div>
      </div>
    </ClientLayout>
  );
};

export default RootLayout;
