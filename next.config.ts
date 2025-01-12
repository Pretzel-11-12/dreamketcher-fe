import type { NextConfig } from 'next';

const withSvgr = require('next-svgr');

const nextConfig: NextConfig = {
  reactStrictMode: true, // React의 엄격 모드 활성화
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's3.ap-northeast-2.amazonaws.com',
      'example.com',
    ], // 이미지 도메인 추가
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 클라이언트가 요청하는 경로
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`, // 프록시할 백엔드 경로
      },
    ];
  },
};

module.exports = withSvgr(nextConfig);
