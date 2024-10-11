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
      </div>
    );
  }
  return <>{children}</>;
};

export default ClientLayout;
