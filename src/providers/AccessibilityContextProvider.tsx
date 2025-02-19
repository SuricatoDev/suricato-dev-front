import React, { createContext, useState, ReactNode, useEffect } from 'react'

interface ContextProps {
  themeDarkMode: boolean
  updatedDarkMode: (data: boolean) => void
}

export const ApiContext = createContext<ContextProps>({
  themeDarkMode: false,
  updatedDarkMode: () => {}
})

interface Props {
  children: ReactNode
}

export const AccessibilityContextProvider: React.FC<Props> = ({
  children
}: Props) => {
  const [themeDarkMode, setThemeDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const initialTheme = storedTheme
      ? storedTheme === 'darkMode'
      : systemPrefersDark

    setThemeDarkMode(initialTheme)

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        const newMode = event.newValue === 'darkMode'
        setThemeDarkMode(newMode)
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setThemeDarkMode(event.matches)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const updatedDarkMode = (data: boolean) => {
    setThemeDarkMode(data)
    localStorage.setItem('theme', data ? 'darkMode' : 'lightMode')
  }

  const contextValues: ContextProps = {
    themeDarkMode,
    updatedDarkMode
  }

  return (
    <ApiContext.Provider value={contextValues}>{children}</ApiContext.Provider>
  )
}
