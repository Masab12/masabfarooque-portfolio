import type { NextConfig } from 'next';

/**
 * Every raster asset in /public is already WebP and capped at 1800px by
 * scripts/optimise-images.mjs, so the runtime optimiser has nothing left to
 * do. Turning it off removes a server hop per image, keeps the build portable
 * to a static host, and means the bytes on the wire are exactly the bytes in
 * the repository.
 */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'fiverr-res.cloudinary.com', pathname: '/**' },
    ],
  },

  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: false,

  // Old routes that were removed in the rebuild. Kept as permanent redirects
  // so nothing that was already indexed turns into a 404.
  async redirects() {
    return [
      { source: '/pricing', destination: '/contact', permanent: true },
      { source: '/services', destination: '/#capabilities', permanent: true },
      { source: '/forge', destination: '/contact', permanent: true },
      { source: '/about', destination: '/about-masab', permanent: true },
      { source: '/work', destination: '/portfolio', permanent: true },
      { source: '/projects', destination: '/portfolio', permanent: true },
    ];
  },

  async headers() {
    // Turbopack's dev server does not guarantee a fresh chunk URL on every
    // edit the way a production build's content hashing does, so an
    // immutable, one year cache on /_next/static in dev tells the browser
    // to keep serving a stale JS bundle forever, no matter how many times
    // the page is reloaded. Scope the aggressive caching to production only.
    const immutableStatic =
      process.env.NODE_ENV === 'production'
        ? [
            {
              source: '/_next/static/:path*',
              headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
          ]
        : [];

    return [
      ...immutableStatic,
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
