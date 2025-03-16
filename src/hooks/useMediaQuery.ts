import { useState, useEffect } from 'react'

const useMediaQuery = (breakpoint: number = 960): boolean => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const query = `(max-width: ${breakpoint}px)`
    const mediaQueryList = window.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQueryList.matches)

    mediaQueryList.addEventListener('change', listener)

    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [breakpoint])

  return matches
}

export default useMediaQuery
