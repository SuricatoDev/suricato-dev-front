import withPWA from 'next-pwa'

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkFilename = 'static/chunks/[name].[contenthash].js'
      config.output.filename = 'static/chunks/[name].[contenthash].js'
    }
    return config
  },
  generateBuildId: async () => {
    return process.env.AWS_COMMIT_ID || Date.now().toString()
  },
  reactStrictMode: true,
  ...(process.env.BASE_PATH && process.env.BASE_PATH !== ''
    ? { basePath: process.env.BASE_PATH, assetPrefix: process.env.BASE_PATH }
    : {}),
  compiler: {
    styledComponents: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'suricatodev.s3.sa-east-1.amazonaws.com' }
    ],
    deviceSizes: [320, 500, 768, 960, 1024, 1440, 1920],
    imageSizes: [320, 500, 600, 800]
  },
  trailingSlash: false,
  rewrites: async () => {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://suricatodev.s3.sa-east-1.amazonaws.com/:path*'
      }
    ]
  }
}

export default withPWA({
  dest: 'public',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/(.*)\/api\//,
      handler: 'NetworkOnly',
      options: { cacheName: 'no-cache-api' }
    }
  ],
  disable: process.env.NODE_ENV === 'development',

  register: true,
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true
})(nextConfig)
