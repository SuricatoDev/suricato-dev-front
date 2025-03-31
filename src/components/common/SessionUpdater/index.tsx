import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function SessionUpdater() {
  const { update } = useSession()

  useEffect(() => {
    const refreshSession = async () => {
      await update()
    }

    refreshSession()
  }, [])

  return null
}
