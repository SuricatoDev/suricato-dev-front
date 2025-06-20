import React, { createContext, useContext } from 'react'

interface GlobalContextProps {
  pageName: string
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}

interface GlobalProviderProps {
  pageName: string
  children: React.ReactNode
}

export function GlobalProvider({ pageName, children }: GlobalProviderProps) {
  return (
    <GlobalContext.Provider value={{ pageName }}>
      {children}
    </GlobalContext.Provider>
  )
}
