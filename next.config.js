/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,
  experimental: {
    swcLoader: true,
  },
  styledComponents: true,
}

module.exports = nextConfig
