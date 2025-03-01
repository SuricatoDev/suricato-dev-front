import fs from 'fs'

const limitOpenFiles = (maxFiles = 1024) => {
  fs.readdir = (
    (original) =>
    (...args) => {
      setTimeout(() => original.apply(this, args), Math.random() * maxFiles)
    }
  )(fs.readdir)
}

limitOpenFiles()

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkFilename = 'static/chunks/[name].[contenthash].js'
      config.output.filename = 'static/chunks/[name].[contenthash].js'
    }

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 25
      }
    }

    return config
  },
  generateBuildId: async () => {
    return 'excursionistas-v1'
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // 🚀 Desativando Source Maps para evitar muitos arquivos abertos
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
      }
    ],
    deviceSizes: [768, 960, 1440, 1920]
  },
  trailingSlash: true
}

export default nextConfig
