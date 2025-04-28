import React, { useEffect } from 'react'

import type { Preview } from '@storybook/react'

import { inter } from '../src/pages/_app'
import {
  AccessibilityContextProvider,
  useDarkMode
} from '../src/providers/AccessibilityContextProvider'
import { darkTheme, defaultTheme } from '../src/styles/themes'

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Light or Dark mode',
    defaultValue: 'default',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'default', title: 'Light' },
        { value: 'dark', title: 'Dark' }
      ]
    }
  }
}

const ThemeSetter: React.FC<{
  children: React.ReactNode
  theme: 'default' | 'dark'
}> = ({ children, theme }) => {
  const { updatedDarkMode } = useDarkMode()
  useEffect(() => updatedDarkMode(theme === 'dark'), [theme, updatedDarkMode])
  return <>{children}</>
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const current = context.globals.theme as 'default' | 'dark'
      const bg =
        current === 'dark'
          ? darkTheme.colors.background_standard
          : defaultTheme.colors.background_standard

      return (
        <div
          className={inter.className}
          style={{
            backgroundColor: bg,
            padding: 20
          }}
        >
          <AccessibilityContextProvider>
            <ThemeSetter theme={current}>
              <Story />
            </ThemeSetter>
          </AccessibilityContextProvider>
        </div>
      )
    }
  ],

  tags: ['autodocs']
}

export default preview
