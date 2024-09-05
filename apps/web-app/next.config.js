/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@starter/shared'],
  basePath: '/drivers',
  assetPrefix: '/drivers'
};

module.exports = nextConfig;
