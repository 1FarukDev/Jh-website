import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['www.pexels.com', 'images.pexels.com','res.cloudinary.com', 'via.placeholder.com', 'nrzyuthynauicapsfgdz.supabase.co']
  }
}

export default nextConfig
