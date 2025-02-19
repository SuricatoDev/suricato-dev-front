const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkFilename = 'static/chunks/[name].[contenthash].js'
      config.output.filename = 'static/chunks/[name].[contenthash].js'
    }
    return config
  },
  generateBuildId: async () => {
    return 'excursionistas-v1'
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
      }
    ],
    deviceSizes: [768, 960, 1440, 1920]
  },
  trailingSlash: true
}

export default nextConfig
