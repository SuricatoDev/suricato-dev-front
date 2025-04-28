'use client'

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '@/styles/global'
import { darkTheme, defaultTheme } from '@/styles/themes'

interface ContextProps {
  themeDarkMode: boolean
  updatedDarkMode: (data: boolean) => void
}
const ApiContext = createContext<ContextProps>({} as ContextProps)

export function useDarkMode() {
  return useContext(ApiContext)
}

interface Props {
  children: ReactNode
}

export function AccessibilityContextProvider({ children }: Props) {
  const [themeDarkMode, setThemeDarkMode] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const initialDarkMode = stored ? stored === 'dark' : systemPrefersDark
    setThemeDarkMode(initialDarkMode)

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme') setThemeDarkMode(e.newValue === 'dark')
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) setThemeDarkMode(e.matches)
    }

    window.addEventListener('storage', handleStorage)
    mq.addEventListener('change', handleSystemChange)
    return () => {
      window.removeEventListener('storage', handleStorage)
      mq.removeEventListener('change', handleSystemChange)
    }
  }, [])

  const updatedDarkMode = (isDark: boolean) => {
    setThemeDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  if (themeDarkMode === null) {
    return null
  }

  return (
    <ApiContext.Provider value={{ themeDarkMode, updatedDarkMode }}>
      <ThemeProvider theme={themeDarkMode ? darkTheme : defaultTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ApiContext.Provider>
  )
}
