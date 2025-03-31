import { useSession } from 'next-auth/react'

export function useIsOrganizer() {
  const { data: session, status } = useSession()

  const loading = status === 'loading'

  const isOrganizer =
    !!session?.user?.organizador &&
    !!session?.user?.organizadorData &&
    Object.keys(session.user.organizadorData).length > 0

  return { isOrganizer, loading }
}
