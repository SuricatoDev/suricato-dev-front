import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkFilename = 'static/chunks/[name].[contenthash].js'
      config.output.filename = 'static/chunks/[name].[contenthash].js'
    }
    return config
  },
  generateBuildId: async () => {
    return 'excursionistas-v2'
  },
  reactStrictMode: true,
  ...(process.env.BASE_PATH && process.env.BASE_PATH !== ''
    ? { basePath: process.env.BASE_PATH }
    : {}),
  ...(process.env.BASE_PATH && process.env.BASE_PATH !== ''
    ? { assetPrefix: process.env.BASE_PATH }
    : {}),
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      },
      {
        protocol: 'https',
        hostname: 'a0.muscache.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'teste-suricatos.s3.sa-east-1.amazonaws.com'
      }
    ],
    deviceSizes: [320, 500, 768, 960, 1024, 1440, 1920],
    imageSizes: [320, 500, 600, 800]
  },
  trailingSlash: true
}

export default withPWA({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development'
})(nextConfig)
