import type { NextConfig } from 'next'

const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://demo.lumocomm.com'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${storeUrl}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
