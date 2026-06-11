import type { NextConfig } from 'next';

// Safe, app-wide security headers. NOTE: a strict Content-Security-Policy is intentionally NOT set
// here - it must be tuned and tested against the live Firebase auth/RTDB/Functions endpoints first,
// or it will break sign-in and realtime data. Add CSP in a dedicated, tested pass.
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' }, // no embedding (clickjacking)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
];

const nextConfig: NextConfig = {
  transpilePackages: ['@last-card/engine'],
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Never cache the service worker, so an updated SW is picked up immediately.
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
