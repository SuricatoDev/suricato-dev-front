import { createContext, useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

type AuthStatusContextType = {
  isLogged: boolean
  status: 'loading' | 'authenticated' | 'unauthenticated'
}

const AuthStatusContext = createContext<AuthStatusContextType>({
  isLogged: false,
  status: 'loading'
})

export const AuthStatusProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { data: session, status } = useSession()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setIsLogged(!!session?.user?.id)
  }, [session])

  return (
    <AuthStatusContext.Provider value={{ isLogged, status }}>
      {children}
    </AuthStatusContext.Provider>
  )
}

export const useAuthStatus = () => useContext(AuthStatusContext)
