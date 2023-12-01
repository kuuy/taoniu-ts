/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH || '',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // output: 'export',
  distDir: 'dist'
}

module.exports = nextConfig
