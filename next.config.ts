import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

const withSvgr = require('next-svgr');

module.exports = withSvgr({
  reactStrictMode: true,
});

export default nextConfig;
