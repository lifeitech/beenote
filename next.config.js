/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {appDir: true},
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**',
      },
      {
        protocol: 'https',
        hostname: 'beenote.fly.dev',
        port: '',
        pathname: '/api/files/**',
      },
    ],
  },
}

module.exports = nextConfig
