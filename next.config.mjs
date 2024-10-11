import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

let configwithPWA = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
  pwa: {
    dest: 'public',
  },
});

const nextConfig = {
  // reactStrictMode: true,
  ...configwithPWA,
};

export default nextConfig;
