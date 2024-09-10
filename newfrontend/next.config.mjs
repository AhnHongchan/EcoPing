import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  compiler: {
    removeConsole: false, // 모든 console 메시지를 제거
  },
};

export default {
  ...pwaConfig,
  ...nextConfig,
  reactStrictMode: false,
};