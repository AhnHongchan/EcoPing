import type { Metadata } from "next";
import "../../styles/globals.css";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";

// 메타데이터 설정
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <div className="bg-white min-h-screen relative min-w-max">
          <div className="absolute top-0 left-0 w-full h-16 bg-green-400 z-1"></div>
          <div className="relative z-10">
            <Header />
            <main className="px-4 pt-24 mx-auto w-11/12 max-w-[400px]">{children}</main>
            <Navbar />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
