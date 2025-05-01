import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  staticDirs: ['../src/assets'],

  stories: [
    '../src/components/**/*.stories.tsx',
    '../src/components/**/stories.tsx'
  ],

  addons: [
    'storybook-dark-mode',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {}
  },

  docs: {},

  webpackFinal: (config) => {
    if (!config.resolve) {
      config.resolve = {}
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {}
    }

    config.resolve.alias['@'] = path.resolve(__dirname, '../src')

    console.log('Final Webpack Resolve Config:', config.resolve)

    return config
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config
