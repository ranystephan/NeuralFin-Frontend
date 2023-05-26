// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: 'https://neuralfin-docs-production.up.railway.app/',
      },
    ];
  },
};

module.exports = nextConfig;
