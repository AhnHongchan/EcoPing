import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  compiler: {
    removeConsole: true, // 모든 console 메시지를 제거
  },
};

export default {
  ...pwaConfig,
  ...nextConfig,
};