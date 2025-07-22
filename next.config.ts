import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['www.pexels.com', 'images.pexels.com','res.cloudinary.com', 'via.placeholder.com']
  }
}

export default nextConfig
