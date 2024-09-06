// services/authService.ts
import Cookies from 'js-cookie';
import instance from '../lib/axios';

export const handleLogout = () => {
  Cookies.remove('access-token');
  Cookies.remove('refresh-token');
  window.location.href = '/'; // 홈 페이지로 리디렉션
};

export const refreshTokenIfNeeded = async () => {
  const refreshToken = Cookies.get('refresh-token');
  if (refreshToken) {
    try {
      const response = await instance.post('/members', {
        refreshToken: refreshToken,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

      Cookies.set('access-token', newAccessToken);
      Cookies.set('refresh-token', newRefreshToken);

      instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      throw new Error('토큰 재발급 실패');
    }
  } else {
    throw new Error('리프레시 토큰 없음');
  }
};
