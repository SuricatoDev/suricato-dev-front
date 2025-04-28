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
  const { data: session, status, update } = useSession()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setIsLogged(!!session?.user?.id)
  }, [session])

  useEffect(() => {
    if (session?.user && !session.user.verificado) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === 'visible') {
          await update()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [session, update])

  return (
    <AuthStatusContext.Provider value={{ isLogged, status }}>
      {children}
    </AuthStatusContext.Provider>
  )
}

export const useAuthStatus = () => useContext(AuthStatusContext)
