/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Для локальной разработки используем относительные пути (локальные API routes)
    // Для staging/production устанавливается через переменные окружения
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  images: {
    domains: ['cdn.go2asia.space', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          // Примечание: CSP настраивается в netlify.toml и может быть переопределена через Cloudflare
          // HSTS настраивается через Cloudflare (production only)
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['@go2asia/ui', '@go2asia/sdk'],
  },
  transpilePackages: ['@go2asia/sdk', '@go2asia/ui'],
};

module.exports = nextConfig;









