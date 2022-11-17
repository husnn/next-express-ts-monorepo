/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ['@app/shared']
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
