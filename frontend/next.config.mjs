/** @type {import('next').NextConfig} */
import './otel-config.js';
export default {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent bundling server-side modules in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http2: false,
        net: false,
        tls: false,
        dgram: false,
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};
