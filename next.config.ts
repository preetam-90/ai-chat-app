import type { NextConfig } from 'next';
import path from 'node:path';

// Apply zod patch
require('./lib/zod-patch.js');

const nextConfig: NextConfig = {
  experimental: {
    // ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  webpack: (config) => {
    // Fix for zod/v4 missing exports issue
    config.resolve.alias = {
      ...config.resolve.alias,
      'zod/v4': path.resolve(__dirname, './lib/zod-patch.js'),
    };

    // Add fallback for node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
};

export default nextConfig;
