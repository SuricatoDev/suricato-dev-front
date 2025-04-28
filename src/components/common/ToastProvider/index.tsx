import { useEffect, useState } from 'react'

import { useDarkMode } from '@/providers/AccessibilityContextProvider'
import { ToastContainer } from 'react-toastify'

export default function ToastProvider() {
  const { themeDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ToastContainer
      draggable
      draggablePercent={50}
      limit={3}
      draggableDirection="x"
      pauseOnHover={false}
      newestOnTop={false}
      position="bottom-center"
      autoClose={3000}
      style={{ zIndex: 99999 }}
      theme={themeDarkMode ? 'dark' : 'light'}
    />
  )
}
