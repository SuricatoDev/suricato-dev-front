import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

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
