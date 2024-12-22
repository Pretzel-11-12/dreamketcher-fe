import type { NextConfig } from 'next';

const withSvgr = require('next-svgr');

const nextConfig: NextConfig = {
  reactStrictMode: true, // React의 엄격 모드 활성화
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 클라이언트가 요청하는 경로
        destination: 'http://43.200.18.88:8080/api/:path*', // 프록시할 백엔드 경로
      }, //~~~~43.200.18.88:8080/api/v1/~~~~
    ];
  },
};

module.exports = withSvgr(nextConfig);
