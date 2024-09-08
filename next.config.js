/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.ts',
    domains: ['readwise-assets.s3.amazonaws.com'],
  },
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-site' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/personal-site' : '',
}

module.exports = nextConfig