// lib/axios.ts
import axios from 'axios';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경 변수에서 API 기본 URL을 가져오거나 기본값 사용
  timeout: 10000, // 요청 시간 초과 시간 설정 (예: 10초)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 작업
    const token = localStorage.getItem('token'); // 예: 토큰을 로컬 스토리지에서 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 발생했을 때 수행할 작업
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response, // 응답 데이터를 그대로 반환
  (error) => {
    // 응답 오류가 발생했을 때 수행할 작업
    if (error.response && error.response.status === 401) {
      // 예: 인증 오류가 발생한 경우 처리
      console.error('Unauthorized - Redirect to login');
    }
    return Promise.reject(error);
  }
);

export default instance;
