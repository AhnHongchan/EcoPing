import axios from "axios";
import Cookies from "js-cookie";
import { handleLogout, refreshTokenIfNeeded } from "../services/auth-service";
import useAuthStore from "@/app/store/use-auth-store";


// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshTokenIfNeeded(); // 토큰 재발급 시도
        return instance(originalRequest);
      } catch (refreshError) {
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
