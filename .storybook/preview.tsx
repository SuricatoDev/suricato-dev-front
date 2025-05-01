import React from 'react'

import type { Preview } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '../src/styles/global'
import { darkTheme, defaultTheme } from '../src/styles/themes'
import darkManagerTheme from './darkTheme'
import lightManagerTheme from './lightTheme'

export const parameters: Preview['parameters'] = {
  darkMode: {
    light: lightManagerTheme,
    dark: darkManagerTheme,
    stylePreview: true
  },
  controls: {
    matchers: { color: /(background|color)$/i, date: /Date$/ }
  },
  backgrounds: { disable: true },
  docs: { source: { state: 'open' } }
}

export const decorators: Preview['decorators'] = [
  (Story) => {
    const isDark = useDarkMode()
    return (
      <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    )
  }
]

export default {} as Preview
