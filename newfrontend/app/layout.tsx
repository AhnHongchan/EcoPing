import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-white min-h-screen relative">
        {/* 헤더나 기타 공통 요소가 필요하다면 여기에 추가 */}
        <div className="absolute top-0 left-0 w-full h-16 bg-green-400 z-1"></div>
        <div className="relative z-10">
          <Header />
          <main className="px-4 pt-24 mx-auto w-11/12 max-w-[400px]">{children}</main>
          <Navbar />
        </div>
      </body>
    </html>
  );
}


export default RootLayout;