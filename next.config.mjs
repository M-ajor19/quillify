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
  // Force cache invalidation
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Disable static optimization
  trailingSlash: true,
  // Force revalidation
  revalidate: 0,
};

export default nextConfig;
