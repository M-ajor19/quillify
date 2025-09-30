/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal config to avoid build issues
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Force cache invalidation for Vercel
  generateBuildId: async () => {
    return `quillify-${Date.now()}`;
  },
};

export default nextConfig;
