/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com']
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  }
};

module.exports = nextConfig;