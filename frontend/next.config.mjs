/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['127.0.0.1', 'api.maxforcedev.com.br', 'maxforcedev.com.br'],
  },
}

export default nextConfig
