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
  productionBrowserSourceMaps: true,
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
  redirects: async () => {
    return [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
        permanent: true
      }
    ]
  },
  headers: async () => {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'"
          }
        ]
      }
    ]
  }
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  publicExcludes: ['!**/*'],
  cacheStartUrl: false,
  dynamicStartUrl: false,
  cacheOnFrontEndNav: false,
  cleanupOutdatedCaches: true,
  runtimeCaching: [],
  disable: process.env.NODE_ENV === 'development'
})(nextConfig)
