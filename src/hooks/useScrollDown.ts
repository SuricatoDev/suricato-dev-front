import { useEffect, useRef, useState } from 'react'

export function useScrollDown() {
  const [scrollDown, setScrollDown] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop

      if (currentScrollY > lastScrollY.current) {
        setScrollDown(true)
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDown(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDown
}
