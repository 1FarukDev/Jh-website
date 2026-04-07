import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['www.pexels.com', 'images.pexels.com','res.cloudinary.com', 'via.placeholder.com', 'nrzyuthynauicapsfgdz.supabase.co']
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jh-website-lime.vercel.app' }],
        destination: 'https://jesudarahinmikaiye.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig