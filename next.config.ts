/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Disable error overlay in development
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };
    }
    return config;
  },
  // Disable React error overlay
  devIndicators: {
    buildActivity: false,
  },
  // Disable error reports
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure images
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;
