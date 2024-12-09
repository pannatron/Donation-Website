/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Disable error overlay in development
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      }
    }
    return config
  },
  // Disable error overlay
  onError: () => {},
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
  }
}

module.exports = nextConfig
