import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },

  async redirects() {
    return [
      {
        source: '/:slug*.html',
        destination: '/:slug*',
        permanent: true,
      },

      // Blog posts whose slug was later renamed in the admin: keep old (indexed) URLs working
      {
        source: '/blogs/best-liver-surgery-specialist-in-bangalore',
        destination: '/blogs/liver-cancer-surgery-specialist-in-bangalore',
        permanent: true,
      },
      {
        source: '/blogs/liver-surgery-specialist-bangalore',
        destination: '/blogs/liver-cancer-surgery-specialist-in-bangalore',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
