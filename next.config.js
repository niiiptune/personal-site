/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-site' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/personal-site' : '',
}

module.exports = nextConfig