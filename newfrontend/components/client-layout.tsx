"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const publicRoutes = ["/", "/account"];

    if (!accessToken && !publicRoutes.includes(pathname)) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="font-bold text-2xl text-red-500">
          비로그인 시 접근 불가능합니다
        </p>
      </div>
    );
  }
  return <>{children}</>;
};

export default ClientLayout;
