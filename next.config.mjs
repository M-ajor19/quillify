/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal config to avoid build trace issues
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
