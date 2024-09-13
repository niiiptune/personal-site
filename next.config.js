/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com'],
  },
  env: {
    IMGUR_ALBUM_HASH: process.env.IMGUR_ALBUM_HASH,
    IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
  },
}

module.exports = nextConfig