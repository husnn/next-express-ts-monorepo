const { WEB_APP_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@starter/shared'],
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`
      },
      {
        source: '/app',
        destination: `${WEB_APP_URL}`
      }
    ];
  }
};

module.exports = nextConfig;
