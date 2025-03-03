import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  staticDirs: ['../src/assets'],
  stories: [
    '../src/components/**/stories.tsx',
    '../src/components/common/**/stories.tsx'
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: true
  },
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
  }
}

export default config
